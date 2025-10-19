import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import axios, { AxiosResponse } from 'axios'

interface TestResult {
  testId: string
  status: 'passed' | 'failed' | 'skipped'
  duration: number
  response?: {
    status: number
    headers: Record<string, string>
    body: any
  }
  error?: string
  assertions: Array<{
    assertionId: string
    passed: boolean
    actual?: any
    message?: string
  }>
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ suiteId: string }> }
) {
  try {
    const { suiteId } = await params
    const body = await request.json()
    const { environmentId } = body

    // Get test suite with tests and assertions
    const testSuite = await prisma.testSuite.findUnique({
      where: { id: suiteId },
      include: {
        tests: {
          include: {
            assertions: true
          }
        }
      }
    })

    if (!testSuite) {
      return NextResponse.json(
        { error: 'Test suite not found' },
        { status: 404 }
      )
    }

    // Get environment if specified
    let environment = null
    if (environmentId) {
      environment = await prisma.environment.findUnique({
        where: { id: environmentId }
      })
    }

    // Create test run
    const testRun = await prisma.testRun.create({
      data: {
        testSuiteId: suiteId,
        status: 'running',
        summary: JSON.stringify({
          total: testSuite.tests.length,
          passed: 0,
          failed: 0,
          skipped: 0
        })
      }
    })

    // Execute tests
    const results: TestResult[] = []
    
    for (const test of testSuite.tests) {
      try {
        const result = await executeTest(test, environment)
        results.push(result)
        
        // Save test result to database
        await prisma.testResult.create({
          data: {
            testId: test.id,
            testRunId: testRun.id,
            status: result.status,
            duration: result.duration,
            response: result.response ? JSON.stringify(result.response) : null,
            error: result.error || null,
            assertions: {
              create: result.assertions.map(assertion => ({
                assertionId: assertion.assertionId,
                passed: assertion.passed,
                actual: assertion.actual ? JSON.stringify(assertion.actual) : null,
                message: assertion.message || null
              }))
            }
          }
        })
      } catch (error) {
        console.error(`Error executing test ${test.id}:`, error)
        results.push({
          testId: test.id,
          status: 'failed',
          duration: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
          assertions: []
        })
      }
    }

    // Update test run with final status
    const summary = {
      total: results.length,
      passed: results.filter(r => r.status === 'passed').length,
      failed: results.filter(r => r.status === 'failed').length,
      skipped: results.filter(r => r.status === 'skipped').length
    }

    const finalStatus = summary.failed > 0 ? 'failed' : 'completed'

    await prisma.testRun.update({
      where: { id: testRun.id },
      data: {
        status: finalStatus,
        endTime: new Date(),
        summary: JSON.stringify(summary)
      }
    })

    return NextResponse.json({
      testRunId: testRun.id,
      status: finalStatus,
      summary,
      results
    })
  } catch (error) {
    console.error('Error running test suite:', error)
    return NextResponse.json(
      { error: 'Failed to run test suite' },
      { status: 500 }
    )
  }
}

async function executeTest(test: any, environment: any): Promise<TestResult> {
  const startTime = Date.now()
  
  try {
    // Prepare URL
    let url = test.url
    if (environment && environment.baseUrl) {
      // Replace variables in URL
      const variables = environment.variables ? JSON.parse(environment.variables) : {}
      Object.entries(variables).forEach(([key, value]) => {
        url = url.replace(`{{${key}}}`, String(value))
      })
      
      // If URL doesn't start with http, prepend base URL
      if (!url.startsWith('http')) {
        url = `${environment.baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
      }
    }

    // Prepare headers
    let headers: Record<string, string> = {}
    if (test.headers) {
      headers = JSON.parse(test.headers)
    }
    if (environment && environment.headers) {
      const envHeaders = JSON.parse(environment.headers)
      headers = { ...headers, ...envHeaders }
    }

    // Prepare body
    let body = undefined
    if (test.body) {
      body = JSON.parse(test.body)
    }

    // Make HTTP request
    const response: AxiosResponse = await axios({
      method: test.method.toLowerCase(),
      url,
      headers,
      data: body,
      timeout: test.timeout || 30000,
      validateStatus: () => true // Don't throw on HTTP error status
    })

    const duration = Date.now() - startTime

    // Prepare response data
    const responseData = {
      status: response.status,
      headers: response.headers as Record<string, string>,
      body: response.data
    }

    // Run assertions
    const assertionResults = []
    let allAssertionsPassed = true

    for (const assertion of test.assertions) {
      const assertionResult = await runAssertion(assertion, responseData)
      assertionResults.push({
        assertionId: assertion.id,
        passed: assertionResult.passed,
        actual: assertionResult.actual,
        message: assertionResult.message
      })
      
      if (!assertionResult.passed) {
        allAssertionsPassed = false
      }
    }

    return {
      testId: test.id,
      status: allAssertionsPassed ? 'passed' : 'failed',
      duration,
      response: responseData,
      assertions: assertionResults
    }
  } catch (error) {
    const duration = Date.now() - startTime
    
    return {
      testId: test.id,
      status: 'failed',
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
      assertions: []
    }
  }
}

async function runAssertion(assertion: any, response: any): Promise<{
  passed: boolean
  actual?: any
  message?: string
}> {
  try {
    const expected = JSON.parse(assertion.expected)
    
    switch (assertion.type) {
      case 'status':
        const statusPassed = response.status === expected
        return {
          passed: statusPassed,
          actual: response.status,
          message: statusPassed 
            ? `Status code ${response.status} matches expected ${expected}`
            : `Status code ${response.status} does not match expected ${expected}`
        }
      
      case 'response_time':
        const timePassed = response.duration <= expected
        return {
          passed: timePassed,
          actual: response.duration,
          message: timePassed
            ? `Response time ${response.duration}ms is within limit ${expected}ms`
            : `Response time ${response.duration}ms exceeds limit ${expected}ms`
        }
      
      case 'json_path':
        if (assertion.jsonPath) {
          const actual = getJsonPathValue(response.body, assertion.jsonPath)
          const passed = actual === expected
          return {
            passed,
            actual,
            message: passed
              ? `JSON path ${assertion.jsonPath} value matches expected`
              : `JSON path ${assertion.jsonPath} value ${actual} does not match expected ${expected}`
          }
        }
        break
      
      case 'header':
        if (assertion.headerName) {
          const actual = response.headers[assertion.headerName.toLowerCase()]
          const passed = actual === expected
          return {
            passed,
            actual,
            message: passed
              ? `Header ${assertion.headerName} matches expected`
              : `Header ${assertion.headerName} value ${actual} does not match expected ${expected}`
          }
        }
        break
      
      case 'body_contains':
        const bodyString = JSON.stringify(response.body)
        const passed = bodyString.includes(expected)
        return {
          passed,
          actual: bodyString,
          message: passed
            ? `Response body contains expected text`
            : `Response body does not contain expected text: ${expected}`
        }
    }
    
    return {
      passed: false,
      message: `Unknown assertion type: ${assertion.type}`
    }
  } catch (error) {
    return {
      passed: false,
      message: `Assertion error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

function getJsonPathValue(obj: any, path: string): any {
  try {
    return path.split('.').reduce((current, key) => {
      if (current && typeof current === 'object') {
        return current[key]
      }
      return undefined
    }, obj)
  } catch {
    return undefined
  }
}

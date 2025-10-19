import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ suiteId: string }> }
) {
  try {
    const { suiteId } = await params
    const tests = await prisma.test.findMany({
      where: { testSuiteId: suiteId },
      include: {
        assertions: true,
        _count: {
          select: {
            testResults: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json(tests)
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tests' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ suiteId: string }> }
) {
  try {
    const { suiteId } = await params
    const body = await request.json()
    const { 
      name, 
      method, 
      url, 
      headers, 
      body: testBody, 
      expectedStatus, 
      timeout,
      assertions = []
    } = body

    if (!name || !method || !url) {
      return NextResponse.json(
        { error: 'Name, method, and URL are required' },
        { status: 400 }
      )
    }

    // Create test
    const test = await prisma.test.create({
      data: {
        name,
        method: method.toUpperCase(),
        url,
        headers: headers ? JSON.stringify(headers) : null,
        body: testBody ? JSON.stringify(testBody) : null,
        expectedStatus: expectedStatus || 200,
        timeout: timeout || 30000,
        testSuiteId: suiteId
      },
      include: {
        assertions: true
      }
    })

    // Create assertions
    if (assertions.length > 0) {
      await prisma.assertion.createMany({
        data: assertions.map((assertion: any) => ({
          type: assertion.type,
          expected: JSON.stringify(assertion.expected),
          jsonPath: assertion.jsonPath || null,
          headerName: assertion.headerName || null,
          testId: test.id
        }))
      })
    }

    // Return test with assertions
    const testWithAssertions = await prisma.test.findUnique({
      where: { id: test.id },
      include: {
        assertions: true
      }
    })

    return NextResponse.json(testWithAssertions, { status: 201 })
  } catch (error) {
    console.error('Error creating test:', error)
    return NextResponse.json(
      { error: 'Failed to create test' },
      { status: 500 }
    )
  }
}

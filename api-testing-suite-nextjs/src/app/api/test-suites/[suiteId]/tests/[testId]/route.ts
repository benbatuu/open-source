import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ suiteId: string; testId: string }> }
) {
  try {
    const { suiteId, testId } = await params
    const test = await prisma.test.findFirst({
      where: { 
        id: testId,
        testSuiteId: suiteId
      },
      include: {
        assertions: true,
        testResults: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        }
      }
    })

    if (!test) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(test)
  } catch (error) {
    console.error('Error fetching test:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ suiteId: string; testId: string }> }
) {
  try {
    const { suiteId, testId } = await params
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

    // Update test
    const test = await prisma.test.update({
      where: { id: testId },
      data: {
        ...(name && { name }),
        ...(method && { method: method.toUpperCase() }),
        ...(url && { url }),
        ...(headers !== undefined && { headers: headers ? JSON.stringify(headers) : null }),
        ...(testBody !== undefined && { body: testBody ? JSON.stringify(testBody) : null }),
        ...(expectedStatus && { expectedStatus }),
        ...(timeout && { timeout })
      },
      include: {
        assertions: true
      }
    })

    // Update assertions if provided
    if (assertions.length > 0) {
      // Delete existing assertions
      await prisma.assertion.deleteMany({
        where: { testId: testId }
      })

      // Create new assertions
      await prisma.assertion.createMany({
        data: assertions.map((assertion: any) => ({
          type: assertion.type,
          expected: JSON.stringify(assertion.expected),
          jsonPath: assertion.jsonPath || null,
          headerName: assertion.headerName || null,
          testId: testId
        }))
      })
    }

    // Return updated test with assertions
    const updatedTest = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        assertions: true
      }
    })

    return NextResponse.json(updatedTest)
  } catch (error) {
    console.error('Error updating test:', error)
    return NextResponse.json(
      { error: 'Failed to update test' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ suiteId: string; testId: string }> }
) {
  try {
    const { testId } = await params
    await prisma.test.delete({
      where: { id: testId }
    })

    return NextResponse.json({ message: 'Test deleted successfully' })
  } catch (error) {
    console.error('Error deleting test:', error)
    return NextResponse.json(
      { error: 'Failed to delete test' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ suiteId: string }> }
) {
  try {
    const { suiteId } = await params
    const testSuite = await prisma.testSuite.findUnique({
      where: { id: suiteId },
      include: {
        tests: {
          include: {
            assertions: true
          }
        },
        testRuns: {
          orderBy: {
            startTime: 'desc'
          },
          take: 10
        },
        _count: {
          select: {
            tests: true,
            testRuns: true
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

    return NextResponse.json(testSuite)
  } catch (error) {
    console.error('Error fetching test suite:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test suite' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ suiteId: string }> }
) {
  try {
    const { suiteId } = await params
    const body = await request.json()
    const { name, description, status } = body

    const testSuite = await prisma.testSuite.update({
      where: { id: suiteId },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(status && { status })
      },
      include: {
        tests: {
          include: {
            assertions: true
          }
        },
        _count: {
          select: {
            tests: true,
            testRuns: true
          }
        }
      }
    })

    return NextResponse.json(testSuite)
  } catch (error) {
    console.error('Error updating test suite:', error)
    return NextResponse.json(
      { error: 'Failed to update test suite' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ suiteId: string }> }
) {
  try {
    const { suiteId } = await params
    await prisma.testSuite.delete({
      where: { id: suiteId }
    })

    return NextResponse.json({ message: 'Test suite deleted successfully' })
  } catch (error) {
    console.error('Error deleting test suite:', error)
    return NextResponse.json(
      { error: 'Failed to delete test suite' },
      { status: 500 }
    )
  }
}

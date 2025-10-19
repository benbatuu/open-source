import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const testSuites = await prisma.testSuite.findMany({
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
          take: 1
        },
        _count: {
          select: {
            tests: true,
            testRuns: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(testSuites)
  } catch (error) {
    console.error('Error fetching test suites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test suites' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const testSuite = await prisma.testSuite.create({
      data: {
        name,
        description: description || null,
        status: 'active'
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

    return NextResponse.json(testSuite, { status: 201 })
  } catch (error) {
    console.error('Error creating test suite:', error)
    return NextResponse.json(
      { error: 'Failed to create test suite' },
      { status: 500 }
    )
  }
}

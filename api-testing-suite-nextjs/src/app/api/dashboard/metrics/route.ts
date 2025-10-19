import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get total counts
    const [
      totalTestSuites,
      totalTests,
      totalTestRuns,
      recentTestRuns
    ] = await Promise.all([
      prisma.testSuite.count(),
      prisma.test.count(),
      prisma.testRun.count(),
      prisma.testRun.findMany({
        take: 10,
        orderBy: {
          startTime: 'desc'
        },
        include: {
          testSuite: {
            select: {
              name: true
            }
          },
          results: {
            select: {
              status: true,
              duration: true
            }
          }
        }
      })
    ])

    // Calculate success rate from recent test runs
    const recentResults = recentTestRuns.flatMap(run => run.results)
    const totalRecentResults = recentResults.length
    const passedResults = recentResults.filter(r => r.status === 'passed').length
    const successRate = totalRecentResults > 0 ? (passedResults / totalRecentResults) * 100 : 0

    // Calculate average response time
    const avgResponseTime = totalRecentResults > 0 
      ? recentResults.reduce((sum, r) => sum + r.duration, 0) / totalRecentResults 
      : 0

    // Get performance data for the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const performanceData = await prisma.testRun.findMany({
      where: {
        startTime: {
          gte: sevenDaysAgo
        }
      },
      select: {
        startTime: true,
        summary: true
      },
      orderBy: {
        startTime: 'asc'
      }
    })

    // Group by day
    const dailyStats = performanceData.reduce((acc, run) => {
      const date = run.startTime.toISOString().split('T')[0]
      const summary = run.summary ? JSON.parse(run.summary) : { total: 0, passed: 0, failed: 0 }
      
      if (!acc[date]) {
        acc[date] = { tests: 0, success: 0 }
      }
      
      acc[date].tests += summary.total
      acc[date].success += summary.passed
      
      return acc
    }, {} as Record<string, { tests: number; success: number }>)

    // Fill in missing days
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
      
      last7Days.push({
        name: dayName,
        tests: dailyStats[dateStr]?.tests || 0,
        success: dailyStats[dateStr]?.success || 0
      })
    }

    // Get recent tests
    const recentTests = await prisma.testResult.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        test: {
          select: {
            name: true
          }
        },
        testRun: {
          select: {
            testSuite: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    const metrics = {
      totalTestSuites,
      totalTests,
      totalTestRuns,
      successRate: Math.round(successRate * 10) / 10,
      avgResponseTime: Math.round(avgResponseTime),
      performanceData: last7Days,
      recentTests: recentTests.map(result => ({
        id: result.id,
        name: result.test.name,
        suite: result.testRun.testSuite.name,
        status: result.status,
        duration: result.duration,
        timestamp: result.createdAt.toISOString()
      }))
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard metrics' },
      { status: 500 }
    )
  }
}

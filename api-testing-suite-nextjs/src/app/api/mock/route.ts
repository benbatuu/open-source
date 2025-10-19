import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get all enabled mock endpoints
    const endpoints = await prisma.mockEndpoint.findMany({
      where: { enabled: true },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json({
      status: 'running',
      endpoints: endpoints.length,
      port: process.env.MOCK_PORT || 3001
    })
  } catch (error) {
    console.error('Error fetching mock server status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mock server status' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, port } = body

    if (action === 'start') {
      // In a real implementation, you would start a separate server process
      // For now, we'll just return success
      return NextResponse.json({
        status: 'started',
        port: port || 3001,
        message: 'Mock server started successfully'
      })
    } else if (action === 'stop') {
      return NextResponse.json({
        status: 'stopped',
        message: 'Mock server stopped successfully'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error controlling mock server:', error)
    return NextResponse.json(
      { error: 'Failed to control mock server' },
      { status: 500 }
    )
  }
}

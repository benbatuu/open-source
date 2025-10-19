import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const endpoints = await prisma.mockEndpoint.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(endpoints)
  } catch (error) {
    console.error('Error fetching mock endpoints:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mock endpoints' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, path, method, statusCode, responseBody, headers, delay } = body

    if (!name || !path || !method) {
      return NextResponse.json(
        { error: 'Name, path, and method are required' },
        { status: 400 }
      )
    }

    const endpoint = await prisma.mockEndpoint.create({
      data: {
        name,
        path,
        method: method.toUpperCase(),
        statusCode: statusCode || 200,
        responseBody: responseBody || '{}',
        headers: headers || '{"Content-Type": "application/json"}',
        delay: delay || 0,
        enabled: true
      }
    })

    return NextResponse.json(endpoint, { status: 201 })
  } catch (error) {
    console.error('Error creating mock endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to create mock endpoint' },
      { status: 500 }
    )
  }
}

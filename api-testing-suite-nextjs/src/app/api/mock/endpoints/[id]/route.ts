import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const endpoint = await prisma.mockEndpoint.findUnique({
      where: { id }
    })

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Mock endpoint not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(endpoint)
  } catch (error) {
    console.error('Error fetching mock endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mock endpoint' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, path, method, statusCode, responseBody, headers, delay, enabled } = body

    const endpoint = await prisma.mockEndpoint.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(path && { path }),
        ...(method && { method: method.toUpperCase() }),
        ...(statusCode && { statusCode }),
        ...(responseBody !== undefined && { responseBody }),
        ...(headers !== undefined && { headers }),
        ...(delay !== undefined && { delay }),
        ...(enabled !== undefined && { enabled })
      }
    })

    return NextResponse.json(endpoint)
  } catch (error) {
    console.error('Error updating mock endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to update mock endpoint' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.mockEndpoint.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Mock endpoint deleted successfully' })
  } catch (error) {
    console.error('Error deleting mock endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to delete mock endpoint' },
      { status: 500 }
    )
  }
}

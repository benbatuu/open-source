import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const environment = await prisma.environment.findUnique({
      where: { id }
    })

    if (!environment) {
      return NextResponse.json(
        { error: 'Environment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(environment)
  } catch (error) {
    console.error('Error fetching environment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch environment' },
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
    const { name, baseUrl, headers, variables, active } = body

    // If setting as active, deactivate all other environments
    if (active) {
      await prisma.environment.updateMany({
        where: { active: true },
        data: { active: false }
      })
    }

    const environment = await prisma.environment.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(baseUrl && { baseUrl }),
        ...(headers !== undefined && { headers: headers ? JSON.stringify(headers) : null }),
        ...(variables !== undefined && { variables: variables ? JSON.stringify(variables) : null }),
        ...(active !== undefined && { active })
      }
    })

    return NextResponse.json(environment)
  } catch (error) {
    console.error('Error updating environment:', error)
    return NextResponse.json(
      { error: 'Failed to update environment' },
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
    await prisma.environment.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Environment deleted successfully' })
  } catch (error) {
    console.error('Error deleting environment:', error)
    return NextResponse.json(
      { error: 'Failed to delete environment' },
      { status: 500 }
    )
  }
}

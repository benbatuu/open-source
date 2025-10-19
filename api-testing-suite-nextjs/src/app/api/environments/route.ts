import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const environments = await prisma.environment.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(environments)
  } catch (error) {
    console.error('Error fetching environments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch environments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, baseUrl, headers, variables, active } = body

    if (!name || !baseUrl) {
      return NextResponse.json(
        { error: 'Name and baseUrl are required' },
        { status: 400 }
      )
    }

    // If setting as active, deactivate all other environments
    if (active) {
      await prisma.environment.updateMany({
        where: { active: true },
        data: { active: false }
      })
    }

    const environment = await prisma.environment.create({
      data: {
        name,
        baseUrl,
        headers: headers ? JSON.stringify(headers) : null,
        variables: variables ? JSON.stringify(variables) : null,
        active: active || false
      }
    })

    return NextResponse.json(environment, { status: 201 })
  } catch (error) {
    console.error('Error creating environment:', error)
    return NextResponse.json(
      { error: 'Failed to create environment' },
      { status: 500 }
    )
  }
}

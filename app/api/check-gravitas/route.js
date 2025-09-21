import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await prisma.Gravitas.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    })

    return NextResponse.json({ exists: !!user })
  } catch (error) {
    console.error('Error checking gravitas collection:', error)
    return NextResponse.json({ exists: false, error: "Internal Server Error" }, { status: 500 })
  }
}

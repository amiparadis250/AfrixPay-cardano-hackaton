import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/auth'

const registerSchema = z.object({
  phoneNumber: z.string().min(10),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  country: z.string().min(2),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber, firstName, lastName, email, country } = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Phone number already registered' }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        phoneNumber,
        firstName,
        lastName,
        email,
        country,
      }
    })

    const token = generateToken(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        isVerified: user.isVerified,
        kycStatus: user.kycStatus,
      },
      token
    })
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, currency } = await request.json()

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ 
        success: false, 
        error: 'All required fields must be filled' 
      }, { status: 400 })
    }

    // Check existing email
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'An account with this email already exists' 
      }, { status: 400 })
    }

    // Check existing phone if provided
    if (phone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone } })
      if (existingPhone) {
        return NextResponse.json({ 
          success: false, 
          error: 'This phone number is already registered' 
        }, { status: 400 })
      }
    }

    const hashedPassword = await hashPassword(password)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        wallet: {
          create: {
            balance: 0,
            currency: currency || 'USD'
          }
        }
      },
      include: { wallet: true }
    })

    const token = generateToken(user.id)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        wallet: user.wallet
      },
      token
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('email')) {
        return NextResponse.json({ 
          success: false, 
          error: 'Email already exists' 
        }, { status: 400 })
      }
      if (error.meta?.target?.includes('phone')) {
        return NextResponse.json({ 
          success: false, 
          error: 'Phone number already exists' 
        }, { status: 400 })
      }
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Registration failed. Please try again.' 
    }, { status: 500 })
  }
}
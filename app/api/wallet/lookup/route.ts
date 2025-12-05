import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json()
    
    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
      where: {
        wallet: {
          cardanoAddress: address
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true
      }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        phone: user.phone
      }
    })
  } catch (error) {
    console.error('User lookup error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to lookup user' 
      },
      { status: 500 }
    )
  }
}
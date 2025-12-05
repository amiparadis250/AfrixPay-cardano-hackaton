import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: decoded.userId }
    })

    if (!wallet?.cardanoAddress) {
      return NextResponse.json({
        success: false,
        error: 'No wallet found'
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        mnemonic: wallet.cardanoMnemonic,
        publicKey: wallet.cardanoPublicKey,
        address: wallet.cardanoAddress
      }
    })
  } catch (error) {
    console.error('Get wallet error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get wallet' 
      },
      { status: 500 }
    )
  }
}
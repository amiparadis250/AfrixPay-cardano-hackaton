import { NextRequest, NextResponse } from 'next/server'
import { createWallet } from '@/lib/cardano'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Get user from token
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

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user already has a Cardano wallet
    const existingWallet = await prisma.wallet.findUnique({
      where: { userId: decoded.userId }
    })

    if (existingWallet?.cardanoAddress) {
      return NextResponse.json({
        success: true,
        data: {
          mnemonic: existingWallet.cardanoMnemonic,
          publicKey: existingWallet.cardanoPublicKey,
          address: existingWallet.cardanoAddress
        }
      })
    }

    // Create new Cardano wallet
    const wallet = await createWallet()
    
    // Save to database
    await prisma.wallet.upsert({
      where: { userId: decoded.userId },
      update: {
        cardanoAddress: wallet.address,
        cardanoMnemonic: wallet.mnemonic,
        cardanoPublicKey: wallet.publicKey
      },
      create: {
        userId: decoded.userId,
        cardanoAddress: wallet.address,
        cardanoMnemonic: wallet.mnemonic,
        cardanoPublicKey: wallet.publicKey
      }
    })
    
    return NextResponse.json({
      success: true,
      data: wallet
    })
  } catch (error) {
    console.error('Wallet creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create wallet' 
      },
      { status: 500 }
    )
  }
}
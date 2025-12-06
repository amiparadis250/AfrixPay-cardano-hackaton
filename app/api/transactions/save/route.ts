import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const userId = verifyToken(token)

    const { receiverAddress, amount, txHash } = await request.json()

    if (!receiverAddress || !amount || !txHash) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find receiver by cardano address
    const receiver = await prisma.wallet.findFirst({
      where: { cardanoAddress: receiverAddress },
      include: { user: true }
    })

    const transaction = await prisma.transaction.create({
      data: {
        senderId: userId,
        receiverEmail: receiver?.user.email || 'external',
        receiverId: receiver?.userId,
        amount,
        currency: 'ADA',
        transactionHash: txHash,
        status: 'COMPLETED'
      }
    })

    return NextResponse.json({
      success: true,
      data: transaction
    })
  } catch (error) {
    console.error('Save transaction error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save transaction' },
      { status: 500 }
    )
  }
}

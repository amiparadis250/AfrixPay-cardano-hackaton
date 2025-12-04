import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { receiverEmail, amount, currency = 'USD' } = await request.json()

    const sender = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { wallet: true }
    })

    if (!sender?.wallet) {
      return NextResponse.json({ error: 'Sender wallet not found' }, { status: 404 })
    }

    const fee = Number(amount) * 0.02 // 2% fee
    const totalAmount = Number(amount) + fee

    if (Number(sender.wallet.balance) < totalAmount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 })
    }

    const receiver = await prisma.user.findUnique({
      where: { email: receiverEmail },
      include: { wallet: true }
    })

    const transaction = await prisma.$transaction(async (tx) => {
      // Create transaction record
      const newTransaction = await tx.transaction.create({
        data: {
          senderId: sender.id,
          receiverEmail,
          receiverId: receiver?.id,
          amount,
          currency,
          fee,
          status: 'PROCESSING'
        }
      })

      // Update sender balance
      await tx.wallet.update({
        where: { userId: sender.id },
        data: { balance: { decrement: totalAmount } }
      })

      // Update receiver balance if user exists
      if (receiver?.wallet) {
        await tx.wallet.update({
          where: { userId: receiver.id },
          data: { balance: { increment: amount } }
        })

        await tx.transaction.update({
          where: { id: newTransaction.id },
          data: { status: 'COMPLETED' }
        })
      }

      return newTransaction
    })

    return NextResponse.json({ transaction })
  } catch (error) {
    return NextResponse.json({ error: 'Transaction failed' }, { status: 500 })
  }
}
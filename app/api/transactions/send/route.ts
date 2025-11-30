import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { convertCurrency, calculateFee } from '@/lib/currency'
import { simulateCardanoTransfer } from '@/lib/cardano'

const sendSchema = z.object({
  receiverPhone: z.string().min(10),
  amount: z.number().positive(),
  senderCurrency: z.string().length(3),
  receiverCurrency: z.string().length(3),
})

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { receiverPhone, amount, senderCurrency, receiverCurrency } = sendSchema.parse(body)

    // Find sender and receiver
    const sender = await prisma.user.findUnique({ where: { id: decoded.userId } })
    const receiver = await prisma.user.findUnique({ where: { phoneNumber: receiverPhone } })

    if (!sender || !receiver) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate conversion and fees
    const { convertedAmount, exchangeRate } = convertCurrency(amount, senderCurrency, receiverCurrency)
    const fee = calculateFee(amount)

    // Check sender balance (simplified - in real app, would check actual balance)
    if (sender.balance < amount + fee) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 })
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        senderId: sender.id,
        receiverId: receiver.id,
        senderAmount: amount,
        receiverAmount: convertedAmount,
        senderCurrency,
        receiverCurrency,
        exchangeRate,
        fee,
        status: 'PROCESSING',
      }
    })

    // Simulate Cardano transfer
    const cardanoResult = await simulateCardanoTransfer(
      convertedAmount,
      `sender_${sender.id}`,
      `receiver_${receiver.id}`
    )

    // Update transaction status
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        status: cardanoResult.success ? 'COMPLETED' : 'FAILED',
        cardanoTxHash: cardanoResult.txHash,
      }
    })

    // Update balances if successful
    if (cardanoResult.success) {
      await prisma.user.update({
        where: { id: sender.id },
        data: { balance: { decrement: amount + fee } }
      })
      await prisma.user.update({
        where: { id: receiver.id },
        data: { balance: { increment: convertedAmount } }
      })
    }

    return NextResponse.json({
      transaction: updatedTransaction,
      cardanoTxHash: cardanoResult.txHash,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Transaction failed' }, { status: 500 })
  }
}
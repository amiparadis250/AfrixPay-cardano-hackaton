import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: decoded.userId }
    })

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
    }

    return NextResponse.json({ balance: wallet.balance, currency: wallet.currency })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get balance' }, { status: 500 })
  }
}
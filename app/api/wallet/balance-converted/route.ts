import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getBalance } from '@/lib/cardano'

const ADA_TO_USD = 0.35

const USD_TO_CURRENCY: { [key: string]: number } = {
  'DZD': 134.5, 'AOA': 825.0, 'XOF': 615.0, 'BWP': 13.5, 'BIF': 2850.0,
  'CVE': 103.5, 'XAF': 615.0, 'KMF': 461.0, 'CDF': 2800.0, 'DJF': 177.0,
  'EGP': 48.5, 'ERN': 15.0, 'SZL': 18.0, 'ETB': 120.0, 'GMD': 67.0,
  'GHS': 15.5, 'GNF': 8600.0, 'KES': 129.0, 'LSL': 18.0, 'LRD': 185.0,
  'LYD': 4.8, 'MGA': 4500.0, 'MWK': 1730.0, 'MRU': 39.5, 'MUR': 46.0,
  'MAD': 9.9, 'MZN': 63.5, 'NAD': 18.0, 'NGN': 1550.0, 'RWF': 1350.0,
  'STN': 23.0, 'SCR': 13.5, 'SLL': 22000.0, 'SOS': 571.0, 'ZAR': 18.0,
  'SSP': 1300.0, 'SDG': 600.0, 'TZS': 2600.0, 'TND': 3.1, 'UGX': 3700.0,
  'ZMW': 27.0, 'ZWL': 322.0, 'USD': 1.0
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { wallet: true }
    })

    if (!user?.wallet?.cardanoAddress) {
      return NextResponse.json(
        { success: false, error: 'Wallet not found' },
        { status: 404 }
      )
    }

    const balanceData = await getBalance(user.wallet.cardanoAddress)
    const adaAmount = parseFloat(balanceData.ada)
    
    const usdAmount = adaAmount * ADA_TO_USD
    const currency = user.wallet.currency
    const rate = USD_TO_CURRENCY[currency] || 1
    const convertedAmount = usdAmount * rate

    return NextResponse.json({
      success: true,
      data: {
        adaBalance: adaAmount.toFixed(2),
        convertedBalance: convertedAmount.toFixed(2),
        currency,
        rate: (ADA_TO_USD * rate).toFixed(4)
      }
    })
  } catch (error) {
    console.error('Balance conversion error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to convert balance' },
      { status: 500 }
    )
  }
}

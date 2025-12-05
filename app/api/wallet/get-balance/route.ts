import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const EXCHANGE_RATES: { [key: string]: number } = {
  'USD': 0.35, 'DZD': 47.0, 'AOA': 290.0, 'BWP': 4.8, 'XOF': 210.0, 'BIF': 720.0,
  'XAF': 210.0, 'CVE': 35.0, 'KMF': 157.0, 'CDF': 850.0, 'DJF': 62.0, 'EGP': 11.0,
  'ERN': 5.3, 'SZL': 6.5, 'ETB': 19.0, 'GMD': 23.0, 'GHS': 4.2, 'GNF': 3100.0,
  'KES': 45.0, 'LSL': 6.5, 'LRD': 54.0, 'LYD': 1.7, 'MGA': 1600.0, 'MWK': 580.0,
  'MRU': 14.0, 'MUR': 16.0, 'MAD': 3.5, 'MZN': 22.0, 'NAD': 6.5, 'NGN': 460.0,
  'RWF': 420.0, 'STN': 7.8, 'SCR': 4.7, 'SLL': 7200.0, 'SOS': 200.0, 'ZAR': 6.5,
  'SSP': 460.0, 'SDG': 210.0, 'TZS': 850.0, 'TND': 1.1, 'UGX': 1300.0, 'ZMW': 7.8, 'ZWL': 112.0
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const currency = searchParams.get('currency') || 'SZL'
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId }
    })

    if (!wallet) {
      return NextResponse.json(
        { success: false, error: 'Wallet not found' },
        { status: 404 }
      )
    }

    const adaAmount = parseFloat(wallet.adaBalance.toString())
    const rate = EXCHANGE_RATES[currency.toUpperCase()] || 1
    const convertedAmount = (adaAmount * rate).toFixed(2)
    
    return NextResponse.json({
      success: true,
      data: {
        ada: adaAmount.toFixed(2),
        convertedAmount: parseFloat(convertedAmount),
        currency: currency.toUpperCase(),
        exchangeRate: rate
      }
    })
  } catch (error) {
    console.error('Get balance error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get balance' },
      { status: 500 }
    )
  }
}
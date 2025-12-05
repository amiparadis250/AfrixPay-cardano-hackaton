import { NextRequest, NextResponse } from 'next/server'
import { getBalance } from '@/lib/cardano'

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json()
    
    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address is required' },
        { status: 400 }
      )
    }

    const balance = await getBalance(address)
    
    return NextResponse.json({
      success: true,
      data: balance
    })
  } catch (error) {
    console.error('Balance fetch error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch balance' 
      },
      { status: 500 }
    )
  }
}
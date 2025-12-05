import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json()
    
    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address is required' },
        { status: 400 }
      )
    }

    // For MVP, provide manual faucet instructions
    return NextResponse.json({
      success: true,
      data: { 
        txHash: 'manual_faucet_required',
        message: `To get test ADA:\n\n1. Copy your address: ${address}\n2. Visit: https://docs.cardano.org/cardano-testnet/tools/faucet/\n3. Paste your address and request ADA\n4. Wait 2-5 minutes and refresh your balance`,
        faucetUrl: 'https://docs.cardano.org/cardano-testnet/tools/faucet/',
        address: address
      }
    })
  } catch (error) {
    console.error('Faucet error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to provide faucet instructions' 
      },
      { status: 500 }
    )
  }
}
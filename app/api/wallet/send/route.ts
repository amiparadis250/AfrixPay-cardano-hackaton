import { NextRequest, NextResponse } from 'next/server'
import { sendAda } from '@/lib/cardano'

export async function POST(request: NextRequest) {
  try {
    const { senderMnemonic, receiverAddress, amount } = await request.json()
    
    if (!senderMnemonic || !receiverAddress || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    const txHash = await sendAda(senderMnemonic, receiverAddress, amount)
    
    return NextResponse.json({
      success: true,
      data: { 
        txHash,
        explorerUrl: `https://preview.cardanoscan.io/transaction/${txHash}`,
        message: 'Transaction submitted successfully! Click the link to verify on blockchain explorer.'
      }
    })
  } catch (error: any) {
    console.error('Send transaction error:', error)
    
    // Return specific error messages
    let errorMessage = 'Failed to send transaction'
    let statusCode = 500
    
    if (error.message.includes('Insufficient balance')) {
      errorMessage = error.message
      statusCode = 400
    } else if (error.message.includes('Invalid address')) {
      errorMessage = 'Invalid recipient address'
      statusCode = 400
    } else if (error.message.includes('Transaction failed')) {
      errorMessage = error.message
      statusCode = 400
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: statusCode }
    )
  }
}
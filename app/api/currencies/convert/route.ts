import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { convertCurrency, calculateFee } from '@/lib/currency'

const convertSchema = z.object({
  amount: z.number().positive(),
  fromCurrency: z.string().length(3),
  toCurrency: z.string().length(3),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, fromCurrency, toCurrency } = convertSchema.parse(body)

    const { convertedAmount, exchangeRate } = convertCurrency(amount, fromCurrency, toCurrency)
    const fee = calculateFee(amount)

    return NextResponse.json({
      originalAmount: amount,
      convertedAmount: Math.round(convertedAmount * 100) / 100,
      exchangeRate,
      fee: Math.round(fee * 100) / 100,
      fromCurrency,
      toCurrency,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid conversion request' }, { status: 400 })
  }
}
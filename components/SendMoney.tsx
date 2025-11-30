'use client'

import { useState } from 'react'
import { AFRICAN_CURRENCIES } from '@/lib/currency'

interface SendMoneyProps {
  userToken: string
  userCountry: string
}

export default function SendMoney({ userToken, userCountry }: SendMoneyProps) {
  const [receiverPhone, setReceiverPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [senderCurrency, setSenderCurrency] = useState('RWF')
  const [receiverCurrency, setReceiverCurrency] = useState('KES')
  const [conversion, setConversion] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)

  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/currencies/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          fromCurrency: senderCurrency,
          toCurrency: receiverCurrency,
        }),
      })
      const data = await response.json()
      setConversion(data)
    } catch (error) {
      console.error('Conversion failed:', error)
    }
    setLoading(false)
  }

  const handleSend = async () => {
    if (!receiverPhone || !conversion) return
    
    setSending(true)
    try {
      const response = await fetch('/api/transactions/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          receiverPhone,
          amount: parseFloat(amount),
          senderCurrency,
          receiverCurrency,
        }),
      })
      
      if (response.ok) {
        alert('Transaction sent successfully!')
        setReceiverPhone('')
        setAmount('')
        setConversion(null)
      } else {
        const error = await response.json()
        alert(`Transaction failed: ${error.error}`)
      }
    } catch (error) {
      alert('Transaction failed')
    }
    setSending(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Send Money</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Receiver Phone Number</label>
          <input
            type="tel"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="+250788123456"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">From Currency</label>
            <select
              value={senderCurrency}
              onChange={(e) => setSenderCurrency(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              {Object.entries(AFRICAN_CURRENCIES).map(([code, info]) => (
                <option key={code} value={code}>
                  {code} - {info.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">To Currency</label>
            <select
              value={receiverCurrency}
              onChange={(e) => setReceiverCurrency(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              {Object.entries(AFRICAN_CURRENCIES).map(([code, info]) => (
                <option key={code} value={code}>
                  {code} - {info.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={handleConvert}
            className="w-full p-3 border rounded-lg"
            placeholder="0.00"
          />
        </div>

        {conversion && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Conversion Details</h3>
            <p>Send: {conversion.originalAmount} {conversion.fromCurrency}</p>
            <p>Receive: {conversion.convertedAmount} {conversion.toCurrency}</p>
            <p>Exchange Rate: 1 {conversion.fromCurrency} = {conversion.exchangeRate.toFixed(4)} {conversion.toCurrency}</p>
            <p>Fee: {conversion.fee} {conversion.fromCurrency}</p>
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={!conversion || !receiverPhone || sending}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold disabled:bg-gray-400"
        >
          {sending ? 'Sending...' : 'Send Money'}
        </button>
      </div>
    </div>
  )
}
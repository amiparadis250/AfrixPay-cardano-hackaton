'use client'

import { useState, useEffect } from 'react'

interface Transaction {
  id: string
  senderAmount: number
  receiverAmount: number
  senderCurrency: string
  receiverCurrency: string
  status: string
  createdAt: string
  sender: { phoneNumber: string; firstName?: string; lastName?: string }
  receiver: { phoneNumber: string; firstName?: string; lastName?: string }
  senderId: string
}

interface TransactionHistoryProps {
  userToken: string
  userId: string
}

export default function TransactionHistory({ userToken, userId }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions/history', {
        headers: { 'Authorization': `Bearer ${userToken}` },
      })
      const data = await response.json()
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    }
    setLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600'
      case 'PENDING': return 'text-yellow-600'
      case 'PROCESSING': return 'text-blue-600'
      case 'FAILED': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (loading) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Loading transactions...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
      
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => {
            const isSender = tx.senderId === userId
            const otherParty = isSender ? tx.receiver : tx.sender
            const amount = isSender ? tx.senderAmount : tx.receiverAmount
            const currency = isSender ? tx.senderCurrency : tx.receiverCurrency
            
            return (
              <div key={tx.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      {isSender ? 'Sent to' : 'Received from'} {otherParty.phoneNumber}
                    </p>
                    {(otherParty.firstName || otherParty.lastName) && (
                      <p className="text-sm text-gray-600">
                        {otherParty.firstName} {otherParty.lastName}
                      </p>
                    )}
                    <p className="text-lg font-bold">
                      {isSender ? '-' : '+'}{amount} {currency}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
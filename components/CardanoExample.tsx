'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CardanoExample() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testCreateWallet = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/wallet/create', { method: 'POST' })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to create wallet' })
    }
    setLoading(false)
  }

  const testGetBalance = async () => {
    const address = 'addr_test1qp0x7956qz6w7xvs4s8xh4px7f5gtm9cxqd8c8qd8c8qd8c8qd8c8qd8c8qd8c8qd8c8qd8c8qd8c8qd8c8qd8c8qd8c8qd8c8'
    setLoading(true)
    try {
      const response = await fetch('/api/wallet/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to get balance' })
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cardano API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={testCreateWallet} disabled={loading}>
            Create Wallet
          </Button>
          <Button onClick={testGetBalance} disabled={loading}>
            Test Balance
          </Button>
        </div>
        {result && (
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  )
}
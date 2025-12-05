'use client'
import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Send, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface WalletData {
  mnemonic: string
  publicKey: string
  address: string
}

export default function SendPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [receiverAddress, setReceiverAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const loadWallet = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setPageLoading(false)
        return
      }

      const response = await fetch('/api/wallet/get', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.json()
      if (result.success) {
        setWallet(result.data)
      }
    } catch (error) {
      console.error('Failed to load wallet:', error)
    }
    setPageLoading(false)
  }

  useEffect(() => {
    loadWallet()
  }, [])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallet) {
      setError('No wallet found. Please create a wallet first.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0')
      setLoading(false)
      return
    }

    if (!receiverAddress.trim()) {
      setError('Receiver address is required')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/wallet/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderMnemonic: wallet.mnemonic,
          receiverAddress: receiverAddress.trim(),
          amount: parseFloat(amount)
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setSuccess('Transaction sent successfully!')
        localStorage.setItem('lastTxHash', result.data.txHash)
        setTimeout(() => {
          router.push('/success')
        }, 2000)
      } else {
        setError(result.error || 'Transaction failed')
      }
    } catch (error) {
      setError('Network error: Failed to send transaction')
      console.error('Send error:', error)
    }
    
    setLoading(false)
  }

  if (pageLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Send className="h-8 w-8 animate-pulse mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!wallet) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No Wallet Found</h2>
                  <p className="text-gray-600 mb-4">
                    You need to create a wallet before you can send ADA.
                  </p>
                  <Button onClick={() => router.push('/wallet')} className="w-full">
                    Create Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Send ADA</h1>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Transaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <Label htmlFor="from">From Address</Label>
                  <Input
                    id="from"
                    value={wallet.address}
                    readOnly
                    className="font-mono text-sm bg-gray-50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="to">To Address</Label>
                  <Input
                    id="to"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    placeholder="addr_test1..."
                    className="font-mono text-sm"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="amount">Amount (ADA)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.000001"
                    min="0.000001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    required
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-green-800 text-sm">{success}</p>
                  </div>
                )}
                
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Send className="h-4 w-4 animate-pulse mr-2" />
                      Sending Transaction...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send ADA
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
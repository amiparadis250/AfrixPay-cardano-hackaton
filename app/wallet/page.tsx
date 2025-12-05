'use client'
import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Wallet as WalletIcon, RefreshCw } from 'lucide-react'

interface WalletData {
  mnemonic: string
  publicKey: string
  address: string
}

interface Balance {
  ada: string
  tokens: Array<{ unit: string; quantity: string }>
}

function Wallet() {
  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [balance, setBalance] = useState<Balance | null>(null)
  const [loading, setLoading] = useState(false)
  const [balanceLoading, setBalanceLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')
  const [showMnemonic, setShowMnemonic] = useState(false)

  const getAuthToken = () => {
    return localStorage.getItem('token')
  }

  const createWallet = async () => {
    setLoading(true)
    setError('')
    try {
      const token = getAuthToken()
      if (!token) {
        setError('Please login first')
        setLoading(false)
        return
      }

      const response = await fetch('/api/wallet/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.json()
      if (result.success) {
        setWallet(result.data)
      } else {
        setError(result.error || 'Failed to create wallet')
      }
    } catch (error) {
      setError('Network error: Unable to create wallet')
      console.error('Failed to create wallet:', error)
    }
    setLoading(false)
  }

  const fetchBalance = async () => {
    if (!wallet) return
    setBalanceLoading(true)
    try {
      const response = await fetch('/api/wallet/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: wallet.address })
      })
      const result = await response.json()
      if (result.success) {
        setBalance(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error)
    }
    setBalanceLoading(false)
  }

  const requestTestAda = async () => {
    if (!wallet) return
    setBalanceLoading(true)
    try {
      const response = await fetch('/api/wallet/faucet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: wallet.address })
      })
      const result = await response.json()
      if (result.success) {
        if (result.data.faucetUrl) {
          // Show manual faucet instructions
          const proceed = confirm(result.data.message + '\n\nClick OK to open the faucet website.')
          if (proceed) {
            window.open(result.data.faucetUrl, '_blank')
          }
        } else {
          alert(result.data.message)
        }
        // Refresh balance after a delay
        setTimeout(() => fetchBalance(), 3000)
      } else {
        alert(result.error)
      }
    } catch (error) {
      console.error('Failed to request test ADA:', error)
      alert('Failed to request test ADA')
    }
    setBalanceLoading(false)
  }

  const loadExistingWallet = async () => {
    try {
      const token = getAuthToken()
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  useEffect(() => {
    loadExistingWallet()
  }, [])

  useEffect(() => {
    if (wallet) {
      fetchBalance()
    }
  }, [wallet])

  if (pageLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading wallet...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Cardano Wallet</h1>
          
          {!wallet ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WalletIcon className="h-5 w-5" />
                  Create New Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Create a new Cardano wallet to start sending and receiving ADA.
                </p>
                <Button onClick={createWallet} disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      Creating Wallet...
                    </>
                  ) : (
                    <>
                      <WalletIcon className="h-4 w-4 mr-2" />
                      Create Wallet
                    </>
                  )}
                </Button>
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Balance
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={requestTestAda}
                        disabled={balanceLoading}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        Get Test ADA
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchBalance}
                        disabled={balanceLoading}
                      >
                        <RefreshCw className={`h-4 w-4 ${balanceLoading ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {balance ? (
                    <div>
                      <div className="text-2xl font-bold">{balance.ada} ADA</div>
                      {balance.tokens.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Tokens:</h4>
                          {balance.tokens.map((token, index) => (
                            <div key={index} className="text-sm">
                              {token.unit}: {token.quantity}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>Loading balance...</div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wallet Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Input value={wallet.address} readOnly className="font-mono text-sm" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(wallet.address)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recovery Phrase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                    <p className="text-yellow-800 text-sm">
                      ⚠️ Keep this recovery phrase safe and never share it with anyone!
                    </p>
                  </div>
                  
                  {!showMnemonic ? (
                    <div className="text-center py-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowMnemonic(true)}
                        className="mb-2"
                      >
                        👁️ Click to Reveal Recovery Phrase
                      </Button>
                      <p className="text-sm text-gray-500">
                        Make sure no one is watching your screen
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Input value={wallet.mnemonic} readOnly className="font-mono text-sm" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(wallet.mnemonic)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMnemonic(false)}
                        className="w-full"
                      >
                        🙈 Hide Recovery Phrase
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Wallet
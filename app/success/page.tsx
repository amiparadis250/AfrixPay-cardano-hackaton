'use client'
import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle, Copy, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const [txHash, setTxHash] = useState('')
  const router = useRouter()

  useEffect(() => {
    const hash = localStorage.getItem('lastTxHash')
    if (hash) {
      setTxHash(hash)
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const openInExplorer = () => {
    const explorerUrl = `https://preview.cardanoscan.io/transaction/${txHash}`
    window.open(explorerUrl, '_blank')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Transaction Successful!</h1>
                <p className="text-gray-600 mb-6">
                  Your ADA has been sent successfully to the recipient.
                </p>
                
                {txHash && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Transaction Hash</label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={txHash}
                          readOnly
                          className="font-mono text-xs"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(txHash)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={openInExplorer}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4 justify-center mt-6">
                  <Button onClick={() => router.push('/send')}>
                    Send Another
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/wallet')}>
                    View Wallet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
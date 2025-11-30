'use client'

import { useState, useEffect } from 'react'
import RegisterForm from '@/components/RegisterForm'
import SendMoney from '@/components/SendMoney'
import TransactionHistory from '@/components/TransactionHistory'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'send' | 'history'>('send')

  useEffect(() => {
    // Check for existing session
    const savedToken = localStorage.getItem('afrixpay_token')
    const savedUser = localStorage.getItem('afrixpay_user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleRegisterSuccess = (userData: any, userToken: string) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('afrixpay_token', userToken)
    localStorage.setItem('afrixpay_user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('afrixpay_token')
    localStorage.removeItem('afrixpay_user')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">AfriXPay</h1>
            <p className="text-gray-600">Cross-border remittance for Africa</p>
          </div>
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">AfriXPay</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.firstName || user.phoneNumber}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* User Info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="font-semibold">{user.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Country</p>
              <p className="font-semibold">{user.country}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">KYC Status</p>
              <span className={`px-2 py-1 rounded text-sm ${
                user.kycStatus === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                user.kycStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {user.kycStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('send')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'send'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Send Money
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Transaction History
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeTab === 'send' && (
            <SendMoney userToken={token} userCountry={user.country} />
          )}
          {activeTab === 'history' && (
            <TransactionHistory userToken={token} userId={user.id} />
          )}
        </div>
      </div>
    </div>
  )
}
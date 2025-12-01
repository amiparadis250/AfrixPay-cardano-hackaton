'use client'

import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Send, Download, RefreshCw, Banknote, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Dashboard() {
  const router = useRouter();

  const recentTransactions = [
    {
      id: 'TXN-2024-001',
      type: 'sent',
      recipient: 'Jane Kamau',
      amount: '10,000 KES',
      status: 'completed',
      date: '2025-11-28',
      time: '14:32',
    },
    {
      id: 'TXN-2024-002',
      type: 'received',
      recipient: 'David Mutua',
      amount: '5,000 KES',
      status: 'completed',
      date: '2025-11-27',
      time: '09:15',
    },
    {
      id: 'TXN-2024-003',
      type: 'sent',
      recipient: 'Sarah Nkunda',
      amount: '25,000 RWF',
      status: 'completed',
      date: '2025-11-26',
      time: '16:45',
    },
    {
      id: 'TXN-2024-004',
      type: 'sent',
      recipient: 'Peter Omondi',
      amount: '15,000 KES',
      status: 'pending',
      date: '2025-11-26',
      time: '11:20',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, John</p>
          </div>

          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-br from-[#0052FF] to-[#0036C8] rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-blue-100 mb-2">Total Balance</p>
                <div className="text-5xl mb-1">$2,450.00</div>
                <p className="text-blue-100">≈ 306,250 KES</p>
              </div>
              <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+5.2%</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-100">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              All systems operational
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => router.push('/send')}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#0052FF] hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0052FF] transition-colors">
                  <Send className="w-6 h-6 text-[#0052FF] group-hover:text-white transition-colors" />
                </div>
                <div className="text-gray-900">Send</div>
                <div className="text-sm text-gray-500">Send money</div>
              </button>

              <button className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#0052FF] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0052FF] transition-colors">
                  <Download className="w-6 h-6 text-[#0052FF] group-hover:text-white transition-colors" />
                </div>
                <div className="text-gray-900">Receive</div>
                <div className="text-sm text-gray-500">Get paid</div>
              </button>

              <button className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#0052FF] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0052FF] transition-colors">
                  <RefreshCw className="w-6 h-6 text-[#0052FF] group-hover:text-white transition-colors" />
                </div>
                <div className="text-gray-900">Swap</div>
                <div className="text-sm text-gray-500">Exchange currency</div>
              </button>

              <button className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#0052FF] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0052FF] transition-colors">
                  <Banknote className="w-6 h-6 text-[#0052FF] group-hover:text-white transition-colors" />
                </div>
                <div className="text-gray-900">Cash-out</div>
                <div className="text-sm text-gray-500">Withdraw to mobile</div>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-gray-900">Recent Transactions</h2>
              <button
                onClick={() => router.push('/transactions')}
                className="text-[#0052FF] hover:text-[#0036C8] text-sm"
              >
                View all
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Type</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Recipient</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Amount</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Status</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {transaction.type === 'sent' ? (
                            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                              <ArrowUpRight className="w-4 h-4 text-red-600" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                              <ArrowDownRight className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                          <span className="text-sm text-gray-900 capitalize">
                            {transaction.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{transaction.recipient}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{transaction.amount}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${
                            transaction.status === 'completed'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-yellow-50 text-yellow-700'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{transaction.date}</div>
                        <div className="text-xs text-gray-500">{transaction.time}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

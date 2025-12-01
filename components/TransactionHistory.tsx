'use client'

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, ChevronDown } from 'lucide-react';

export function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const transactions = [
    {
      id: 'TXN-2024-001',
      type: 'sent',
      recipient: 'Jane Kamau',
      phone: '+254 712 345 678',
      country: 'Kenya',
      amount: '10,000 KES',
      status: 'completed',
      date: '2025-11-28',
      time: '14:32',
      reference: 'REF-KE-001',
    },
    {
      id: 'TXN-2024-002',
      type: 'received',
      recipient: 'David Mutua',
      phone: '+254 723 456 789',
      country: 'Kenya',
      amount: '5,000 KES',
      status: 'completed',
      date: '2025-11-27',
      time: '09:15',
      reference: 'REF-KE-002',
    },
    {
      id: 'TXN-2024-003',
      type: 'sent',
      recipient: 'Sarah Nkunda',
      phone: '+250 788 123 456',
      country: 'Rwanda',
      amount: '25,000 RWF',
      status: 'completed',
      date: '2025-11-26',
      time: '16:45',
      reference: 'REF-RW-003',
    },
    {
      id: 'TXN-2024-004',
      type: 'sent',
      recipient: 'Peter Omondi',
      phone: '+254 734 567 890',
      country: 'Kenya',
      amount: '15,000 KES',
      status: 'pending',
      date: '2025-11-26',
      time: '11:20',
      reference: 'REF-KE-004',
    },
    {
      id: 'TXN-2024-005',
      type: 'sent',
      recipient: 'Grace Achieng',
      phone: '+256 701 234 567',
      country: 'Uganda',
      amount: '50,000 UGX',
      status: 'completed',
      date: '2025-11-25',
      time: '13:55',
      reference: 'REF-UG-005',
    },
    {
      id: 'TXN-2024-006',
      type: 'received',
      recipient: 'Michael Wanjiru',
      phone: '+254 745 678 901',
      country: 'Kenya',
      amount: '8,500 KES',
      status: 'completed',
      date: '2025-11-24',
      time: '10:30',
      reference: 'REF-KE-006',
    },
    {
      id: 'TXN-2024-007',
      type: 'sent',
      recipient: 'Emmanuel Okeke',
      phone: '+234 803 456 7890',
      country: 'Nigeria',
      amount: '20,000 NGN',
      status: 'failed',
      date: '2025-11-23',
      time: '15:10',
      reference: 'REF-NG-007',
    },
    {
      id: 'TXN-2024-008',
      type: 'sent',
      recipient: 'Amina Hassan',
      phone: '+255 712 345 678',
      country: 'Tanzania',
      amount: '40,000 TZS',
      status: 'completed',
      date: '2025-11-22',
      time: '08:45',
      reference: 'REF-TZ-008',
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'failed':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">Transaction History</h1>
            <p className="text-gray-600">View and manage all your transactions</p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="sent">Sent</option>
                    <option value="received">Received</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                <button className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-4 text-sm text-gray-600">Status</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-600">Type</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-600">Amount</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-600">From / To</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-600">Date</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-600">Reference</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
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
                      <div className="text-sm text-gray-900">{transaction.amount}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{transaction.recipient}</div>
                        <div className="text-xs text-gray-500">{transaction.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{transaction.date}</div>
                        <div className="text-xs text-gray-500">{transaction.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-mono">
                        {transaction.reference}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">No transactions found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredTransactions.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Previous
                </button>
                <button className="px-4 py-2 bg-[#0052FF] text-white rounded-lg hover:bg-[#0036C8] transition-colors text-sm">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

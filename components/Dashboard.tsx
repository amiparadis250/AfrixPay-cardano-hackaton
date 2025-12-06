'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Send, Download, RefreshCw, Banknote, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState('0.00');
  const [adaBalance, setAdaBalance] = useState('0.00');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      router.push('/auth');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Fetch wallet balance and transactions
    fetchBalance(token);
    fetchTransactions(token);
  }, [router]);

  const fetchBalance = async (token: string) => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) return;
      
      const parsedUser = JSON.parse(userData);
      const walletAddress = parsedUser.wallet?.cardanoAddress;
      const userCurrency = parsedUser.wallet?.currency || 'USD';
      
      if (!walletAddress) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/wallet/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: walletAddress })
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const adaAmount = parseFloat(result.data.ada);
          setAdaBalance(adaAmount.toFixed(2));
          
          // Convert to user currency
          const ADA_TO_USD = 0.35;
          const USD_TO_CURRENCY: { [key: string]: number } = {
            'DZD': 134.5, 'AOA': 825.0, 'XOF': 615.0, 'BWP': 13.5, 'BIF': 2850.0,
            'CVE': 103.5, 'XAF': 615.0, 'KMF': 461.0, 'CDF': 2800.0, 'DJF': 177.0,
            'EGP': 48.5, 'ERN': 15.0, 'SZL': 18.0, 'ETB': 120.0, 'GMD': 67.0,
            'GHS': 15.5, 'GNF': 8600.0, 'KES': 129.0, 'LSL': 18.0, 'LRD': 185.0,
            'LYD': 4.8, 'MGA': 4500.0, 'MWK': 1730.0, 'MRU': 39.5, 'MUR': 46.0,
            'MAD': 9.9, 'MZN': 63.5, 'NAD': 18.0, 'NGN': 1550.0, 'RWF': 1350.0,
            'STN': 23.0, 'SCR': 13.5, 'SLL': 22000.0, 'SOS': 571.0, 'ZAR': 18.0,
            'SSP': 1300.0, 'SDG': 600.0, 'TZS': 2600.0, 'TND': 3.1, 'UGX': 3700.0,
            'ZMW': 27.0, 'ZWL': 322.0, 'USD': 1.0
          };
          
          const rate = USD_TO_CURRENCY[userCurrency] || 1;
          const convertedAmount = adaAmount * ADA_TO_USD * rate;
          setBalance(convertedAmount.toFixed(2));
        }
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (token: string) => {
    try {
      const response = await fetch('/api/transactions/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setTransactions(result.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  if (loading || typeof window === 'undefined') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const formatTransaction = (tx: any) => {
    const isSent = tx.senderId === user?.id;
    const otherUser = isSent ? tx.receiver : tx.sender;
    const name = otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : tx.receiverEmail;
    
    return {
      id: tx.id,
      type: isSent ? 'sent' : 'received',
      recipient: name,
      amount: `${parseFloat(tx.amount).toFixed(2)} ${tx.currency}`,
      status: tx.status.toLowerCase(),
      date: new Date(tx.createdAt).toLocaleDateString(),
      time: new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const recentTransactions = transactions.map(formatTransaction);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName || 'User'}</p>
          </div>

          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-br from-[#0052FF] to-[#0036C8] rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="mb-2 text-blue-100">Total Balance</p>
                <div className="mb-1 text-5xl">{user?.wallet?.currency || 'RWF'} {balance}</div>
                <p className="text-sm text-blue-100">{adaBalance} ADA</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur">
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
            <h2 className="mb-4 text-xl text-gray-900">Quick Actions</h2>
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
            <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-4 text-sm text-left text-gray-600">Type</th>
                    <th className="px-6 py-4 text-sm text-left text-gray-600">Recipient</th>
                    <th className="px-6 py-4 text-sm text-left text-gray-600">Amount</th>
                    <th className="px-6 py-4 text-sm text-left text-gray-600">Status</th>
                    <th className="px-6 py-4 text-sm text-left text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No transactions yet
                      </td>
                    </tr>
                  ) : recentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="transition-colors border-b border-gray-100 hover:bg-blue-50/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {transaction.type === 'sent' ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50">
                              <ArrowUpRight className="w-4 h-4 text-red-600" />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50">
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

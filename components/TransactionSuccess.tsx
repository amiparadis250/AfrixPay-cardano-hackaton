'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle2, Download, Share2, ArrowLeft } from 'lucide-react';

export function TransactionSuccess() {
  const router = useRouter();
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const data = sessionStorage.getItem('transactionData');
    if (data) {
      setState(JSON.parse(data));
    }
  }, []);

  const transactionId = 'TXN-2024-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const timestamp = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl text-gray-900 mb-3">Transfer Successful!</h1>
          <p className="text-xl text-gray-600">
            Your money has been sent to {state.recipientPhone || 'the recipient'}
          </p>
        </div>

        {/* Transaction Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <h2 className="text-xl text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Transaction Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Transaction ID</span>
              <span className="text-gray-900 font-mono">{transactionId}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-gray-600">Date & Time</span>
              <span className="text-gray-900">{timestamp}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-gray-600">Recipient</span>
              <span className="text-gray-900">{state.recipientPhone || '—'}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-gray-600">Amount Sent</span>
              <span className="text-gray-900">
                {state.amount || '0.00'} {state.currency || 'KES'}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-gray-600">Fee</span>
              <span className="text-gray-900">
                {state.fee || '0.00'} {state.currency || 'KES'}
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Amount Received</span>
                <span className="text-2xl text-[#0052FF]">
                  {state.amountReceived || '0.00'} {state.recipientCurrency || 'RWF'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-gray-600">Status</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-700">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mb-6">
          <button className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download Receipt
          </button>
          <button className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 px-6 py-3 bg-[#0052FF] text-white rounded-lg hover:bg-[#0036C8] transition-colors"
          >
            Return to Dashboard
          </button>
          <button
            onClick={() => router.push('/send')}
            className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Send Another
          </button>
        </div>
      </div>
    </div>
  );
}

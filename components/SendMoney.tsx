'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { ConfirmationModal } from './ConfirmationModal';
import { ArrowRight, Info, Check, User } from 'lucide-react';

export function SendMoney() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [recipientInfo, setRecipientInfo] = useState<{id: string, name: string, phone: string} | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'ADA',
    recipientAddress: '',
    recipientCurrency: 'ADA',
  });

  const currencies = [
    { code: 'ADA', name: 'Cardano', flag: '₳' },
  ];

  const exchangeRate = 1; // ADA to ADA
  const feePercentage = 0.002; // 0.2% for blockchain
  
  const amount = parseFloat(formData.amount) || 0;
  const fee = amount * feePercentage;
  const amountReceived = amount - fee;

  const lookupRecipient = async (address: string) => {
    if (!address || address.length < 10) {
      setRecipientInfo(null);
      return;
    }

    setLookupLoading(true);
    try {
      const response = await fetch('/api/wallet/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      });
      const result = await response.json();
      if (result.success) {
        setRecipientInfo(result.data);
      } else {
        setRecipientInfo(null);
      }
    } catch (error) {
      console.error('Lookup error:', error);
      setRecipientInfo(null);
    }
    setLookupLoading(false);
  };

  const handleConfirm = async () => {
    setSending(true);
    setError('');
    
    try {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (!userData || !token) {
        router.push('/auth');
        return;
      }

      const user = JSON.parse(userData);
      const mnemonic = user.wallet?.cardanoMnemonic;
      
      if (!mnemonic) {
        setError('Wallet not found');
        setSending(false);
        return;
      }

      const response = await fetch('/api/wallet/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          senderMnemonic: mnemonic,
          receiverAddress: formData.recipientAddress,
          amount: parseFloat(formData.amount)
        })
      });

      const result = await response.json();
      
      if (result.success) {
        sessionStorage.setItem('transactionData', JSON.stringify({
          amount: formData.amount,
          currency: formData.currency,
          recipientAddress: formData.recipientAddress,
          recipientName: recipientInfo?.name || 'Unknown User',
          recipientCurrency: formData.recipientCurrency,
          amountReceived: amountReceived.toFixed(6),
          fee: fee.toFixed(6),
          txHash: result.data.txHash,
          explorerUrl: result.data.explorerUrl
        }));
        router.push('/success');
      } else {
        setError(result.error || 'Transaction failed');
        setSending(false);
      }
    } catch (err: any) {
      setError(err.message || 'Transaction failed');
      setSending(false);
    }
  };

  const recipientDetected = recipientInfo !== null;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      lookupRecipient(formData.recipientAddress);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.recipientAddress]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl p-8 mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl text-gray-900">Send Money</h1>
            <p className="text-gray-600">Send money instantly across Africa</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Form */}f
            <div className="col-span-2">
              <div className="p-8 bg-white border border-gray-200 rounded-2xl">
                <form className="space-y-6">
                  {/* Amount */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-700">
                      You send
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="flex-1 px-4 py-4 text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                      />
                      <select
                        value={formData.currency}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        aria-label="Select sending currency"
                        className="px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.flag} {currency.code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Exchange Rate */}
                  {amount > 0 && (
                    <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Exchange Rate</span>
                        <span className="text-sm text-[#0052FF]">
                          1 {formData.currency} = {exchangeRate} {formData.recipientCurrency} (minus network fee)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">
                          Rate locked for 10 minutes
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Recipient */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-700">
                      Recipient Cardano Address
                    </label>
                    <input
                      type="text"
                      placeholder="addr1q..."
                      value={formData.recipientAddress}
                      onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent font-mono text-sm"
                    />
                    {lookupLoading && (
                      <div className="mt-2 text-sm text-gray-500">Looking up recipient...</div>
                    )}
                  </div>

                  {/* Auto-detected Recipient */}
                  {recipientDetected && (
                    <div className="flex items-center gap-3 p-4 border border-green-200 bg-green-50 rounded-xl">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-900">{recipientInfo.name}</div>
                        <div className="text-xs text-gray-600">Cardano Wallet • {recipientInfo.phone || 'Verified User'}</div>
                      </div>
                    </div>
                  )}
                  {formData.recipientAddress && !recipientDetected && !lookupLoading && (
                    <div className="flex items-center gap-3 p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
                      <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                        <User className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-900">Unknown Recipient</div>
                        <div className="text-xs text-gray-600">Address not registered in our system</div>
                      </div>
                    </div>
                  )}

                  {/* Recipient receives */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-700">
                      Recipient receives
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={amount > 0 ? amountReceived.toFixed(2) : '0.00'}
                        readOnly
                        title="Recipient receives amount"
                        className="flex-1 px-4 py-4 text-2xl border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <select
                        value={formData.recipientCurrency}
                        onChange={(e) =>
                          setFormData({ ...formData, recipientCurrency: e.target.value })
                        }
                        aria-label="Select recipient currency"
                        className="px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.flag} {currency.code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    disabled={!amount || !formData.recipientAddress}
                    className="w-full py-4 bg-[#0052FF] text-white rounded-lg hover:bg-[#0036C8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Send Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Summary Panel */}
            <div className="space-y-4">
              <div className="p-6 bg-white border border-gray-200 rounded-2xl">
                <h3 className="mb-4 text-lg text-gray-900">Transfer Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-sm text-gray-900">
                      {amount > 0 ? `${amount.toFixed(2)} ${formData.currency}` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Network Fee (0.2%)</span>
                    <span className="text-sm text-gray-900">
                      {amount > 0 ? `${fee.toFixed(6)} ${formData.currency}` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Recipient receives</span>
                    <span className="text-sm text-gray-900">
                      {amount > 0 ? `${amountReceived.toFixed(6)} ${formData.currency}` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 mt-2">
                    <span className="text-gray-900">Total to send</span>
                    <span className="text-xl text-[#0052FF]">
                      {amount > 0 ? `${amount.toFixed(6)} ${formData.currency}` : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="p-6 border border-blue-100 bg-blue-50 rounded-xl">
                <h4 className="mb-2 text-sm text-gray-900">Why AfriXPay?</h4>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0052FF] flex-shrink-0 mt-0.5" />
                    <span>Instant settlement via blockchain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0052FF] flex-shrink-0 mt-0.5" />
                    <span>Up to 90% cheaper than banks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0052FF] flex-shrink-0 mt-0.5" />
                    <span>Secure and transparent transfers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        recipient={recipientInfo?.name || 'Unknown User'}
        country="Cardano Network"
        amountSent={`${amount.toFixed(6)} ${formData.currency}`}
        amountReceived={`${amountReceived.toFixed(6)} ${formData.recipientCurrency}`}
        exchangeRate={`Network Fee: ${fee.toFixed(6)} ${formData.currency}`}
        fee={`${fee.toFixed(6)} ${formData.currency}`}
        loading={sending}
        error={error}
      />
    </div>
  );
}

'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { ConfirmationModal } from './ConfirmationModal';
import { ArrowRight, Info, Check } from 'lucide-react';

export function SendMoney() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'KES',
    recipientPhone: '',
    recipientCurrency: 'RWF',
  });

  const currencies = [
    { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
    { code: 'RWF', name: 'Rwandan Franc', flag: '🇷🇼' },
    { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
    { code: 'TZS', name: 'Tanzanian Shilling', flag: '🇹🇿' },
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
  ];

  const exchangeRate = 7.85; // KES to RWF
  const feePercentage = 0.008; // 0.8%
  
  const amount = parseFloat(formData.amount) || 0;
  const fee = amount * feePercentage;
  const amountReceived = amount * exchangeRate;

  const handleConfirm = () => {
    // Store transaction data in sessionStorage for Next.js
    sessionStorage.setItem('transactionData', JSON.stringify({
      amount: formData.amount,
      currency: formData.currency,
      recipientPhone: formData.recipientPhone,
      recipientCurrency: formData.recipientCurrency,
      amountReceived: amountReceived.toFixed(2),
      fee: fee.toFixed(2),
    }));
    router.push('/success');
  };

  const recipientDetected = formData.recipientPhone.length >= 10;

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
                          1 {formData.currency} = {exchangeRate} {formData.recipientCurrency}
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
                      Recipient phone number
                    </label>
                    <input
                      type="tel"
                      placeholder="+250 700 000 000"
                      value={formData.recipientPhone}
                      onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                    />
                  </div>

                  {/* Auto-detected Recipient */}
                  {recipientDetected && (
                    <div className="flex items-center gap-3 p-4 border border-green-200 bg-green-50 rounded-xl">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-900">Sarah Nkunda</div>
                        <div className="text-xs text-gray-600">MTN Mobile Money • Rwanda</div>
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
                    disabled={!amount || !recipientDetected}
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
                    <span className="text-sm text-gray-600">Fee (0.8%)</span>
                    <span className="text-sm text-gray-900">
                      {amount > 0 ? `${fee.toFixed(2)} ${formData.currency}` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Exchange rate</span>
                    <span className="text-sm text-gray-900">
                      1:{exchangeRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 mt-2">
                    <span className="text-gray-900">Total to pay</span>
                    <span className="text-xl text-[#0052FF]">
                      {amount > 0 ? `${(amount + fee).toFixed(2)} ${formData.currency}` : '—'}
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
        recipient="Sarah Nkunda"
        country="Rwanda"
        amountSent={`${amount.toFixed(2)} ${formData.currency}`}
        amountReceived={`${amountReceived.toFixed(2)} ${formData.recipientCurrency}`}
        exchangeRate={`1 ${formData.currency} = ${exchangeRate} ${formData.recipientCurrency}`}
        fee={`${fee.toFixed(2)} ${formData.currency}`}
      />
    </div>
  );
}

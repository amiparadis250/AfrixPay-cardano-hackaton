import { X, AlertCircle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recipient: string;
  country: string;
  amountSent: string;
  amountReceived: string;
  exchangeRate: string;
  fee: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  recipient,
  country,
  amountSent,
  amountReceived,
  exchangeRate,
  fee,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-2xl text-gray-900">Confirm Transfer</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#0052FF] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              Please review the transfer details carefully before confirming. This action cannot be undone.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Recipient</span>
              <span className="text-gray-900">{recipient}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Country</span>
              <span className="text-gray-900">{country}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">You send</span>
              <span className="text-gray-900">{amountSent}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Exchange rate</span>
              <span className="text-gray-900">{exchangeRate}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Fee</span>
              <span className="text-gray-900">{fee}</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Recipient receives</span>
                <span className="text-2xl text-[#0052FF]">{amountReceived}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-[#0052FF] text-white rounded-lg hover:bg-[#0036C8] transition-colors"
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

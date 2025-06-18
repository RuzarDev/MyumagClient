import React, { useState } from 'react';
import { PaymentModalProps } from '../types';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onComplete, totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | null>(null);
  const [cashAmount, setCashAmount] = useState<string>('');
  const [change, setChange] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCashInput = (value: string) => {
    setCashAmount(value);
    const numValue = parseFloat(value) || 0;
    if (numValue > totalAmount) {
      setChange(numValue - totalAmount);
    } else {
      setChange(null);
    }
  };

  const handleNumberClick = (num: string) => {
    handleCashInput(cashAmount + num);
  };

  const handleClear = () => {
    setCashAmount('');
    setChange(null);
  };

  const handlePayment = () => {
    if (paymentMethod === 'card' || (paymentMethod === 'cash' && parseFloat(cashAmount) >= totalAmount)) {
      onComplete();
      setPaymentMethod(null);
      setCashAmount('');
      setChange(null);
    }
  };

  const handleCardPayment = () => {
    handlePayment();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Оплата</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        {!paymentMethod ? (
          <div className="space-y-4">
            <button
              onClick={() => setPaymentMethod('cash')}
              className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Наличными
            </button>
            <button
              onClick={handleCardPayment}
              className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Картой
            </button>
          </div>
        ) : paymentMethod === 'cash' ? (
          <div>
            <div className="mb-4">
              <input
                type="text"
                value={cashAmount}
                readOnly
                className="w-full p-3 text-right text-2xl border rounded"
                placeholder="0"
              />
              {change !== null && (
                <div className="mt-2 text-right text-green-600">
                  Сдача: {change.toFixed(2)} ₸
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  className="p-4 text-xl bg-gray-100 rounded hover:bg-gray-200"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="p-4 text-xl bg-red-100 rounded hover:bg-red-200"
              >
                C
              </button>
              <button
                onClick={() => handleNumberClick('0')}
                className="p-4 text-xl bg-gray-100 rounded hover:bg-gray-200"
              >
                0
              </button>
              <button
                onClick={() => handleNumberClick('.')}
                className="p-4 text-xl bg-gray-100 rounded hover:bg-gray-200"
              >
                .
              </button>
            </div>

            <button
              onClick={handlePayment}
              disabled={parseFloat(cashAmount) < totalAmount}
              className={`w-full mt-4 py-3 rounded ${
                parseFloat(cashAmount) >= totalAmount
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Оплатить
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentModal;
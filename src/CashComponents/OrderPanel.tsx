import React from 'react';
import { OrderItem } from '../types';

interface OrderPanelProps {
  orderItems: OrderItem[];
  totalAmount: number;
  removeFromOrder: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  onPaymentClick: () => void;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ 
  orderItems, 
  totalAmount, 
  removeFromOrder,
  updateQuantity,
  onPaymentClick
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 border-b">
        <div className="grid grid-cols-12 gap-2 font-medium text-sm text-gray-700">
          <div className="col-span-5">Наименование</div>
          <div className="col-span-2 text-center">Кол-во</div>
          <div className="col-span-2 text-center">Цена</div>
          <div className="col-span-3 text-right">Итого</div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {orderItems.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 p-4 border-b text-sm hover:bg-gray-50">
            <div className="col-span-5">{item.name}</div>
            <div className="col-span-2 text-center">
              <div className="flex items-center justify-center">
                <button 
                  className="px-2 text-gray-500 hover:text-gray-800"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="mx-1">{item.quantity}</span>
                <button 
                  className="px-2 text-gray-500 hover:text-gray-800"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-span-2 text-center">{item.price} ₸</div>
            <div className="col-span-2 text-right">{item.price * item.quantity} ₸</div>
            <div className="col-span-1 text-right">
              <button 
                className="text-gray-500 hover:text-red-500"
                onClick={() => removeFromOrder(item.id)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto bg-white p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <div className="font-medium">К оплате</div>
          <div className="font-bold text-xl">{totalAmount.toFixed(2)} ₸</div>
        </div>
        
        <div className="flex justify-between">
          <button className="border border-gray-300 rounded px-6 py-3 flex items-center justify-center">
            <span className="text-2xl">...</span>
          </button>
          <button 
            className="bg-green-500 hover:bg-green-600 text-white rounded px-12 py-3 font-medium"
            onClick={onPaymentClick}
          >
            Оплатить
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel
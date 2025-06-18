import { shiftState } from '@/app/shift/page';
import { Order } from '@/types';
import exp from 'node:constants';

type ModalShiftProps = {
  isOpen: boolean;
  onClose: () => void;
  shift: shiftState | null;
  orders: Order[];
};

const ModalShift = ({ isOpen, onClose, shift, orders }: ModalShiftProps) => {
  if (!isOpen || !shift) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-slate-600 hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Смена #{shift.id} — чеки</h2>
        <div className="space-y-2">
          {orders?.length === 0 ? (
            <p className="text-slate-500">Нет чеков для отображения</p>
          ) : (
            orders?.map((order) => (
              <div key={order.id} className="p-3 border border-slate-200 rounded-lg">
                <div><strong>ID:</strong> {order.id}</div>
                <div><strong>Amount:</strong> {order.totalAmount} KZT</div>
                <div><strong>Pay method:</strong> {order.paymentMethod === 'cash' ? 'Cash' : 'Card'}</div>
                <div><strong>Date:</strong> {new Date(order.orderDate).toLocaleString('ru-RU')}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default ModalShift
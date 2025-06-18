import { useEffect, useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import axios from 'axios';
import api from "@/data/dataBase";

interface AddSupplyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSupplyDialog = ({ isOpen, onClose }: AddSupplyDialogProps) => {
  const [selectedSupplier, setSelectedSupplier] = useState('Metro');
  const [selectedWarehouse, setSelectedWarehouse] = useState('Склад 1');
  const [menuList, setMenuList] = useState<Array<{ id: number; name: string; cost: number }>>([]);
  const [items, setItems] = useState<Array<{ menuItemId: number | ''; quantity: string; price: string }>>([]);

  const [comment, setComment] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/menu');
        setMenuList(res.data); // здесь просто устанавливаем данные
      } catch (e) {
        console.error('fetch data failed', e);
      }
    };
    fetchData()
  }, []);

  if (!isOpen) return null;

  const addItem = () => {
    setItems([...items, { menuItemId: '', quantity: '', price: '' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      supplier: selectedSupplier,
      warehouse: selectedWarehouse,
      items,
      comment
    });
    onClose();
  };
  const totalAmount = items.reduce((sum, item) => {
    const quantity = parseFloat(item.quantity);
    const price = parseFloat(item.price);
    if (!isNaN(quantity) && !isNaN(price)) {
      return sum + quantity * price;
    }
    return sum;
  }, 0);


  async function createOrder() {
    try {
      const payload = {
        supplier: selectedSupplier,
        warehouse: selectedWarehouse,
        comment,
        amount: totalAmount,
        items: items.map(item => ({
          menuItemId: item.menuItemId,
          quantity: Number(item.quantity),
          price: Number(item.price)
        }))
      };

      const res = await api.post('/supply', payload);

      console.log('Order created:', res.data);
      onClose(); // Закрываем диалог
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">Add Supply Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Supplier
                </label>
                <input
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >

                </input>
              </div>


            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Items
              </label>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-1">
                      <select
                        value={item.menuItemId}
                        onChange={(e) => updateItem(index, 'menuItemId', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      >
                        <option value="">Select item</option>
                        {menuList.map(menu => (
                          <option key={menu.id} value={menu.id}>{menu.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-32">
                      <input
                        type="text"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div className="w-32">
                      <input
                        type="text"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <Plus size={16} className="mr-1" />
                  Add Item
                </button>
              </div>
            </div>



            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any additional notes..."
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={()=>createOrder()}
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplyDialog;
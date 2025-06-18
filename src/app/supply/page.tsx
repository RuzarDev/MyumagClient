'use client'
import { useEffect, useState } from 'react';
import {
  Plus,
  Download,
  Search,
  Filter,
  ChevronDown,
  Truck,
  Clock,
  MoreHorizontal, X, Eye,
} from 'lucide-react';
import DataTable from '@/components/DataTable';
import AddSupplyDialog from '@/components/AddSupplyDialog';
import { validateToken } from '@/app/utils/validateToken';
import { useRouter } from 'next/navigation';
import api from "@/data/dataBase";

interface SupplyOrder {
  id: string;
  date: string;
  supplier: string;
  warehouse: string;
  items: string;
  comment: string;
  status: 'Unpaid' | 'Paid' | 'Delivered';
  amount: number;
  debt: number;
}

const supplyData: SupplyOrder[] = [
  {
    id: '122',
    date: '26 апреля, 01:10',
    supplier: 'Metro',
    warehouse: 'Склад 1',
    items: 'Большой макаронс, доставка',
    comment: '—',
    status: 'Unpaid',
    amount: 9500,
    debt: 9500
  },
  {
    id: '123',
    date: '26 апреля, 01:10',
    supplier: 'Metro',
    warehouse: 'Склад 1',
    items: 'Моти',
    comment: '—',
    status: 'Unpaid',
    amount: 6600,
    debt: 6600
  },
  {
    id: '124',
    date: '26 апреля, 01:10',
    supplier: 'Metro',
    warehouse: 'Склад 1',
    items: 'Молоко',
    comment: '—',
    status: 'Unpaid',
    amount: 11100,
    debt: 11100
  },
  {
    id: '125',
    date: '26 апреля, 01:10',
    supplier: 'Metro',
    warehouse: 'Склад 1',
    items: 'Клаб сэндвич Курица',
    comment: '—',
    status: 'Unpaid',
    amount: 10500,
    debt: 10500
  }
];

const Page = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [setMenuData] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await validateToken(); // обязательно await
        if (!res) {
          router.push('/login');
        }
      } catch (err) {
        console.error('Token validation failed', err);
      }

    };
    const fetchData = async () => {
      try {
        const res = await api.get('/menu');
        setMenuData(res.data); // здесь просто устанавливаем данные
        console.log(res.data);
      } catch (e) {
        console.error('fetch data failed', e);
      }
    };
    const fetchSupply = async ()=>{
      try {
        const res = await api.get('/supply')
        setOrders(res.data)
        console.log(res.data);
      }catch (e){
        console.log('error', e);
      }
    }

fetchData()
    checkToken();
    fetchSupply()
  }, [router]);


  const columns = [
    {
      header: 'Order #',
      accessor: 'id',
      cell: (value: string) => (
        <div className="inline-flex items-center justify-center bg-slate-100 px-2.5 py-1 rounded text-sm font-medium text-slate-800">
          {value}
        </div>
      )
    },
    {
      header: 'Date',
      accessor: 'date',
      cell: (value: string) => (
        <div className="flex items-center">
          <Clock size={16} className="text-slate-400 mr-2" />
          <span className="text-slate-600">{value.split('T')[0]}</span>
        </div>
      )
    },
    {
      header: 'Supplier',
      accessor: 'supplier',
      cell: (value: string) => (
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
            <Truck size={16} className="text-blue-600" />
          </div>
          <span className="font-medium text-slate-800">{value}</span>
        </div>
      )
    },

    {
      header: 'Items',
      accessor: 'items',
      cell: (value) => (
        <div>
          {value.map((item, index) => (
            <div key={index}>
              {/* Вы можете отображать данные элемента здесь, например: */}
              <span>{item.menuItem.name} - {item.quantity} x {item.price}</span>
            </div>
          ))}
        </div>
      )
    },

    {
      header: 'Amount',
      accessor: 'amount',
      cell: (value: number) => (
        <span className="font-medium text-slate-800">
          {value.toLocaleString('ru-RU')} ₽
        </span>
      )
    },

    {
      header: '',
      accessor: 'id',
      sortable: false,
      cell: (_, row) => (
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-md hover:bg-slate-100">
            <Eye size={16} className="text-slate-500" />
          </button>
          <button
            className="p-1 rounded-md hover:bg-slate-100"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedOrder(row);
            }}
          >
            <MoreHorizontal size={16} className="text-slate-500" />
          </button>
        </div>
      )
    }
  ];

  const filteredOrders = orders.filter(order => {
    return (
      (order.id && order.id.toString().includes(searchQuery)) || // Преобразуем в строку перед использованием includes
      (order.supplier && order.supplier.toLowerCase().includes(searchQuery.toLowerCase())) ||
      // Проверяем каждый элемент в order.items
      (order.items && order.items.some(item =>
        item.menuItem?.name?.toLowerCase().includes(searchQuery.toLowerCase()) // Ищем по названию элемента, если оно существует
      ))
    );
  });




  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-800">Supply Orders</h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus size={16} className="mr-1.5" />
              New Order
            </button>

            <button className="px-3 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center">
              <Download size={16} className="mr-1.5" />
              Export
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-auto flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounde

d-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
              <option value="Delivered">Delivered</option>
            </select>

            <button className="flex items-center px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
              <Filter size={16} className="mr-1.5" />
              Filters
              <ChevronDown size={16} className="ml-1.5" />
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredOrders}
          onRowClick={(row) => console.log('Clicked on order:', row)}
        />
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-semibold mb-4">Order #{selectedOrder.id}</h3>

              {selectedOrder.items?.length ? (
                <ul className="space-y-3 max-h-72 overflow-y-auto">
                  {selectedOrder.items.map((item, idx: number) => (
                    <li key={idx} className="border-b pb-2">
                      <div className="text-slate-800 font-medium">{item.menuItem.name || 'Unnamed item'}</div>
                      <div className="text-sm text-slate-600">
                        Quantity: {item.quantity} × Price: {item.price || 0} KZT
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500">No order items found.</p>
              )}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium">{orders.length}</span> of <span className="font-medium">{supplyData.length}</span> orders
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
              2
            </button>
            <button className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
              3
            </button>
            <button className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>

      <AddSupplyDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </>
  );
};

export default Page;
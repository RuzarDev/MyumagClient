'use client';
import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/DataTable';
import api from "@/data/dataBase";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionsData, setTransactionsData] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/order');
        const dataWithProfit = res.data.map((order: any) => {
          const profit = order.orderItems?.reduce((acc: number, item: any) => {
            const price = item.menu?.price || 0;
            const cost = item.menu?.cost || 0;
            const quantity = item.quantity || 1;
            return acc + ((price - cost) * quantity);
          }, 0) || 0;
          console.log(res.data);
          return {
            ...order,
            profit,
          };
        });

        setTransactionsData(dataWithProfit);
      } catch (e) {
        console.error('Error:', e);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = transactionsData.filter(transaction =>
    transaction.id.toString().includes(searchQuery) ||
    transaction.server?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: 'Receipt #',
      accessor: 'id',
      cell: (value: string) => (
        <span className="font-medium text-slate-800">{value}</span>
      )
    },
    {
      header: 'Date',
      accessor: 'orderDate',
      cell: (value: string) => (
        <span className="text-slate-600">{value.split('T')[0]}</span>
      )
    },
    {
      header: 'Amount',
      accessor: 'totalAmount',
      cell: (value: number) => (
        <span className="font-medium text-slate-800">
          {value}
        </span>
      )
    },
    {
      header: 'Customer',
      accessor: 'customerId',
      cell: (value: number) => (
        <span className="text-slate-600">
          {value}
        </span>
      )
    },
    {
      header: 'Profit',
      accessor: 'profit',
      cell: (value: number) => (
        <span className="font-medium text-slate-800">
          {value.toLocaleString()} KZT
        </span>
      )
    },
    {
      header: '',
      accessor: 'id',
      sortable: false,
      cell: (_: any, row: any) => (
        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded-md hover:bg-slate-100 text-slate-500"
            onClick={() => setSelectedOrder(row)}
          >
            View
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-slate-800">Transactions</h2>

        <div className="w-full relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by receipt # or server..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-3 mt-4">
          {filteredTransactions.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredTransactions}
              onRowClick={(row) => setSelectedOrder(row)}
            />
          ) : (
            <p className="text-slate-500">No transactions found.</p>
          )}
        </div>
      </div>

      {/* Modal.tsx */}
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

            {selectedOrder.orderItems?.length ? (
              <ul className="space-y-3 max-h-72 overflow-y-auto">
                {selectedOrder.orderItems.map((item: any, idx: number) => (
                  <li key={idx} className="border-b pb-2">
                    <div className="text-slate-800 font-medium">
                      {item.menu?.name || 'Unnamed item'}
                    </div>
                    <div className="text-sm text-slate-600">
                      Quantity: {item.quantity} × Price: {item.menu?.price || 0} KZT
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
    </div>
  );
};

export default Page;

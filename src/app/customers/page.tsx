'use client';  // This ensures that the component is run on the client side

import { useEffect, useState } from 'react';
import { Plus, Download, Search, Filter, ChevronDown, Phone, Mail, User, MoreHorizontal } from 'lucide-react';
import DataTable from '@/components/DataTable';
import { validateToken } from '@/app/utils/validateToken';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from "@/data/dataBase";

const Page = () => {
  const router = useRouter();
  const [reboot, setReboot] = useState(false);
  const [customersData, setCustomersData] = useState([{ name: '', phone: '', email: '' }]);
  const [orderData, setOrderData] = useState([]);

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
        const res = await api.get('/customers');
        const orderRes = await api.get('/order');
        setOrderData(orderRes.data);
        setCustomersData(res.data);
        console.log(orderRes.data);
      } catch (e) {
        console.error('fetch data failed', e);
      }
    };

    checkToken();
    fetchData();
  }, [router, reboot]);

  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    {
      header: 'Customer',
      accessor: 'name',
      cell: (value: string, row: any) => (
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center mr-3">
            <User size={16} className="text-slate-500" />
          </div>
          <div>
            <p className="font-medium text-slate-800">{value}</p>
            <p className="text-xs text-slate-500">{row.id}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: 'Customerphone',
      cell: (value: string, row: any) => (
        <div>
          <div className="flex items-center text-slate-600">
            <Phone size={14} className="mr-1" />
            {value}
          </div>
          {row.email && (
            <div className="flex items-center text-xs text-slate-500 mt-1">
              <Mail size={12} className="mr-1" />
              {row.email}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Total Spent',
      accessor: 'totalSpent',
      cell: (value: number) => (
        <span className="font-medium text-slate-800">
          {value}
        </span>
      ),
    },
    {
      header: 'Orders',
      accessor: 'orders',
      cell: (value: number) => (
        <span className="text-slate-600">
          {value}
        </span>
      ),
    },
    {
      header: 'Avg. Check',
      accessor: 'avgCheck',
      cell: (value: number) => (
        <span className="text-slate-600">
          {value}
        </span>
      ),
    },
  ];

  const customerStats = customersData.map(customer => {
    const customerOrders = orderData.filter(order => order.customerId === customer.id);
    const totalSpent = customerOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const ordersCount = customerOrders.length;
    const avgCheck = ordersCount > 0 ? Math.round(totalSpent / ordersCount) : 0;

    return {
      ...customer,
      totalSpent,
      orders: ordersCount,
      avgCheck,
    };
  });

  console.log(customerStats);

  const filteredCustomers = customersData.filter(customer =>
    (customer.name && customer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (customer.phone && customer.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  console.log(customersData);

  async function deleteCustomer(row) {
    try {
      await api.delete(`/customers/${row.id}`, {
        data: { row }, // Use `data` to send the row as part of the request body
      });
      console.log('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
    setReboot(!reboot);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-800">Customers</h2>

        <div className="flex items-center gap-3">
          <Link href={'/customers/add'} className="px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus size={16} className="mr-1.5" />
            Add Customer
          </Link>

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
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
            <Filter size={16} className="mr-1.5" />
            Filters
            <ChevronDown size={16} className="ml-1.5" />
          </button>

          <button className="flex items-center px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
            <span>Group</span>
            <ChevronDown size={16} className="ml-1.5" />
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredCustomers}
        onRowClick={(row) => console.log('Clicked on customer:', row)}
        onDelete={(row) => {
          deleteCustomer(row);
        }}
      />

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">
          Showing <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{customersData.length}</span> customers
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
  );
};

export default Page;

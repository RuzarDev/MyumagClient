'use client'
import { useEffect, useState } from 'react';
import {
  Plus,
  Download,
  Search,
  Filter,
  ChevronDown,
  Coffee,
} from 'lucide-react';
import DataTable from '@/components/DataTable';
import { useRouter } from 'next/navigation';
import { validateToken } from '@/app/utils/validateToken';
import Link from 'next/link';
import api from "@/data/dataBase";

interface MenuItem {
  name: string;
  category: string;
  cost: number;
  price: number;
}

const Page = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [reboot, setReboot] = useState(false);
  const router = useRouter();

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
        setMenuData(res.data.filter(item => item.ingredients?.length == 0)); // здесь просто устанавливаем данные

      } catch (e) {
        console.error('fetch data failed', e);
      }
    };

    checkToken();
    fetchData();
  }, [router, reboot]);

  const columns = [
    {
      header: 'Номер',
      accessor: 'id',
      cell: (value: string) => (
        <div className="inline-flex items-center justify-center bg-slate-100 px-2.5 py-1 rounded text-sm font-medium text-slate-800">
          {value}
        </div>
      )
    },
    {
      header: 'Имя',
      accessor: 'name',
      cell: (value: string) => (
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
            <Coffee size={16} className="text-blue-600" />
          </div>
          <span className="font-medium text-slate-800">{value}</span>
        </div>
      )
    },
    {
      header: 'Категория',
      accessor: 'category',
      cell: (value: string) => (
        <span className="text-slate-600">{value}</span>
      )
    },
    {
      header: 'Себестоимость',
      accessor: 'cost',
      cell: (value: number) => (
        <span className="text-slate-600">
          {value.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Цена',
      accessor: 'price',
      cell: (value: number) => (
        <span className="font-medium text-slate-800">
          {value}
        </span>
      )
    },
  ];

  const categories = ['All', ...new Set(menuData.map(item => item.category))];



  // Фильтрация данных
  const filteredMenuData = menuData.filter(item => {
    const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;

    return matchesSearchQuery && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-800"></h2>

        <div className="flex items-center gap-3">
          <Link href='/menu/add' className="px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus size={16} className="mr-1.5" />
            Добавить товар
          </Link>


        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-auto flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>


        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredMenuData}
        onRowClick={(row) => console.log('Clicked on item:', row)}
      />

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">
          Showing <span className="font-medium">{filteredMenuData.length}</span> of <span className="font-medium">{menuData.length}</span> items
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Назад
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
            Вперед
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

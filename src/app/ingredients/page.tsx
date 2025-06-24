'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Package, Truck, Layers3 } from 'lucide-react';
import DataTable from '@/components/DataTable';
import { validateToken } from '@/app/utils/validateToken';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from "@/data/dataBase";

const Page = () => {
    const router = useRouter();
    const [reboot, setReboot] = useState(false);
    const [ingredientsData, setIngredientsData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await validateToken();
                if (!res) router.push('/login');
            } catch (err) {
                console.error('Token validation failed', err);
            }
        };

        const fetchIngredients = async () => {
            try {
                const res = await api.get('/ingredients');
                setIngredientsData(res.data);
            } catch (e) {
                console.error('Failed to fetch ingredients:', e);
            }
        };

        checkToken();
        fetchIngredients();
    }, [router, reboot]);

    const columns = [
        {
            header: 'Название',
            accessor: 'name',
            cell: (value, row) => (
                <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Layers3 size={16} className="text-green-600" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-800">{value}</p>
                    </div>
                </div>
            ),
        },  {
            header: 'Категория',
            accessor: 'category',
            cell: (value, row) => (
                <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Layers3 size={16} className="text-green-600" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-800">{value}</p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Остаток',
            accessor: 'stock',
            cell: (value, row) => (
                <span className="text-slate-700">
        {value} {row.unit}
      </span>
            ),
        },
        {
            header: 'Себестоимость',
            accessor: 'cost',
            cell: (value) => (
                <span className="text-slate-600">
        {value} ₽
      </span>
            ),
        },
        {
            header: 'Сумма остатка',
            accessor: 'amount',
            cell: (value) => (
                <span className="text-slate-500">
        {value} {value ? 'исп.' : ''}
      </span>
            ),
        },
    ];


    const filteredIngredients = ingredientsData.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier?.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Link href={'/ingredients/add'} className="px-3 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                    <Plus size={16} className="mr-1.5" />
                    Добавить ингредиент
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-auto flex-1 relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Поиск ингредиентов..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredIngredients}
                onRowClick={(row) => console.log('Clicked on ingredient:', row)}
            />

            <div className="text-sm text-slate-500">
                Показано <span className="font-medium">{filteredIngredients.length}</span> из <span className="font-medium">{ingredientsData.length}</span> ингредиентов
            </div>
        </div>
    );
};

export default Page;

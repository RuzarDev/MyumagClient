'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Layers3, UtensilsCrossed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/data/dataBase';
import { validateToken } from '@/app/utils/validateToken';
import DataTable from '@/components/DataTable';

const Page = () => {
    const router = useRouter();
    const [techCards, setTechCards] = useState([]);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const init = async () => {
            const isValid = await validateToken();
            if (!isValid) router.push('/login');

            try {
                const res = await api.get('/menu');
                console.log(res.data)
                setTechCards(res.data.filter(item => item.ingredients?.length >= 1));


            } catch (err) {
                console.error('Ошибка при загрузке техкарт:', err);
            }
        };
        init();
    }, [router]);

    const columns = [
        {
            header: 'Название',
            accessor: 'name',
            cell: (value) => (
                <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <UtensilsCrossed size={16} className="text-green-600" />
                    </div>
                    <p className="font-medium text-slate-800">{value}</p>
                </div>
            ),
        },
        {
            header: 'Категория',
            accessor: 'category',
            cell: (value) => (
                <span className="text-slate-700">{value}</span>
            ),
        },
        {
            header: 'Себестоимость',
            accessor: 'cost',
            cell: (value) => (
                <span className="text-slate-600">{value} </span>
            ),
        },
        {
            header: 'Цена',
            accessor: 'price',
            cell: (value) => (
                <span className="text-slate-600">{value} </span>
            ),
        },
    ];

    const filteredData = techCards.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderSubRow = (row) => {
        if (!row.ingredients?.length) return null;

        return (
            <div className="bg-slate-50 p-4 border rounded mt-2">
                <p className="text-sm text-slate-500 mb-2 font-semibold">Состав:</p>
                <ul className="space-y-1 text-sm text-slate-700">
                    {row.ingredients.map((item, i) => (
                        <li key={i} className="flex justify-between border-b py-1">
                            <span>{item.ingredient.name}</span>
                            <span>{item.amount} {item.ingredient.unit}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Link
                    href="/techcard/add"
                    className="px-3 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                    <Plus size={16} className="mr-1.5" />
                    Добавить техкарту
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-auto flex-1 relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск техкарт..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                onRowClick={(row) => console.log('Clicked on techcard:', row)}
                renderSubRow={(row) => (
                    <div className="space-y-2">
                        <div className="font-semibold text-slate-700">Состав:</div>
                        <table className="w-full text-sm text-slate-600 border border-slate-200 rounded">
                            <thead className="bg-slate-100">
                            <tr>
                                <th className="px-2 py-1 text-left">Ингредиент</th>
                                <th className="px-2 py-1 text-left">Кол-во</th>
                                <th className="px-2 py-1 text-left">Ед. изм.</th>
                                <th className="px-2 py-1 text-left">Стоимось</th>
                            </tr>
                            </thead>
                            <tbody>
                            {row.ingredients?.map((item: any, idx: number) => (
                                <tr key={idx} className="border-t border-slate-200">
                                    <td className="px-2 py-1">{item.ingredient.name}</td>
                                    <td className="px-2 py-1">{item.amount}</td>
                                    <td className="px-2 py-1">{item.ingredient.unit}</td>
                                    <td className="px-2 py-1">{item.amount*item.ingredient.cost}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            />


            <div className="text-sm text-slate-500">
                Показано <span className="font-medium">{filteredData.length}</span> из{' '}
                <span className="font-medium">{techCards.length}</span> техкарт
            </div>
        </div>
    );
};

export default Page;

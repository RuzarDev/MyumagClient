'use client'
import React, {useEffect, useState} from 'react';
import {validateToken} from "@/app/utils/validateToken";
import api from "@/data/dataBase";
import {router} from "next/client";
import {useRouter} from "next/navigation";

const Page = () => {
    const [search, setSearch] = useState({name:'',category:'',unit:'',addCategoryToggle:false,cost:0})
    const [ingredientsData, setIngredientsData] = useState([])
    const router = useRouter()
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
    }, [router]);
    const categories = [...new Set(ingredientsData.map(item => item.category))];

    function fetchData(e: React.MouseEvent<HTMLButtonElement>) {
        try {
        const res = api.post(`/ingredients`, {name:search.name, category:search.category, unit:search.unit,cost:search.cost});
        }catch (e){
            console.log('Failed to fetch data', e);
        }
        router.push('/ingredients');

    }

    return (
        <div>
            <div className="flex items-center mt-10">
                <p className='w-[200px]'>Имя</p>
                <input
                    className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                    value={search.name}
                    onChange={(e) => setSearch({...search, name: e.target.value})}
                />

            </div>
            <div className="flex items-center mt-10">
                <p className='w-[200px]'>Стоимость</p>
                <input
                    className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="number"
                    value={search.cost}
                    onChange={(e) => setSearch({...search, cost: e.target.value})}
                />

            </div>
            <div className="flex items-center mt-10">
                <p className='w-[200px]'>Категория</p>

                {search.addCategoryToggle ? (
                    <input
                        className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        type="text"
                        value={search.category}
                        onChange={(e) => setSearch({...search, category: e.target.value})}
                    />
                ) : (
                    <select
                        className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={search.category}
                        onChange={(e) => setSearch({...search, category: e.target.value})}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                )}

                <button
                    className="ml-10 border-green-500 text-white bg-green-500 w-2/12 h-[35px] rounded-[10px]"
                    onClick={() =>
                        setSearch((prev) => ({...prev, addCategoryToggle: !prev.addCategoryToggle}))
                    }
                >
                    {search.addCategoryToggle ? 'назад' : 'add category'}
                </button>
            </div>

            <div className="flex items-center mt-10">
                <p className='w-[200px]'>Ед измерения</p>
                <select
                    value={search.unit}
                    onChange={(e) => setSearch({...search, unit: e.target.value})}
                    className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="Единица измерения">шт</option>
                    <option value="шт">шт</option>
                    <option value="кг">кг</option>
                    <option value="л">л</option>
                </select>

            </div>

            <button onClick={(e) => fetchData(e)}
                    className="border-green-500 mt-24 text-white bg-green-500 w-2/12 h-[35px] rounded-[10px]">
                Save
            </button>
        </div>
    );
};

export default Page;
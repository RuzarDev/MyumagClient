'use client'
import React, {useEffect, useState} from 'react';
import {validateToken} from "@/app/utils/validateToken";
import api from "@/data/dataBase";
import {router} from "next/client";

const Page = () => {
    const [search, setSearch] = useState({name:'',category:'',unit:'',addCategoryToggle:false,price:''})
    const [techCardData, setTechCardData] = useState([])
    const [ingredients, setIngredients] = useState([
        { id: Date.now(), product: '', quantity: 0, unitCost: 0, totalCost: 0,ingredientId: 0}
    ]);

    const [ingredientsData, setIngredientsData] = useState([])



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
        const fetchData = async () => {
            try {
                const res = await api.get('/menu');
                setTechCardData(res.data.filter(item=>item.category==='Тех карта')); // здесь просто устанавливаем данные

            } catch (e) {
                console.error('fetch data failed', e);
            }
        };
        fetchIngredients()
        checkToken()
        fetchData();
    }, []);
    const categories = [...new Set(techCardData.map(item=>item.category))];



    const addIngredient = () => {
        setIngredients([...ingredients, { id: Date.now()}]);
    };

    const removeIngredient = (id) => {
        setIngredients(ingredients.filter(ing => ing.id !== id));
    };
    const handleIngredientChange = (id, field, value) => {
        setIngredients(prevState =>
            prevState.map(item => {
                if (item.id !== id) return item;

                let updated = { ...item, [field]: value };

                if (field === 'product') {
                    const product = ingredientsData.find(p => p?.name === value);

                    const unitCost = product?.cost || 0;
                    updated.unitCost = unitCost;
                    updated.totalCost = unitCost * (updated.quantity || 0);
                    updated.ingredientId = product?.id
                }

                if (field === 'quantity') {
                    updated.totalCost = (item.unitCost || 0) * value;
                }

                return updated;
            })
        );
    };

    console.log(ingredients)
    const amount = ingredients.reduce((acc, item) => acc + item.totalCost, 0);
    const fetchData = async () => {
        const ingredientsPayload = ingredients.map(item => ({
            ingredientId: item.ingredientId,
            quantity: item.quantity
        }));

        const data = {
            name: search.name,
            category: search.category,
            price: search.price,
            ingredients: ingredientsPayload
        };

        try {
            const res = await api.post('/menu', data);
            console.log('Успешно отправлено:', res.data);
        } catch (err) {
            console.error('Ошибка при отправке данных:', err);
        }
    };

    return (
        <div>
            <div className="flex items-center mt-10">
                <p className='w-[200px]'>Название</p>
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
                    value={search.price}
                    onChange={(e) => setSearch({...search, price: e.target.value})}
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
            <h2 className="text-xl font-bold mt-10">Состав</h2>
            <table className="w-full mt-4 text-sm">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-2">Продукты</th>
                    <th className="p-2">Количество</th>
                    <th className="p-2">Себестоимость</th>
                </tr>
                </thead>
                <tbody>
                {ingredients.map((ing, index) => (
                    <tr key={ing.id} className="border-b">
                        <td className="p-2">
                            <select
                                className="w-full border rounded px-2 py-1"
                                value={ing.product}
                                onChange={(e) => handleIngredientChange(ing.id, 'product', e.target.value)}
                            >
                                <option value="">Выберите</option>
                                {ingredientsData.map((prod, idx) => (
                                    <option key={idx} value={prod.name}>
                                        {prod.name}, {prod.unit}
                                    </option>
                                ))}
                            </select>
                        </td>

                        <td className="p-2">
                            <input
                                type="number"
                                className="w-full border rounded px-2 py-1 bg-gray-100"
                                value={ing.quantity}
                                onChange={(e) => handleIngredientChange(ing.id, 'quantity', Number(e.target.value))}
                            />
                        </td>
                        <td className="p-2">
                            <input
                                type="number"
                                className="w-full border rounded px-2 py-1 bg-gray-100"
                                value={ing.totalCost}
                                readOnly
                            />

                        </td>
                        <td className="p-2 text-center">
                            <button onClick={() => removeIngredient(ing.id)} className="text-red-500">✕</button>

                        </td>

                    </tr>
                ))}

                </tbody>

            </table>
            <div className='flex items-center justify-between gap-10 w-10/12'>
                <p
                    className="mt-4 text-blue-600 underline"
                    onClick={addIngredient}
                >
                    + Добавить ингредиент
                </p>
                <p>Общая сумма:{amount}</p>
            </div>

            <button onClick={(e) => fetchData()}
                    className="border-green-500 mt-24 text-white bg-green-500 w-2/12 h-[35px] rounded-[10px]">
                Save
            </button>
        </div>
    );
};

export default Page;
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from "@/data/dataBase";


const Page = () => {

  const router = useRouter();
  const [search, setSearch] = useState({name:'',category:'',cost:'',totalPrice:'',toggleCategory:false});
  const [categoryList, setCategoryList] = useState([]);
  const fetchMenuitem = async (e) => {
    e.preventDefault();
    const payload = {
      name: search.name,
      price: Number(search.totalPrice),
      cost: Number(search.cost),
      category: search.category,
      orderItems: [] // или заполняйте как нужно
    };

    try {
      const res = await api.post('/menu', payload);
      console.log('Success:', res.data);
      router.push('/menu');

    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }

  };
  useEffect(() => {
    const fetchCategories = async ()=>{
      try {
        const res = await api.get('/menu/categories');
        setCategoryList(res.data)
        console.log(res.data);
      }catch (e){
        console.error('Error:', e);
      }

    }
    fetchCategories()
  }, []);
  return (
    <div>
      <div className="flex items-center mt-10">
        <p className='w-[200px]'>name</p>
        <input
          className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />

      </div>
      {search.toggleCategory ?
        <>
          <div className="flex items-center mt-10">
            <p className="w-[200px]">category</p>

            <select
              value={search.category}
              onChange={(e) => setSearch({ ...search, category: e.target.value })}
              className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select category</option>
              {categoryList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>


          </div>
          <button onClick={() => setSearch({ ...search, toggleCategory: !search.toggleCategory })}
                  className="border-green-500 mt-10 ml-50 text-white bg-green-500 w-2/12 h-[35px] rounded-[10px]">
            Add category
          </button>
        </>

        :
        <>
          <div className="flex items-center mt-10">
            <p className="w-[200px]">Add category</p>
            <input
              className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              value={search.category}
              onChange={(e) => setSearch({ ...search, category: e.target.value })} />
          </div>
          <button onClick={() => setSearch({ ...search, toggleCategory: !search.toggleCategory })}
                  className="border-green-500 mt-10 ml-50 text-white bg-green-500 w-2/12 h-[35px] rounded-[10px]">
            Category toggle
          </button>
        </>

      }

      <div className="flex items-center mt-10">
        <p className="w-[200px]">Cost</p>
        <input
          className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="number"
          value={search.cost}
          onChange={(e) => setSearch({ ...search, cost: e.target.value })} />
      </div>

      <div className="flex items-center mt-10">
        <p className="w-[200px]">total price</p>
        <input
          className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="number"
          value={search.totalPrice}
          onChange={(e) => setSearch({ ...search, totalPrice: e.target.value })}
        />
      </div>
      <button onClick={(e) => fetchMenuitem(e)}
              className="border-green-500 mt-24 text-white bg-green-500 w-2/12 h-[35px] rounded-[10px]">
        Save
      </button>
    </div>
  );
};

export default Page;
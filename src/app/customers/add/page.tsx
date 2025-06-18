'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import api from "@/data/dataBase";


const Page = () => {
  const [search, setSearch] = useState({name:'',phone:'',gender:'',mail:''});
  const categoryList = ['Male', 'Female','Other'];
  const router = useRouter();
 async function fetchData(e) {
    e.preventDefault()
   const payload = {
      name: search.name,
     email: search.mail,
     Customerphone: Number(search.phone),
     gender: search.gender,
   }
   try{
      const res = await api.post('/customers', payload)
     console.log('Success customer:', res.data);
      router.push('/customers')
   }
   catch (e){
      console.error('Error:', e);
   }
  }

  return (
    <div>
      <div className="flex items-center mt-10">
        <p className='w-[200px]'>Name</p>
        <input
          className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />

      </div>
      <div className="flex items-center mt-10">
        <p className='w-[200px]'>Email</p>
        <input
          className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="email"
          value={search.mail}
          onChange={(e) => setSearch({ ...search, mail: e.target.value })}
        />

      </div>
      <div className="flex items-center mt-10">
        <p className='w-[200px]'>Phone</p>
        <input
          className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="tel"
          value={search.phone}
          onChange={(e) => setSearch({ ...search, phone: e.target.value })}
        />

      </div>
      <div className="flex items-center mt-10">
        <p className="w-[200px]">Gender</p>

        <select
          value={search.gender}
          onChange={(e) => setSearch({ ...search, gender: e.target.value })}
          className="w-3/12 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select gender</option>
          {categoryList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
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
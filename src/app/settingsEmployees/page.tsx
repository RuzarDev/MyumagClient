'use client'
import React from 'react';
import DataTable from '@/components/DataTable';
import { column } from 'stylis';

const Page = () => {
  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      cell: (value: string) => (
        <span className="text-slate-600">{value}</span>
      )
    },
    {
      header: 'Phone',
      accessor: 'category',
      cell: (value: string) => (
        <span className="text-slate-600">{value}</span>
      )
    },
    {
      header: 'Position ',
      accessor: 'stock',
      cell: (value: string) => (
          <span className="text-slate-600">{value}</span>

      )
    },


  ];

  return (
    <div>
      <DataTable columns={columns} data={[]}/>
    </div>
  );
};

export default Page;
'use client'
import React, { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';
import { Coffee } from 'lucide-react';
import ModalShift from '@/components/ModalShift';
import api from "@/data/dataBase";
type Order = {
  id: number;
  total: number;
  createdAt: Date;
  paymentMethod: 'cash' | 'card';
};

export type shiftState = {
  id: number;
  openedAt: Date;
  closedAt: Date | null;
  isOpen: boolean;
  card: number;
  cash: number;
  closedCashDrawer: number;
  openedCashDrawer: number;
  orders: Order[]; // важно!
  admin: [];
};

type modalShiftState =  {
  isOpen:boolean;
  row: shiftState | null
  orders: Order[];
}
const Page = () => {
  const [shifts, setShifts] = useState<shiftState[]>([]);
  const [modalShift, setModalShift] = useState<modalShiftState>({isOpen: false, row: null});
  const onModal = async (row: shiftState) => {
    try {
      const shiftId = Number(row.id)
      const res = await api.get(`/order/byShift/${shiftId}`);

      setModalShift({
        isOpen: true,
        row,
        orders: res.data, // <-- сюда кладём заказы
      });
      console.log(typeof row.id);
    } catch (err) {
      console.error('Ошибка при загрузке заказов:', err);
    }
  };


  useEffect(() => {
    const fetchData = async ()=>{
      const res = await api.get('/posShift/all');
      setShifts(res.data)
    }
    fetchData()
  }, []);

  const columns = [
    {
      header: 'Id',
      accessor: 'id',
      cell: (value: string) => (
        <div className="inline-flex items-center justify-center bg-slate-100 px-2.5 py-1 rounded text-sm font-medium text-slate-800">
          {value}
        </div>
      )
    },
    {
      header: 'Opened',
      accessor: 'openedAt',
      cell: (value: Date) =>{
        const date = new Date(value).toLocaleString('ru-RU');


        return (
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
              <Coffee size={16} className="text-blue-600" />
            </div>
            <span className="font-medium text-slate-800">{date}</span>
          </div>
        )
      }
    },
    {
      header: 'Closed',
      accessor: 'closedAt',
      cell: (value: Date) =>{
        const date = new Date(value).toLocaleString('ru-RU');


        return (
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
              <Coffee size={16} className="text-blue-600" />
            </div>
            <span className="font-medium text-slate-800">{date}</span>
          </div>
        )
      }


    },
    {
      header: 'Cash',
      accessor: 'cash',
      cell: (value: number) => (
        <span className="text-slate-600">
          {value}
        </span>
      )
    }, {
      header: 'Card',
      accessor: 'card',
      cell: (value: number) => (
        <span className="text-slate-600">
          {value}
        </span>
      )
    },
    {
      header: 'Cash Pool',
      accessor:'cashPool',
      cell: (value: number) => (
        <span className="font-medium text-slate-800">
          {value}
        </span>
      )
    },
    {
      header: 'Opened cash drawer',
      accessor: 'openedCashDrawer',
      cell: (value: number) => (
        <span className="font-medium text-slate-800">
          {value}
        </span>
      )
    },
    {
      header: 'Closed cash drawer',
      accessor: 'closedCashDrawer',
      cell: (value: number) => (
        <span className="font-medium text-slate-800">
          {value}
        </span>
      )
    },
    {
      header: 'Report',
      accessor: 'closedCashDrawer', // всё ещё нужен для сортировки по умолчанию
      cell: (_: number, row: shiftState) => {
        const opened = row.openedCashDrawer || 0;
        const closed = row.closedCashDrawer || 0;
        const cash = row.cash || 0;
        const expected = opened + cash;
        const diff = closed - expected;
        const color = diff === 0 ? 'text-slate-600' : diff > 0 ? 'text-green-600' : 'text-red-600';
        const sign = diff > 0 ? '+' : '';
        return (
          <span className={`font-semibold ${color}`}>
        {sign}{diff}
      </span>
        );
      }
    }
  ];
  return (
    <div>
    <DataTable columns={columns} data={shifts} onModal={onModal}/>
      <ModalShift
        isOpen={modalShift.isOpen}
        shift={modalShift.row}
        onClose={() => setModalShift({ isOpen: false, row: null })}
        orders={modalShift.orders}
      />

    </div>
  );
};

export default Page;
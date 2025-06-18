'use client';
import React, { useState } from 'react';
import { parse, getWeek, getMonth } from 'date-fns';

const RevenueChart = ({ data }) => {
  const [activeTab, setActiveTab] = useState('day');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  // Вычисляем общую сумму выручки
  const totalAmount = data.reduce((acc, cur) => acc + cur.totalAmount, 0);
  console.log('data log' ,data);

  // Вычисляем прибыль
  const profit = data.reduce((acc, cur) => {
    const orderProfit = cur.orderItems.reduce((sum, item) => {
      return sum + ((item.menu.price - item.menu.cost) * item.quantity);
    }, 0);
    return acc + orderProfit;
  }, 0);

  // Вычисляем средний чек
  const avgCheck = totalAmount / data.length;

  // Функция для извлечения ключа (день, неделя, месяц) для группировки
  const getDateKey = (orderDate: string) => {
    const parsed = parse(orderDate, 'dd.MM.yyyy HH:mm', new Date());
    return parsed.toISOString().split('T')[0]; // По умолчанию группировка по дням
  };

  // Функция для подсчета суммы по группе
  const getTotalAmountPerDate = (orders: any[], groupBy: string) => {
    const result: Record<string, number> = {};

    orders.forEach(order => {
      const dateKey = getDateKey(order.orderDate);
      if (!result[dateKey]) {
        result[dateKey] = 0;
      }
      result[dateKey] += order.totalAmount;
    });

    return result;
  };


  // Группировка данных в зависимости от выбранного таба
  const graphData = getTotalAmountPerDate(data, activeTab);
  const graphDataValues = Object.values(graphData); // Значения для графика
  const graphDataKeys = Object.keys(graphData); // Ключи для оси X (дни, недели, месяцы)

  // Функция для обработки клика на графике
  const handleClick = (index: number) => {
    setHighlightedIndex(index);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      {/* Заголовок и переключатель вкладок */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Выручка</h2>

      </div>

      {/* График */}
      <div className="relative h-[250px] w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0">
          <div className="flex h-full w-full items-end justify-between">
            {graphDataValues.map((value, index) => {
              const heightPercentage = (value / Math.max(...graphDataValues)) * 100;
              const isHighlighted = index === highlightedIndex;

              return (
                <div
                  key={index}
                  className="group relative mx-[2px] h-full flex-1"
                  onClick={() => handleClick(index)} // Обработка клика
                >
                  <div
                    className={`w-full rounded-t-sm transition-all duration-200 ${isHighlighted ? 'bg-blue-500' : 'bg-blue-300 group-hover:bg-blue-400'}`}
                    style={{ height: `${heightPercentage}%` }}
                  ></div>

                  {isHighlighted && (
                    <div className="absolute -top-20 left-1/2 min-w-max -translate-x-1/2 rounded-md bg-gray-800 p-2 text-xs text-white">
                      {graphDataKeys[index]} — {value} KZT
                      <div className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-gray-800"></div>
                    </div>
                  )}

                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500">
                    {graphDataKeys[index]}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
        </div>
      </div>

      {/* Период времени */}
      <div className="mt-8 flex justify-between text-sm text-gray-500">
        <div>{graphDataKeys[0]}</div>
        <div>{graphDataKeys[graphDataKeys.length - 1]}</div>
      </div>

      {/* Статистика */}
      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-gray-100 pt-6 md:grid-cols-5">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">Выручка</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{totalAmount} KZT</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">Прибыль</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{profit} KZT</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">Чеков</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{data.length}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">Посетителей</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{data.length}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">Средний чек</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{avgCheck.toLocaleString() || 0} KZT</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;

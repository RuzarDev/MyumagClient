import React from 'react';
import StatsCard from './StatsCard';
import { TrendingUp, DollarSign, Users, ShoppingCart } from 'lucide-react';





const StatsOverview = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    }).format(value);
  };
  const totalAmount = data.reduce((acc, cur) => acc + cur.totalAmount, 0);
  const profit = data.reduce((acc, cur) => {
    const orderProfit = cur.orderItems.reduce((sum, item) => {
      return sum + ((item.menu.price - item.menu.cost) * item.quantity);
    }, 0);
    return acc + orderProfit;
  }, 0);
  console.log(profit)
  const avgCheck = totalAmount/data.length;
  return (
    <div>
      <h2 className="mb-4 text-lg font-medium text-gray-700">Выручка сегодня</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Выручка" 
          value={totalAmount}
          change={data.revenueChange}
          icon={<TrendingUp className="h-5 w-5" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard 
          title="Прибыль" 
          value={profit}
          change={data.profitChange}
          icon={<DollarSign className="h-5 w-5" />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard 
          title="Посетители" 
          value={data.length}
          change={data.visitorsChange}
          icon={<Users className="h-5 w-5" />}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          negative={data.visitorsChange}
        />
        <StatsCard 
          title="Средний чек" 
          value={avgCheck.toLocaleString()}
          change={data.averageCheckChange}
          icon={<ShoppingCart className="h-5 w-5" />}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
      </div>
    </div>
  );
};

export default StatsOverview
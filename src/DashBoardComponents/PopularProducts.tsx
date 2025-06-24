import React from 'react';

const PopularProducts: React.FC = ({data}) => {
  const getPopularMenuItem = (orders: any[]) => {
    const itemCountMap: Record<string, number> = {};

    orders.forEach((order: any) => {
      // Уникальные имена блюд в одном заказе
      const uniqueItems = new Set(order.orderItems.map((item: any) => item.menu?.name));

      uniqueItems.forEach((name) => {
        itemCountMap[name] = (itemCountMap[name] || 0) + 1;
      });
    });

    // Преобразуем в нужный формат
    const result = Object.entries(itemCountMap).map(([name, quantity]) => ({
      name,
      quantity,
    }));

    return result;
  };
  const popularProducts = getPopularMenuItem(data);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">Популярные товары</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {popularProducts.map((product, index) => (
          <div key={index} className="flex items-center justify-between border-b border-gray-100 py-2">
            <span className="text-sm text-gray-900">{product.name}</span>
            <span className="text-sm font-medium text-gray-600">{product.quantity} шт.</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts
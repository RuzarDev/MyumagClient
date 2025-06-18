import React from 'react';
import TimeChart from './TimeChart';
import WeekdayChart from './WeekdayChart';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';

interface AnalyticsChartsProps {
  orders: any[];
  weekdayData: Array<{ day: string; value: number; }>;

}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ orders }) => {
  const getHourlyRevenue = (orders: any[]) => {
    if (!Array.isArray(orders)) return new Array(24).fill(0);

    const revenuePerHour = new Array(24).fill(0);

    orders.forEach(order => {
      if (!order?.orderDate || typeof order.totalAmount !== 'number') return;

      const parsedDate = parse(order.orderDate, 'dd.MM.yyyy HH:mm', new Date());
      const hour = parsedDate.getHours();
      revenuePerHour[hour] += order.totalAmount;
    });
    return revenuePerHour;
  };
  const getRevenueByWeekday = (orders: any[]) => {
    const weekdaysMap: Record<string, number> = {};

    orders.forEach(order => {
      if (!order.orderDate || typeof order.totalAmount !== 'number') return;

      const parsedDate = parse(order.orderDate, 'dd.MM.yyyy HH:mm', new Date());
      if (isNaN(parsedDate.getTime())) return;

      const weekday = format(parsedDate, 'EEEE', { locale: ru }); // Например: "понедельник"

      if (!weekdaysMap[weekday]) weekdaysMap[weekday] = 0;
      weekdaysMap[weekday] += order.totalAmount;
    });

    const weekOrder = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
    return weekOrder.map(day => ({
      day,
      value: weekdaysMap[day] || 0
    }));
  };
  const hourlyData = getHourlyRevenue(orders)
  const weekdayData = getRevenueByWeekday(orders)
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <TimeChart data={hourlyData} />
      <WeekdayChart data={weekdayData} />
    </div>
  );
};

export default AnalyticsCharts
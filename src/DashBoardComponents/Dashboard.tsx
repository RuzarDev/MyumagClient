import React, { useEffect, useState } from 'react';
import Header from './Header';
import StatsOverview from './StatsOverview';
import PopularProducts from './PopularProducts';
import AnalyticsCharts from './AnalyticsCharts';
import { salesData } from '../data/mockData';
import { toZonedTime } from 'date-fns-tz';
import api from "@/data/dataBase";
import RevenueDashboard from "@/components/revenue-dashboard";
import { parse, format} from "date-fns";
import {buildDateValueMap} from "@/app/utils/getIsoString";

const Dashboard: React.FC = () => {
  const timeZone = 'Asia/Almaty';

  const getLocalDateOnly = (dateStr: string) => {
    const parsed = parse(dateStr, 'dd.MM.yyyy HH:mm', new Date());
    const utcDate = toZonedTime(parsed, timeZone);
    return format(utcDate, 'yyyy-MM-dd'); // будет сравнимо с todayDateOnly
  };

  const todayDateOnly = format(new Date(), 'yyyy-MM-dd');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const res = await api.get('/order');
        setOrders(res.data);
        console.log(res.data);
      } catch (e) {
        console.log('error', e);
      }
    };

    fetchFilteredData();
  }, [startDate, endDate]);

  // Заказы за сегодня
  const dailyOrders = orders.filter((item) => {
    const orderDateOnly = getLocalDateOnly(item.orderDate);
    return orderDateOnly === todayDateOnly;
  });

  // Заказы в выбранном диапазоне
  const filteredOrders = orders.filter((item) => {
    const orderDateOnly = getLocalDateOnly(item.orderDate);
    const start = format(startDate, 'yyyy-MM-dd');
    const end = format(endDate, 'yyyy-MM-dd');
    return orderDateOnly >= start && orderDateOnly <= end;
  });
  // Совпадение с mockData
  const availableDates = Object.keys(salesData);
  const matchedDate = availableDates.find(date => {
    const d = new Date(date);
    return d >= startDate && d <= endDate;
  });

  const currentData = matchedDate ? salesData[matchedDate] : salesData["2024-05-01"];

  const allDate = buildDateValueMap(startDate, endDate, filteredOrders, 'day');
  const allMonth = buildDateValueMap(startDate, endDate, filteredOrders, 'month');
  console.log(allDate)



  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <main className="container mx-auto px-4 py-8">
        <StatsOverview data={dailyOrders} />
        <div className="mt-8">
          <RevenueDashboard day={allDate} month={allMonth} />
        </div>
        <div className="mt-8">
          <PopularProducts data={orders}/>
        </div>
        <div className="mt-8">
          <AnalyticsCharts
            orders={orders}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

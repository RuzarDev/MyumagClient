'use client'
import { useState } from 'react';
import { Menu, Search, Bell, Calendar, Download, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [dateRange, setDateRange] = useState('Last 30 days');
  const location = usePathname();
  
  const pageTitles: Record<string, string> = {
    '/': 'Статистка',
    '/customers': 'Покупатели',
    '/transaction': 'Чеки',
    '/menu/add':"Добавить товар",
    '/menu': "Меню",
    '/supply': "Поставки",
    '/inventory': "Остатки",
    '/settingsEmployees': "Настройка сотрудников",
    '/shift':"Смены",
    '/ingredients':"Ингредиенты",
    '/ingredients/add':"Добавить ингридиент",
  };
  
  const pageTitle = pageTitles[location]
  
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-1 rounded-md hover:bg-slate-100">
            <Menu className="h-6 w-6 text-slate-500" />
          </button>
          <h1 className="text-xl font-semibold text-slate-800">{pageTitle}</h1>
        </div>
      </div>


    </header>
  );
};

export default Header;
'use client'
import { useEffect, useState } from 'react';
import {
  BarChart3,
  Users,
  Package,
  Receipt,
  FileText,
  Settings,
  ChevronDown,
  LogOut,
  Coffee,
  Truck,
  Warehouse,
  HandCoins,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import CashImg from "@/data/free-icon-cashier-4901369.png";
import Image from 'next/image';
import api from "@/data/dataBase";

const Sidebar = () => {
  const [admin, setAdmin] = useState();
  const pathname = usePathname();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.post('/auth/validateToken', {});
        setAdmin(res.data);
      } catch (e) {
        console.error('Error:', e);
      }
    };
    fetchAdmin();
  }, []);

  const isActive = (path: string) => pathname === path;

  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({
    warehouse: true,
    settings: true,
  });

  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <BarChart3 size={20} /> },
    { path: '/customers', name: 'Customers', icon: <Users size={20} /> },
    { path: '/transaction', name: 'Transactions', icon: <Receipt size={20} /> },
    { path: '/menu', name: 'Menu', icon: <Coffee size={20} /> },
    { path: '/shift', name: 'Shifts', icon: <HandCoins size={20} /> },
    {
      name: 'Warehouse',
      icon: <Warehouse size={20} />,
      key: 'warehouse',
      children: [
        { path: '/supply', name: 'Supply', icon: <Truck size={18} /> },
        { path: '/inventory', name: 'Inventory', icon: <Package size={18} /> },
      ]
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      key: 'settings',
      children: [
        { path: '/settingsEmployees', name: 'Employees', icon: <Users size={18} /> },
      ]
    }
  ];

  async function logout() {
    try {
      await api.post('/auth/logout', {});
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-semibold text-slate-800">
            SalesDash
            <Link href={'/cashRegister'}>
              <Image src={CashImg} alt="Cash Icon" width={24} height={24} className="inline-block ml-1" />
            </Link>
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              {'path' in item ? (
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        openDropdowns[item.key] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdowns[item.key] && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link
                            href={child.path}
                            className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                              isActive(child.path)
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span className="mr-3">{child.icon}</span>
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>

        <div className="px-4 mt-8">
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                href="/login"
                className="flex items-center px-4 py-3 text-sm rounded-lg text-slate-600 hover:bg-slate-100"
                onClick={() => logout()}
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            AD
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-slate-700">{admin?.phone}</p>
            <p className="text-xs text-slate-500">Urazov Pos</p>
          </div>
          <ChevronDown size={18} className="ml-auto text-slate-400" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

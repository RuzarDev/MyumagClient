'use client'
import { useEffect, useState } from 'react';
import {
  DollarSign,
  Users,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { validateToken } from '@/app/utils/validateToken';
import Dashboard from '@/DashBoardComponents/Dashboard';
;

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await validateToken(); // обязательно await
        if (!res) {
          router.push('/login');
        }
      } catch (err) {
        console.error('Token validation failed', err);
      }
    };

    checkToken();
  }, [router]);
  return (
   <div>
     <Dashboard/>
   </div>
  );
};

export default Page;
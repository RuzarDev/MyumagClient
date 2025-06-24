import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {parse, isValid, format} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}


export const getDateKey = (orderDate: string, type: 'day' | 'month') => {
  let parsed = parse(orderDate, 'dd.MM.yyyy HH:mm', new Date());
  if (!isValid(parsed)) {
    // Fallback: try ISO
    parsed = new Date(orderDate);
  }
  return format(parsed, type === 'day' ? 'yyyy-MM-dd' : 'yyyy-MM');
}


// Функция для подсчета суммы по группе
type Order = {
  orderDate: string;
  totalAmount: number;
};



export const getTotalAmountPerDate = (
    orders: Order[],
    type: 'day' | 'month' = 'day'
): Record<string, number> => {
  const result: Record<string, number> = {};

  if (!Array.isArray(orders)) {
    throw new TypeError('Expected orders to be an array');
  }

  orders.forEach(order => {
    let parsed = parse(order.orderDate, 'dd.MM.yyyy HH:mm', new Date());
    if (!isValid(parsed)) {
      parsed = new Date(order.orderDate);
    }
    if (!isValid(parsed)) {
      throw new Error(`Invalid date format: ${order.orderDate}`);
    }

    const dateKey = type === 'month'
        ? format(parsed, 'yyyy-MM')      // группировка по месяцу
        : format(parsed, 'yyyy-MM-dd');  // группировка по дню

    result[dateKey] = (result[dateKey] || 0) + order.totalAmount;
  });

  return result;
};

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {parse,isValid} from "date-fns";

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

export const getDateKey = (orderDate: string) => {
  // Try known format
  let parsed = parse(orderDate, 'dd.MM.yyyy HH:mm', new Date());
  if (!isValid(parsed)) {
    // Fallback: try ISO
    parsed = new Date(orderDate);
  }
  return parsed.toISOString().split('T')[0];
};


// Функция для подсчета суммы по группе
export const getTotalAmountPerDate = (orders) => {
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
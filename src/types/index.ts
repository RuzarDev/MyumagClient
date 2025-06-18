export interface Client {
  id: string;
  name: string;
  phone: string;
  salesWithoutDiscount: number;
  discounts: number;
  cartTotal: number;
  profit: number;
  checks: number;
  averageCheck: number;
}
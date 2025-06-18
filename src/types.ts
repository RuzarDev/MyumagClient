export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}
export interface Client {
  id: string;
  name: string;
  Customerphone: string;

}
export interface Category {
  id: string;
  name: string;
  code: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  items: OrderItem[];
  total: number;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  visits: number;
  lastVisit: string;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  totalAmount: number;
  onSend: (paymentMethod: "card" | "cash")=>void
}
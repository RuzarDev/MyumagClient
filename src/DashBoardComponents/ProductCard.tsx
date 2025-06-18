import React from 'react';
import { TrendingUp, Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  sales: number;
  stock: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
  };

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-100 bg-white transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex items-center text-sm font-medium">
            <TrendingUp className="mr-1 h-4 w-4" />
            {product.sales} продаж
          </div>
          <div className="flex items-center text-sm font-medium">
            <Package className="mr-1 h-4 w-4" />
            {product.stock} в наличии
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
        <p className="text-lg font-semibold text-blue-600">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  activeCategory: string | null;
  addToOrder: (product: Product) => void;
  techCards: Product[]
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  activeCategory,
  addToOrder, techCards
}) => {
  const filteredProducts = activeCategory
    ? products.filter(product => product.category === activeCategory)
    : [];

  return (
    <div className="p-2 bg-gray-200">
      <div className="grid grid-cols-3 gap-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => addToOrder(product)}
          >
            <div className="font-medium">{product.name}</div>
            <div className="mt-2 text-right text-gray-700">{product.price} ₸</div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default ProductList;
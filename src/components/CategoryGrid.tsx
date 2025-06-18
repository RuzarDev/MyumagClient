import React from 'react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: [];
  activeCategory: string | null;
  setActiveCategory: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
    <div className="p-2 bg-gray-200">
      <div className="flex justify-between items-center p-2 mb-2">
        <h2 className="text-lg font-medium">Все товары</h2>
        <div className="flex items-center">
          <div className="mr-2 border border-gray-300 bg-white p-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-barcode">
              <path d="M3 5v14"/>
              <path d="M8 5v14"/>
              <path d="M12 5v14"/>
              <path d="M17 5v14"/>
              <path d="M21 5v14"/>
            </svg>
          </div>
          <div className="mr-2 border border-gray-300 bg-white p-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <button className="bg-white border border-orange-500 text-orange-500 px-3 py-1 rounded">
            Акции
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {categories.map((category) => (
          <div 
            key={category}
            className={`aspect-w-1 aspect-h-1 cursor-pointer ${activeCategory === category? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            <div className="w-full h-full bg-white flex flex-col items-center justify-center p-4">

              <div className="mt-2 text-center text-sm">{category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
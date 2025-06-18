import { Product } from '../types';

export const products: Product[] = [
  // Coffee
  { id: 'espresso', name: 'Эспрессо', price: 150, category: 'coffee' },
  { id: 'americano', name: 'Американо', price: 180, category: 'coffee' },
  { id: 'cappuccino', name: 'Капучино', price: 220, category: 'coffee' },
  { id: 'latte', name: 'Латте', price: 250, category: 'coffee' },
  { id: 'flat-white', name: 'Флэт уайт', price: 240, category: 'coffee' },
  
  // Not Coffee
  { id: 'hot-chocolate', name: 'Горячий шоколад', price: 220, category: 'not-coffee' },
  { id: 'cocoa', name: 'Какао', price: 200, category: 'not-coffee' },
  
  // Tea
  { id: 'black-tea', name: 'Черный чай', price: 180, category: 'tea' },
  { id: 'green-tea', name: 'Зеленый чай', price: 180, category: 'tea' },
  { id: 'herbal-tea', name: 'Травяной чай', price: 190, category: 'tea' },
  
  // Lemonade
  { id: 'classic-lemonade', name: 'Классический лимонад', price: 220, category: 'lemonade' },
  { id: 'berry-lemonade', name: 'Ягодный лимонад', price: 240, category: 'lemonade' },
  
  // Smoothie
  { id: 'berry-smoothie', name: 'Ягодный смузи', price: 280, category: 'smoothie' },
  { id: 'tropical-smoothie', name: 'Тропический смузи', price: 280, category: 'smoothie' },
  
  // Milkshake
  { id: 'vanilla-milkshake', name: 'Ванильный милкшейк', price: 260, category: 'milkshake' },
  { id: 'chocolate-milkshake', name: 'Шоколадный милкшейк', price: 260, category: 'milkshake' },
  
  // Ice Tea
  { id: 'peach-ice-tea', name: 'Персиковый айс ти', price: 240, category: 'ice-tea' },
  { id: 'lemon-ice-tea', name: 'Лимонный айс ти', price: 240, category: 'ice-tea' },
  
  // Display Drinks
  { id: 'lemonade-display', name: 'Лимонад из витрины', price: 260, category: 'display-drinks' },
  { id: 'fruit-drink-display', name: 'Фруктовый напиток из витрины', price: 260, category: 'display-drinks' },
  
  // Desserts
  { id: 'cheesecake', name: 'Чизкейк', price: 320, category: 'desserts' },
  { id: 'brownie', name: 'Брауни', price: 280, category: 'desserts' },
  { id: 'muffin', name: 'Маффин', price: 250, category: 'desserts' },
  
  // Packaging
  { id: 'paper-bag', name: 'Бумажный пакет', price: 50, category: 'packaging' },
  { id: 'cup-lid', name: 'Крышка для стакана', price: 20, category: 'packaging' },
  
  // Seasonal Drinks
  { id: 'pumpkin-latte', name: 'Тыквенный латте', price: 280, category: 'seasonal-drinks' },
  { id: 'gingerbread-latte', name: 'Имбирный латте', price: 280, category: 'seasonal-drinks' },
  
  // Specific Products
  { id: 'cheese-stick', name: 'Сырная палка', price: 250, category: 'cheese-stick' },
  { id: 'pine-tea', name: 'Чай хвойная клюква', price: 220, category: 'pine-tea' },
  { id: 'coffee-pack-250', name: 'Пачка кофе 250г', price: 1200, category: 'coffee-pack' },
];
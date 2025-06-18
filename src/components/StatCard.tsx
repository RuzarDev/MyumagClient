import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeText?: string;
  tooltip?: string;
  format?: 'currency' | 'number' | 'percentage';
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeText,
  tooltip,
  format = 'number'
}: StatCardProps) => {
  const formattedValue = () => {
    if (typeof value === 'string') return value;
    
    if (format === 'currency') {
      return new Intl.NumberFormat('ru-RU', { 
        style: 'currency', 
        currency: 'RUB',
        maximumFractionDigits: 0
      }).format(value);
    } else if (format === 'percentage') {
      return `${value}%`;
    } else {
      return new Intl.NumberFormat('ru-RU').format(value);
    }
  };
  
  const renderChange = () => {
    if (change === undefined) return null;
    
    const isPositive = change > 0;
    const changeClass = isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
    const ChangeIcon = isPositive ? ArrowUp : ArrowDown;
    
    return (
      <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeClass}`}>
        <ChangeIcon className="h-3 w-3 mr-1" />
        {Math.abs(change)}%
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">{formattedValue()}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
      
      {(change !== undefined || changeText) && (
        <div className="mt-4 flex items-center">
          {renderChange()}
          {changeText && <span className="text-xs text-slate-500 ml-2">{changeText}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  negative?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  iconBg,
  iconColor,
  negative = false
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`rounded-full ${iconBg} p-3 ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm font-medium ${negative ? 'text-red-500' : 'text-green-500'}`}>
        {change}
        <div className="ml-1">
          {negative ? (
            <span className="inline-block">↓</span>
          ) : (
            <span className="inline-block">↑</span>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-100">
        <div 
          className={`h-full ${negative ? 'bg-red-500' : 'bg-green-500'}`
         //   style={{ width: change.replace(/[^0-9]/g, '') + '%' }}

        }
        ></div>
      </div>
    </div>
  );
};

export default StatsCard;
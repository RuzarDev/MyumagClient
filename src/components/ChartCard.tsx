import { useState } from 'react';
import { ChevronDown, Maximize2 } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  filters?: string[];
  children: React.ReactNode;
}

const ChartCard = ({ title, subtitle, filters = [], children }: ChartCardProps) => {
  const [activeFilter, setActiveFilter] = useState(filters[0] || 'All');
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-slate-800">{title}</h3>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
          
          <div className="flex items-center gap-2">
            {filters.length > 0 && (
              <div className="relative">
                <button className="flex items-center text-sm bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <span>{activeFilter}</span>
                  <ChevronDown size={16} className="ml-1 text-slate-500" />
                </button>
              </div>
            )}
            
            <button className="p-1.5 rounded-lg hover:bg-slate-100">
              <Maximize2 size={16} className="text-slate-500" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
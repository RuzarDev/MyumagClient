import React from 'react';

interface TimeChartProps {
  data: number[];
}

const TimeChart: React.FC<TimeChartProps> = ({ data }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">По времени</h2>
      
      <div className="relative h-[250px] w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0">
          <div className="flex h-full w-full items-start justify-between">
            {data.map((value, index) => {
              const heightPercentage = (value / maxValue) * 100;
              
              return (
                <div key={index} className="group relative mx-[1px] h-full flex-1">
                  <div 
                    className="absolute bottom-0 w-full rounded-b-sm bg-blue-400 transition-all duration-200 group-hover:bg-blue-500"
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                  
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500">
                    {index}
                  </div>
                  
                  <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {new Intl.NumberFormat('ru-RU').format(value)}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>
        </div>
      </div>
      
      <div className="mt-8 text-xs text-gray-500">
        <p className="text-center">Часы</p>
      </div>
    </div>
  );
};

export default TimeChart;
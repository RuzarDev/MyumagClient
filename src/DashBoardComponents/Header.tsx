import React, { useEffect, useState } from 'react';
import { Store } from 'lucide-react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // основное оформление
import 'react-date-range/dist/theme/default.css'; // тема

interface HeaderProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

const Header: React.FC<HeaderProps> = ({
                                         startDate,
                                         endDate,
                                         onStartDateChange,
                                         onEndDateChange,
                                       }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSelect = (ranges: any) => {
    onStartDateChange(ranges.selection.startDate);
    onEndDateChange(ranges.selection.endDate);
  };

  return (
    <header className="bg-white shadow-sm relative z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
          </div>
          <div className="relative">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm"
            >
              {`${format(startDate, 'dd.MM.yyyy')} - ${format(endDate, 'dd.MM.yyyy')}`}
            </button>
            {showCalendar && (
              <div className="absolute right-0 mt-2 z-20 shadow-lg">
                <DateRange
                  ranges={[{ startDate, endDate, key: 'selection' }]}
                  onChange={handleSelect}
                  maxDate={new Date()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

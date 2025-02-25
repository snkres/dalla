import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DatePickerProps {
  label: string;
  selectedMonth: string;
  selectedYear: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  disabled?: boolean;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - 25 + i).toString());

export function DatePicker({
  label,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  disabled = false
}: DatePickerProps) {
  const [isMonthOpen, setIsMonthOpen] = React.useState(false);
  const [isYearOpen, setIsYearOpen] = React.useState(false);
  const monthRef = React.useRef<HTMLDivElement>(null);
  const yearRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setIsMonthOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setIsYearOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative" ref={monthRef}>
          <button
            onClick={() => !disabled && setIsMonthOpen(!isMonthOpen)}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'hover:border-gray-400'
              }`}
            disabled={disabled}
          >
            <span className={disabled ? 'text-gray-400' : ''}>
              {selectedMonth || 'Month'}
            </span>
            <ChevronDown size={20} className={`${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
          </button>
          {isMonthOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    onMonthChange(month);
                    setIsMonthOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${selectedMonth === month ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={yearRef}>
          <button
            onClick={() => !disabled && setIsYearOpen(!isYearOpen)}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'hover:border-gray-400'
              }`}
            disabled={disabled}
          >
            <span className={disabled ? 'text-gray-400' : ''}>
              {selectedYear || 'Year'}
            </span>
            <ChevronDown size={20} className={`${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
          </button>
          {isYearOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    onYearChange(year);
                    setIsYearOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${selectedYear === year ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
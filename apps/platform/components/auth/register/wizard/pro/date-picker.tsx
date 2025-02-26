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

  // Track internal state to ensure we're always displaying the correct values
  const [internalMonth, setInternalMonth] = React.useState(selectedMonth);
  const [internalYear, setInternalYear] = React.useState(selectedYear);

  // Update internal state when props change
  React.useEffect(() => {
    setInternalMonth(selectedMonth);
  }, [selectedMonth]);

  React.useEffect(() => {
    setInternalYear(selectedYear);
  }, [selectedYear]);

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

  // Handle month selection
  const handleMonthSelect = (month: string) => {
    setInternalMonth(month);
    onMonthChange(month);
    setIsMonthOpen(false);
  };

  // Handle year selection
  const handleYearSelect = (year: string) => {
    setInternalYear(year);
    onYearChange(year);
    setIsYearOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative" ref={monthRef}>
          <button
            type="button"
            onClick={() => !disabled && setIsMonthOpen(!isMonthOpen)}
            className={`w-full px-4 py-2 border border-[#d0d5dd] rounded-lg flex items-center justify-between ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'hover:border-gray-400'
              }`}
            disabled={disabled}
            data-testid={`${label.toLowerCase().replace(/\s+/g, '-')}-month-selector`}
          >
            <span className={disabled ? 'text-gray-400' : ''}>
              {internalMonth || 'Month'}
            </span>
            <ChevronDown size={20} className={`${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
          </button>
          {isMonthOpen && (
            <div className="absolute z-10 w-full mt-1 bg-[#FFFDFA] border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {months.map((month) => (
                <button
                  type="button"
                  key={month}
                  onClick={() => handleMonthSelect(month)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${internalMonth === month ? 'bg-blue-50 text-blue-700' : ''
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
            type="button"
            onClick={() => !disabled && setIsYearOpen(!isYearOpen)}
            className={`w-full px-4 py-2 border border-[#d0d5dd] rounded-lg flex items-center justify-between ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'hover:border-gray-400'
              }`}
            disabled={disabled}
            data-testid={`${label.toLowerCase().replace(/\s+/g, '-')}-year-selector`}
          >
            <span className={disabled ? 'text-gray-400' : ''}>
              {internalYear || 'Year'}
            </span>
            <ChevronDown size={20} className={`${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
          </button>
          {isYearOpen && (
            <div className="absolute z-10 w-full mt-1 bg-[#FFFDFA] border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {years.map((year) => (
                <button
                  type="button"
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${internalYear === year ? 'bg-blue-50 text-blue-700' : ''
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
import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { DatePicker } from './date-picker';

interface Tool {
  id: string;
  name: string;
}

export function ExperienceForm() {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([
    { id: '1', name: 'Figma' },
    { id: '2', name: 'Jira' }
  ]);
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');

  const removeTool = (toolId: string) => {
    setSelectedTools(tools => tools.filter(tool => tool.id !== toolId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      startDate: { month: startMonth, year: startYear },
      endDate: isCurrentlyWorking ? 'Present' : { month: endMonth, year: endYear },
      isCurrentlyWorking,
      selectedTools
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="flex items-center justify-center mb-2">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDZMOSAxN0w0IDEyIiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
            alt="Experience"
            className="w-6 h-6"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center mb-1">Add experience</h2>
      <p className="text-gray-600 text-center mb-6">Share where you've worked on your profile.</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            placeholder="What is your job title?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for company"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://
              </span>
              <input
                type="text"
                placeholder="www.example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for city"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employment</label>
          <button className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg flex items-center justify-between">
            <span>Full time</span>
            <ChevronDown size={20} className="text-gray-400" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Used Tools</label>
          <div className="p-2 border border-gray-300 rounded-lg">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTools.map(tool => (
                <span
                  key={tool.id}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm"
                >
                  {tool.name}
                  <button
                    onClick={() => removeTool(tool.id)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full px-2 py-1 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
          <textarea
            placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
          <textarea
            placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={isCurrentlyWorking}
              onChange={(e) => setIsCurrentlyWorking(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">I'm currently still working here</span>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label="Start Date"
              selectedMonth={startMonth}
              selectedYear={startYear}
              onMonthChange={setStartMonth}
              onYearChange={setStartYear}
            />

            <DatePicker
              label="End Date"
              selectedMonth={endMonth}
              selectedYear={endYear}
              onMonthChange={setEndMonth}
              onYearChange={setEndYear}
              disabled={isCurrentlyWorking}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-red-400 text-white font-medium rounded-lg hover:bg-red-500 transition-colors"
        >
          Add experience
        </button>
      </div>
    </form>
  );
}
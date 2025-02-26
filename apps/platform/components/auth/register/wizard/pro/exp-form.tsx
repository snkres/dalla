import { Dispatch, useState } from "react";
import { ProOnboardingData } from "..";
import Image from "next/image";
import { Button } from "@dallah/design-system";
import { Modal } from "@components/shared/modal";
import React, { useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { DatePicker } from './date-picker';
import { Input, Textarea } from '@dallah/design-system';
import { cn } from '@dallah/utils';

interface Tool {
  id: string;
  name: string;
}

// Define employment options for the dropdown
const employmentOptions = [
  'Full time',
  'Part time',
  'Contract',
  'Freelance',
  'Internship'
];

// Predefined skills list for suggestions
const PREDEFINED_SKILLS = [
  'JavaScript', 'Python', 'TypeScript', 'React', 'Node.js',
  'HTML', 'CSS', 'SQL', 'Java', 'C++', 'Ruby', 'PHP',
  'AWS', 'Docker', 'Kubernetes', 'Git', 'MongoDB',
  'Photoshop', 'Illustrator', 'Figma', 'Sketch',
  'Angular', 'Vue.js', 'Next.js', 'GraphQL', 'REST API'
];

// Experience form component with added props to handle data integration
export function ExperienceForm({
  onSubmit,
  onCancel
}: {
  onSubmit: (experience: ProOnboardingData['experience'][0]) => void;
  onCancel: () => void;
}) {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');

  // Form data fields
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState(employmentOptions[0]);
  const [responsibilities, setResponsibilities] = useState('');
  const [achievements, setAchievements] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const removeTool = (toolId: string) => {
    setSelectedTools(tools => tools.filter(tool => tool.id !== toolId));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim()) {
      const filtered = PREDEFINED_SKILLS.filter(skill =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleAddSkill = (skill: string) => {
    const newTool: Tool = {
      id: `${skill}-${Date.now()}`,
      name: skill
    };

    if (!selectedTools.some(tool => tool.name === skill)) {
      setSelectedTools([...selectedTools, newTool]);
    }

    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleRemoveSkill = (toolToRemove: Tool) => {
    setSelectedTools(tools => tools.filter(tool => tool.id !== toolToRemove.id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() && suggestions.length > 0) {
      e.preventDefault();
      handleAddSkill(suggestions[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the experience object from form data
    const experience = {
      title: jobTitle,
      company: company,
      location: location,
      meta: {
        skills: selectedTools.map(tool => tool.name),
        achievements: achievements,
        responsibilities: responsibilities,
        employmentType: employmentType
      },
      startDate: `${startMonth} ${startYear}`,
      endDate: isCurrentlyWorking ? 'Present' : `${endMonth} ${endYear}`
    };

    // Send the data back to parent component
    onSubmit(experience);
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
          <Input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="What is your job title?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <div className="relative">
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Search for company"
              className="w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <div className="flex">
              <Input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="www.example.com"
                className="w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="location"
                className="w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="employment-type">
            Employment Type
          </label>
          <select
            id="employment-type"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {employmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tools & Technologies</label>
          <div className="border border-[#D0D5DD] rounded-lg bg-white p-3 focus-within:ring-2 focus-within:ring-slate-blue-20 focus-within:border-slate-blue-20">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTools.map((tool) => (
                <span
                  key={tool.id}
                  className="inline-flex items-center bg-slate-blue-10/70 text-gray-800 rounded-full px-3 py-1 text-sm"
                >
                  {tool.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(tool)}
                    className="ml-1 p-0.5 hover:bg-gray-200 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center relative">
              <Search className="text-gray-400 w-5 h-5" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => inputValue.trim() && setSuggestions(PREDEFINED_SKILLS.filter(skill =>
                  skill.toLowerCase().includes(inputValue.toLowerCase())))}
                placeholder="Select the tools, platforms, or technologies you are proficient in."
                className="flex-1 ml-2 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute left-0 right-0 mt-1 bg-[#FFFDFA] border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-10"
            >
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={() => handleAddSkill(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
          <Textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
          <Textarea
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
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

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={onCancel}
            className="w-full py-3 px-4 text-gray-700 font-medium rounded-lg transition-colors border border-gray-300 bg-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={cn(
              "w-full py-3 px-4 text-white font-medium rounded-lg transition-colors",
              'bg-coral-red-100'
            )}
          >
            Add experience
          </Button>
        </div>
      </div>
    </form>
  );
}

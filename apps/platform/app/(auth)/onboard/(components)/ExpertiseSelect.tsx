'use client';

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@dallah/design-system';
import { Button } from '@dallah/design-system';
import { ChevronsUpDown, Check } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@dallah/design-system';
import { cn } from '@dallah/utils';

interface ExpertiseSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
    expertiseOptions: string[];
}

const ExpertiseSelect = ({ value, onChange, expertiseOptions }: ExpertiseSelectProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between rounded-xl border-2 hover:border-[#234d64] transition-colors  px-4 h-full !py-0 hover:bg-transparent"
                >
                    <div className="flex flex-wrap gap-1 max-w-[90%]">
                        {value.length > 0 ? (
                            value.map((item) => (
                                <span
                                    key={item}
                                    className="bg-[#234d64]/10 text-[#234d64] px-2 py-0.5 rounded-md text-sm"
                                >
                                    {item}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500">Select Target Industries...</span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 h-full">
                <Command className="rounded-lg">
                    <CommandInput
                        placeholder="Search expertise..."
                        className="h-12 border-0 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                    />
                    <CommandList className="h-full p-2">
                        <CommandEmpty>No expertise found.</CommandEmpty>
                        <CommandGroup>
                            {expertiseOptions.map((option) => (
                                <CommandItem
                                    key={option}
                                    value={option}
                                    onSelect={() => {
                                        const newValue = value.includes(option)
                                            ? value.filter(item => item !== option)
                                            : [...value, option];
                                        onChange(newValue);
                                    }}
                                    className="rounded-md hover:bg-[#234d64]/10 aria-selected:bg-[#234d64]/20"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value.includes(option) ? "opacity-100 text-[#234d64]" : "opacity-0"
                                        )}
                                    />
                                    {option}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default ExpertiseSelect;
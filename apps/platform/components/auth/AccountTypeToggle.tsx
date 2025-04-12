'use client';

import { AccountType } from '@lib/types/auth';
import { motion } from 'motion/react';
import { cn } from '@dalla/utils';

interface AccountTypeToggleProps {
    value: AccountType;
    onChange: (type: AccountType) => void;
    className?: string;
}

export function AccountTypeToggle({
    value,
    onChange,
    className
}: AccountTypeToggleProps) {
    const options = [
        { value: 'company' as AccountType, label: 'Company' },
        { value: 'professional' as AccountType, label: 'Professional' }
    ];

    return (
        <div className={cn("flex justify-center w-full", className)}>
            <div className="relative flex h-10 p-2 bg-muted rounded-full">
                {/* Background */}
                <motion.div
                    className="absolute rounded-full bg-[#234d64] bg-opacity-90 shadow-sm"
                    animate={{
                        left: value === 'company' ? '0%' : '50%',
                    }}
                    transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5
                    }}
                    style={{
                        width: '50%',
                        height: '36px',
                        top: '2px',
                        left: 0
                    }}
                />

                {/* Buttons Container */}
                <div className="relative z-10 flex w-full">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onChange(option.value)}
                            className={cn(
                                "flex-1 px-4 text-sm font-medium rounded-full transition-colors duration-200",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                value === option.value
                                    ? "text-slate-blue-10"
                                    : "text-muted-foreground hover:text-primary"
                            )}
                            style={{
                                minWidth: '100px'  // Ensures equal width
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
import { cn } from '@dallah/utils';
import { GoalOption } from '@lib/types/goals';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface GoalCardProps {
    option: GoalOption;
    isSelected: boolean;
    onToggle: (id: string) => void;
}

export const GoalCard = ({ option, isSelected, onToggle }: GoalCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(option.id)}
            className={cn(
                "relative rounded-xl transition-all duration-200 cursor-pointer",
                "bg-white p-6",
                isSelected
                    ? "bg-[#63B7B7]/5 border border-[#63B7B7]"
                    : "border border-gray-100 hover:border-[#63B7B7]/30"
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-[#234d64] mb-2">{option.label}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{option.description}</p>
                </div>

                <div
                    className={cn(
                        "shrink-0 w-7 h-7 rounded-lg transition-colors duration-200",
                        "flex items-center justify-center",
                        isSelected ? "bg-[#63B7B7]" : "bg-gray-100"
                    )}
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: isSelected ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <Plus className={cn(
                            "w-4 h-4 transition-colors duration-200",
                            isSelected ? "text-white" : "text-gray-400"
                        )} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

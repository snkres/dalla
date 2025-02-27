'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@lib/contexts/OnboardingContext';
import { goalOptions } from '@lib/data/focus-options';
import { GoalCard } from './(components)/GoalCard';
import { CompletionDialog } from './(components)/CompletionDialog';
import { GoalOption } from '@lib/types/goals';
import { fadeInVariants, fadeInUpVariants } from '@components/aniamtion/animate';
import { ButtonsContainer } from '@lib/constants/ButtonsContianer';

export default function GoalsPage() {
    const router = useRouter();
    const { setCurrentStep, focusSelections, setFocusSelections } = useOnboarding();
    const [selectedGoals, setSelectedGoals] = useState<string[]>(focusSelections.goals);
    const [showCompleteDialog, setShowCompleteDialog] = useState(false);

    const handleToggle = (id: string) => {
        setSelectedGoals(prev =>
            prev.includes(id)
                ? prev.filter(goalId => goalId !== id)
                : [...prev, id]
        );
    };



    const handleContinue = async (e: React.FormEvent) => {
        e.preventDefault();
        setFocusSelections(prev => ({
            ...prev,
            goals: selectedGoals
        }));
        setShowCompleteDialog(true);
    };

    const handlePrevious = () => {
        setCurrentStep('focus');
        router.push('/focus');
    };

    const handleComplete = () => {
        setCurrentStep('profile');
        router.push('/profile');
    };

    return (
        <div className="min-h-screen bg-background">
            <motion.div variants={fadeInVariants} initial="hidden" animate="visible" className="container max-w-5xl mx-auto px-4 py-12 md:py-16">
                <motion.div variants={fadeInUpVariants} className="text-center space-y-4 mb-12">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        What are your goals?
                    </h1>
                    <p className="text-gray-500 text-sm font-light">
                        Select the goals that align with your professional journey
                    </p>
                </motion.div>

                <motion.div
                    className="grid sm:grid-cols-2 gap-6 mb-12"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="show"
                >
                    {goalOptions.map((option, index) => (
                        <motion.div
                            key={option.id}
                            variants={fadeInUpVariants}
                            custom={index}
                        >
                            <GoalCard
                                option={option as GoalOption}
                                isSelected={selectedGoals.includes(option.id)}
                                onToggle={handleToggle}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <ButtonsContainer handlePrevious={handlePrevious} handleSubmit={handleContinue} isSubmitting={false} previousText="Previous" continueText="Continue" />
            </motion.div>

            <CompletionDialog
                open={showCompleteDialog}
                onOpenChange={setShowCompleteDialog}
                onComplete={handleComplete}
            />
        </div>
    );
}
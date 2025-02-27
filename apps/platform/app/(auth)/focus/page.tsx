'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useOnboarding } from '@lib/contexts/OnboardingContext';
import { GoalCard } from '../goals/(components)/GoalCard';
import { focusAreaOptions } from '@lib/data/focus-options';
import { GoalOption } from '@lib/types/goals';
import { fadeInVariants, fadeInUpVariants } from '@components/aniamtion/animate';
import { ButtonsContainer } from '@lib/constants/ButtonsContianer';

export default function FocusPage() {
    const { goToPreviousStep, focusSelections, goToNextStep } = useOnboarding();
    const [selectedAreas, setSelectedAreas] = useState<string[]>(focusSelections.focusAreas);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const handleToggle = (id: string) => {
        setSelectedAreas(prev =>
            prev.includes(id)
                ? prev.filter(areaId => areaId !== id)
                : [...prev, id]
        );
    };

    const handleContinue = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            goToNextStep();
        } catch (error) {
            console.error('Profile submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50/30">
            <motion.div variants={fadeInVariants} initial="hidden" animate="visible" className="container max-w-3xl mx-auto px-4 py-12 md:py-16">
                <motion.div variants={fadeInUpVariants} className="text-center space-y-4 mb-12">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Choose Your Focus Areas
                    </h1>
                    <p className="text-gray-500 text-sm font-light">
                        Select the key areas that align with your professional goals and expertise
                    </p>
                </motion.div>

                <motion.div className="grid gap-4 mb-12" variants={fadeInVariants} initial="hidden" animate="show">
                    {focusAreaOptions.map((option, index) => (
                        <motion.div key={option.id} variants={fadeInUpVariants} custom={index}>
                            <GoalCard option={option as GoalOption} isSelected={selectedAreas.includes(option.id)} onToggle={handleToggle} />
                        </motion.div>
                    ))}
                </motion.div>


                <ButtonsContainer handlePrevious={goToPreviousStep} handleSubmit={handleContinue} isSubmitting={isSubmitting} previousText="Previous" continueText="Continue" />

                <motion.div className="mt-6 text-center text-gray-500">
                    {selectedAreas.length > 0 ? (
                        <span className='text-gray-500 text-sm font-light'>
                            {selectedAreas.length} area{selectedAreas.length > 1 ? 's' : ''} selected
                        </span>
                    ) : (
                        <span className='text-gray-500 text-sm font-light'>Select at least one focus area to continue</span>
                    )}
                </motion.div>
            </motion.div>


        </div>
    );
}


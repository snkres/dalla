'use client';

import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useState } from 'react';

type Step = {
    id: string;
    title: string;
    desc: string;
    isCompleted?: boolean;
    isActive?: boolean;

};

type FocusSelections = {
    focusAreas: string[];
    goals: string[];
};

const steps: Step[] = [
    {
        id: 'signup',
        title: 'Your details',
        desc: 'Provide an email and password',
        isActive: true,
    },
    {
        id: 'verify',
        title: 'Verify your email',
        desc: 'Enter your verification code',
    },
    {
        id: 'profile',
        title: 'Set up profile',
        desc: 'Tell us about yourself',
    },
    {
        id: 'focus',
        title: 'Focus areas',
        desc: 'Select your focus areas',
    },
    {
        id: 'goals',
        title: 'Goals',
        desc: 'Select your goals',
    },
    {
        id: 'profile',
        title: 'Welcome to Dalla',
        desc: 'Your account is ready',
    },
];

type OnboardingContextType = {
    steps: Step[];
    currentStep: string;
    setCurrentStep: (step: string) => void;
    focusSelections: FocusSelections;
    setFocusSelections: React.Dispatch<React.SetStateAction<FocusSelections>>;
    goToPreviousStep: () => void;
    goToNextStep: () => void;
};

const OnboardingContext = createContext<OnboardingContextType>({
    steps,
    currentStep: 'signup',
    setCurrentStep: () => { },
    focusSelections: { focusAreas: [], goals: [] },
    setFocusSelections: () => { },
    goToPreviousStep: () => { },
    goToNextStep: () => { },
});

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [currentStep, setCurrentStep] = useState('signup');
    const [focusSelections, setFocusSelections] = useState<FocusSelections>({
        focusAreas: [],
        goals: []
    });
    const router = useRouter();

    const goToPreviousStep = useCallback(() => {
        setCurrentStep(prevStep => {
            const currentIndex = steps.findIndex(step => step.id === prevStep);
            const previousStep = steps[currentIndex - 1];

            if (previousStep) {
                router.push(`/${previousStep.id}`);
                return previousStep.id;
            }
            return prevStep;
        });
    }, [router]);

    const goToNextStep = useCallback(() => {
        setCurrentStep(prevStep => {
            const currentIndex = steps.findIndex(step => step.id === prevStep);
            const nextStep = steps[currentIndex + 1];

            if (nextStep) {
                router.push(`/${nextStep.id}`);
                return nextStep.id;
            }
            return prevStep;
        });
    }, [router]);

    return (
        <OnboardingContext.Provider value={{
            steps,
            currentStep,
            setCurrentStep,
            goToPreviousStep,
            goToNextStep,
            focusSelections,
            setFocusSelections,
        }}>
            {children}
        </OnboardingContext.Provider>
    );
}
export const useOnboarding = () => useContext(OnboardingContext);
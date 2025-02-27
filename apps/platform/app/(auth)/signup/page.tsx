'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button } from '@dallah/design-system';
import { Input } from '@dallah/design-system';
import { useOnboarding } from '@lib/contexts/OnboardingContext';
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { AccountTypeToggle } from '@components/auth/AccountTypeToggle';
import { AccountType } from '@lib/types/auth';
import { RiAppleFill } from "react-icons/ri";
import { fadeInUpVariants, fadeInVariants } from '@components/aniamtion/animate';
import { Link } from 'next-view-transitions';

interface SignupFormData {
  accountType: AccountType;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { setCurrentStep } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    accountType: 'professional',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add your signup logic here
      setCurrentStep('verify');
      router.push('/verify');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div variants={fadeInVariants} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col items-center justify-center gap-2 text-center space-y-2">
        <motion.div variants={fadeInUpVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
          <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.34 88.92" className='w-20 h-20 fill-[#234d64]'>
            <g id="Layer_1-2" data-name="Layer 1">
              <path d="M0,.65l.83-.37c15.4.83,32.03-1.17,47.26.25,38.68,3.61,54.39,51.9,25.07,77.59-11.74,10.29-24.67,11.25-39.7,10.67-.29-.01-.89.18-.84-.24.37,0,.71-.11,1.05-.27,15.98-7.48,26.02-19.63,25.82-38-.03-2.53-.64-5.4-.73-7.91-.03-.81-.09-1.75.11-2.52.81-3.13,10.12-7.74,12.97-9.34.29-.44-1.51-2.5-1.94-2.88-1.27-1.13-3.35-1.96-5.03-2.16-.81-.1-1.84.16-2.58-.05-.47-.14-3.21-2.36-4.09-2.87-14.91-8.63-25.97.5-31.16,14.61-8.94,4.02-17.74,8.43-26.02,13.7l-.55-.07c-.09-.06-.48-.68-.48-.73V.65Z" />
              <path d="M48.39,28.17c3.75-.99,3.77,5.15-.19,3.91-1.68-.53-1.63-3.43.19-3.91Z" />
            </g>
          </svg>
        </motion.div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="text-gray-500 text-sm font-light">
          Join Dalla Solutions and start your journey
        </p>
      </div>

      <AccountTypeToggle
        value={formData.accountType}
        onChange={(type) => setFormData({ ...formData, accountType: type })}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="h-11"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Choose password"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm password"
                className="h-11"
                required
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-[#234d64] hover:bg-[#1a3b4d] text-white font-medium"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs lowercase">
          <span className="bg-white px-2 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: FaGoogle, label: 'Google' },
          { icon: RiAppleFill, label: 'Apple' },
          { icon: FaFacebookF, label: 'Facebook' },
          { icon: FaXTwitter, label: 'Twitter' },
        ].map(({ icon: Icon, label }) => (
          <Button
            key={label}
            type="button"
            variant="outline"
            className="h-11"
            onClick={() => {/* Handle social signup */ }}
          >
            <Icon className="h-5 w-5" />
          </Button>
        ))}
      </div>


      <p className="text-center text-xs text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="text-[#234d64] hover:text-[#1a3b4d] font-medium">
          Sign in
        </Link>
      </p>

      <p className="text-center text-xs text-gray-500">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="text-[#234d64] hover:text-[#1a3b4d]">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-[#234d64] hover:text-[#1a3b4d]">
          Privacy Policy
        </Link>
      </p>
    </motion.div>
  );
}
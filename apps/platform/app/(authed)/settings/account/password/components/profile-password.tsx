'use client'

import { useState } from 'react'
import { AlertTriangle, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Input } from '@dallah/design-system'
import { Button } from '@dallah/design-system'
import { motion } from 'motion/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@dallah/design-system/ui/toast/use-toast'
import { changePassword } from '@lib/api/auth/password'

export function ProfilePassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        title: 'Password updated successfully',
        description: 'Your password has been updated successfully',
      })
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    },
    onError: (error) => {
      console.error('Failed to update password:', error)
      toast({
        title: 'Update failed',
        description:
          error instanceof Error
            ? error.message
            : 'There was a problem updating your password',
        variant: 'destructive',
      })
    },
  })

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    return ''
  }

  const handleSubmit = () => {
    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      toast({
        title: 'Invalid password',
        description: passwordError,
        variant: 'destructive',
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure both passwords match',
        variant: 'destructive',
      })
      return
    }

    passwordMutation.mutate({
      oldPassword,
      newPassword,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="p-6 text-center">
        <div className="flex flex-col items-center">
          <h3 className="mb-2 text-lg font-medium">Change Password</h3>
          <p className="mb-6 text-sm text-gray-500">
            Update your password to keep your account secure
          </p>

          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="oldPassword"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="oldPassword"
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="block text-left text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={passwordMutation.isPending}
              className="w-full rounded-lg !bg-[#63B7B7] px-4 py-2 text-sm font-medium text-white transition-colors hover:!bg-[#63B7B7]/90 disabled:opacity-50"
            >
              {passwordMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="text-md font-medium text-gray-800">
          Password Guidelines
        </h3>

        <motion.div
          className="flex gap-3 rounded-lg border border-[#BEDDF1] bg-[#BEDDF1]/20 p-4"
          whileHover={{ backgroundColor: 'rgba(190, 221, 241, 0.3)' }}
          transition={{ duration: 0.2 }}
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#63B7B7]" />
          <div>
            <h4 className="text-sm font-medium text-gray-700">
              Password Security Tips
            </h4>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-xs text-gray-600">
              <li>Use at least 8 characters</li>
              <li>Include a mix of letters, numbers, and symbols</li>
              <li>Avoid using easily guessable information</li>
              <li>Don't reuse passwords from other websites</li>
              <li>Consider using a password manager for added security</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

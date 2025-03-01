"use client"

import { motion } from "motion/react"
import { Button } from "@dallah/design-system"
import { Input } from "@dallah/design-system"
import { FaXTwitter } from "react-icons/fa6"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { AccountTypeToggle } from "@components/auth/AccountTypeToggle"
import type { AccountType } from "@lib/types/auth"
import { RiAppleFill } from "react-icons/ri"
import { fadeInUpVariants, fadeInVariants } from "@components/aniamtion/animate"
import { Link, useTransitionRouter } from "next-view-transitions"
import { z } from "zod"
import { register } from "@lib/api/auth/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useQueryState } from "nuqs"
import { useState } from "react"
import { useToast } from "@dallah/design-system/ui/toast/use-toast"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  username: z.string().min(2, "Username must be at least 2 characters long").optional(),
})

type FormData = z.infer<typeof schema>

export default function SignupPage() {
  const [mode, setMode] = useQueryState("mode", {
    defaultValue: "company",
  })
  const router = useTransitionRouter()
  const { toast } = useToast()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    try {
      const res = await register({
        ...data,
        userType: mode === "company" ? "company" : "professional",
        username: data.username || "",
      })
      if (res.success) {
        if (typeof window !== undefined) {
          localStorage.setItem("mode", mode === "company" ? "company" : "professional")
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("email", data.email)
        }
        router.push("/verify")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div variants={fadeInVariants} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col items-center justify-center gap-2 text-center space-y-2">
        <motion.div variants={fadeInUpVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
          <svg
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 88.34 88.92"
            className="w-20 h-20 fill-[#234d64]"
          >
            <g id="Layer_1-2" data-name="Layer 1">
              <path d="M0,.65l.83-.37c15.4.83,32.03-1.17,47.26.25,38.68,3.61,54.39,51.9,25.07,77.59-11.74,10.29-24.67,11.25-39.7,10.67-.29-.01-.89.18-.84-.24.37,0,.71-.11,1.05-.27,15.98-7.48,26.02-19.63,25.82-38-.03-2.53-.64-5.4-.73-7.91-.03-.81-.09-1.75.11-2.52.81-3.13,10.12-7.74,12.97-9.34.29-.44-1.51-2.5-1.94-2.88-1.27-1.13-3.35-1.96-5.03-2.16-.81-.1-1.84.16-2.58-.05-.47-.14-3.21-2.36-4.09-2.87-14.91-8.63-25.97.5-31.16,14.61-8.94,4.02-17.74,8.43-26.02,13.7l-.55-.07c-.09-.06-.48-.68-.48-.73V.65Z" />
              <path d="M48.39,28.17c3.75-.99,3.77,5.15-.19,3.91-1.68-.53-1.63-3.43.19-3.91Z" />
            </g>
          </svg>
        </motion.div>
        <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
        <p className="text-gray-500 text-sm font-light">Join Dalla Solutions and start your journey</p>
      </div>

      <AccountTypeToggle
        value={mode as AccountType}
        onChange={(type) => {
          setMode(type)
        }}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              {...registerField("email")}
              placeholder="Enter your email"
              className="h-11 w-full"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-4 sm:flex sm:gap-4 sm:space-y-0">
            <div className="space-y-2 w-full">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="name"
                type="text"
                {...registerField("name")}
                placeholder="Enter your name"
                className="h-11 w-full"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-2 w-full">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                id="username"
                type="text"
                {...registerField("username")}
                placeholder="Enter your username"
                className="h-11 w-full"
              />
              {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...registerField("password")}
              placeholder="Enter password"
              className="h-11 w-full"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-[#234d64] hover:bg-[#1a3b4d] text-white font-medium"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
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
          { icon: FaGoogle, label: "Google" },
          { icon: RiAppleFill, label: "Apple" },
          { icon: FaFacebookF, label: "Facebook" },
          { icon: FaXTwitter, label: "Twitter" },
        ].map(({ icon: Icon, label }) => (
          <Button
            key={label}
            type="button"
            variant="outline"
            className="h-11"
            onClick={() => {
              /* Handle social signup */
            }}
          >
            <Icon className="h-5 w-5" />
          </Button>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-[#234d64] hover:text-[#1a3b4d] font-medium">
          Sign in
        </Link>
      </p>

      <p className="text-center text-xs text-gray-500">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-[#234d64] hover:text-[#1a3b4d]">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-[#234d64] hover:text-[#1a3b4d]">
          Privacy Policy
        </Link>
      </p>
    </motion.div>
  )
}


'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, LogoHorizontal } from '@dallah/design-system'
import { Menu, X } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@dallah/design-system'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  function handleToggleClick() {
    setIsOpen((open) => !open)
  }

  return (
    <nav className="bg-slate-blue w-full">
      <div className="mx-auto px-4 lg:px-32">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Link href="/" className="text-[#FFFFFF]">
                <LogoHorizontal className="[&_path]:fill-foreground w-44" />
              </Link>
            </div>
          </div>

          <div className="*:font-mont hidden md:block">
            <div className="ml-4 flex items-center space-x-[24px]">
              <Link
                href="/"
                className="text-text-lg font-semibold text-[#FFFFFF]"
              >
                Home
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground text-text-lg bg-transparent !px-0">
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-foreground !w-[20rem] px-4 font-semibold">
                      <NavigationMenuLink>Link</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link
                href="/"
                className="text-text-lg font-semibold capitalize text-[#FFFFFF]"
              >
                How it works
              </Link>
              <Link
                href="/"
                className="text-text-lg font-semibold capitalize text-[#FFFFFF]"
              >
                About
              </Link>
              <Link
                href="/"
                className="text-text-lg font-semibold capitalize text-[#FFFFFF]"
              >
                Contact
              </Link>
              <Button
                asChild
                variant="secondary"
                className="text-text-lg !rounded-full !px-4 !py-7 !font-bold"
              >
                <Link href="/">Get Started</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <Button
              className="inline-flex items-start justify-center rounded-md p-2 text-[#FFFFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F7CA71]"
              onClick={handleToggleClick}
              variant="ghost"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
      >
        <div className="space-y-3 px-2 pb-3 pt-2 sm:px-3">
          <Link href="/" className="block capitalize text-[#FFFFFF]">
            Home
          </Link>
          <Link href="/" className="block capitalize text-[#FFFFFF]">
            Services
          </Link>
          <Link href="/" className="block capitalize text-[#FFFFFF]">
            How it works
          </Link>
          <Link href="/" className="block capitalize text-[#FFFFFF]">
            About
          </Link>
          <Link href="/" className="block capitalize text-[#FFFFFF]">
            Contact
          </Link>
          <Button
            asChild
            variant="secondary"
            className="text-text-md w-full !rounded-full !px-4 !py-7 !font-bold"
          >
            <Link href="/">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/logo.png'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  function handleToggleClick() {
    setIsOpen((open) => !open)
  }

  return (
    <nav className="bg-slate-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Link href="/" className="text-[#FFFFFF]">
                <Image src={logo} alt="logo-navbar" />
              </Link>
            </div>
            <div className="flex flex-col uppercase text-[#FFFFFF]">
              <span className="text-3xl tracking-[.2em]">dalla</span>
              <span className="tracking-[.30em]">solution</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-12">
              <Link href="/" className="capitalize text-[#FFFFFF]">
                Home
              </Link>
              {/* Services Dropdown */}
              <div
                className="group relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="capitalize text-[#FFFFFF] focus:outline-none">
                  Services ▼
                </button>
                {/* Dropdown Menu */}
                {isServicesOpen && (
                  <div className="absolute left-0 z-50 w-48 rounded-md bg-white shadow-lg">
                    <Link
                      href="/service1"
                      className="text-slate-blue block px-4 py-2 hover:bg-gray-100"
                    >
                      Service 1
                    </Link>
                    <Link
                      href="/service2"
                      className="text-slate-blue block px-4 py-2 hover:bg-gray-100"
                    >
                      Service 2
                    </Link>
                    <Link
                      href="/service3"
                      className="text-slate-blue block px-4 py-2 hover:bg-gray-100"
                    >
                      Service 3
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/" className="capitalize text-[#FFFFFF]">
                How it works
              </Link>
              <Link href="/" className="capitalize text-[#FFFFFF]">
                About
              </Link>
              <Link href="/" className="capitalize text-[#FFFFFF]">
                Contact
              </Link>
              <Link
                href="/"
                className="text-slate-blue rounded-full bg-[#F7CA71] px-4 py-3 md:px-5 md:py-4"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            <button
              className="inline-flex items-start justify-center rounded-md p-2 text-[#FFFFFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F7CA71]"
              onClick={handleToggleClick}
            >
              {isOpen ? '✅' : '❌'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden">
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
            <Link
              href="/"
              className="text-slate-blue block rounded-full bg-[#F7CA71] px-4 py-3 md:px-5 md:py-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

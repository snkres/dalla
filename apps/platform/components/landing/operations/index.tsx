'use client'

import React, { useState } from 'react'
import { operations } from './content'
import { Underline } from '../shared/underline'
import { Button } from '@dallah/design-system'
import { motion, AnimatePresence } from 'motion/react'

const ITEMS_PER_PAGE = 6

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export function Operations() {
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(operations.length / ITEMS_PER_PAGE)
  const paginatedOperations = operations.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="relative px-4 pt-[2.438] sm:px-6 lg:mx-[11.625rem]">
      <div className="container-fluid flex flex-col gap-[3.125rem]">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-slate-blue mb-7 text-4xl font-bold sm:text-5xl lg:text-[4.5rem]">
            Streamline{' '}
            <span className="relative inline-block">
              Operations{' '}
              <Underline className="absolute left-0 z-0 w-full xl:-bottom-6" />
            </span>
          </h2>
          <p className="text-lg text-[#00000066] sm:text-xl lg:text-2xl">
            Tailored Solutions for Startups, SMEs, and Enterprises
          </p>
        </div>

        <div className="grid min-h-[40dvh] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {paginatedOperations.map((oper, index) => (
              <motion.div
                key={oper.title + index}
                className="relative h-fit cursor-pointer overflow-hidden rounded-2xl border border-[#234D6466] bg-white p-5 transition-transform duration-300 hover:scale-105"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <span className="absolute right-0 top-0 opacity-45">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.2">
                      <path
                        d="M27.5 10C37.165 10 45 2.16498 45 -7.5C45 -17.165 37.165 -25 27.5 -25C17.835 -25 10 -17.165 10 -7.5C10 2.16498 17.835 10 27.5 10Z"
                        fill="white"
                        stroke="#234D64"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.5 65C37.165 65 45 57.165 45 47.5C45 37.835 37.165 30 27.5 30C17.835 30 10 37.835 10 47.5C10 57.165 17.835 65 27.5 65Z"
                        fill="white"
                        stroke="#234D64"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M110 -10L43.25 39.9"
                        stroke="#234D64"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M110 49.85L43.25 -0.0999756"
                        stroke="#234D64"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </span>

                <span>{oper.icon}</span>

                <div className="mt-4">
                  <h2 className="text-slate-blue mb-2 text-xl font-bold uppercase">
                    {oper.title}
                  </h2>
                  <p className="text-sm font-semibold text-[#2FC57A] sm:text-base lg:text-lg">
                    {oper.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={prevPage}
            className="py-2 text-2xl text-[#234D64] transition-colors duration-300 hover:bg-[#234D6410]"
            variant="ghost"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 12H3"
                stroke="#234D64"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 20L3 12L11 4"
                stroke="#234D64"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 w-2 rounded-full ${
                  i === currentPage ? 'bg-[#234D64]' : 'bg-[#234D6440]'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextPage}
            className="py-2 text-2xl text-[#234D64] transition-colors duration-300 hover:bg-[#234D6410]"
            variant="ghost"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21"
                stroke="#234D64"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 4L21 12L13 20"
                stroke="#234D64"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  )
}

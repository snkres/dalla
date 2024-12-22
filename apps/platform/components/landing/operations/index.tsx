'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'
import { operations } from './content'

export function Operations() {
  return (
    <section className="relative py-16">
      <div className="container mx-auto space-y-14 px-8">
        <div className="text-center">
          <h2 className="text-slate-blue mb-7 text-xl font-bold md:text-7xl">
            Streamline Operations
          </h2>
          <p className="text-sm text-gray-500 md:text-lg">
            Tailored Solutions for Startups, SMEs, and Enterprises
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Grid]}
          spaceBetween={30}
          slidesPerView={1}
          grid={{ rows: 2, fill: 'row' }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          className="mySwiper"
        >
          {operations.map((oper, index) => (
            <SwiperSlide key={index}>
              <div className="box relative overflow-hidden rounded-xl border border-gray-300 bg-white p-4">
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
                  <h2 className="mb-2 text-2xl font-semibold uppercase">
                    {oper.title}
                  </h2>
                  <p className="font-semibold text-[#2FC57A]">
                    {oper.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mx-auto mt-8 flex max-w-60 items-center justify-center">
          <button className="custom-prev mr-4 px-4 py-2 text-2xl text-[#234D64]">
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
          </button>

          <div className="custom-pagination flex items-center justify-center space-x-1"></div>

          <button className="custom-next ml-4 px-4 py-2 text-2xl text-[#234D64]">
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
          </button>
        </div>
      </div>
    </section>
  )
}

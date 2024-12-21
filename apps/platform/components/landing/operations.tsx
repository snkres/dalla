'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'

interface Operation {
  icon: React.JSX.Element
  title: string
  description: string
}

const operations: Operation[] = [
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="24" fill="#234D64" />
        <path
          d="M19.6663 22.6667C20.955 22.6667 21.9997 21.622 21.9997 20.3333C21.9997 19.0447 20.955 18 19.6663 18C18.3777 18 17.333 19.0447 17.333 20.3333C17.333 21.622 18.3777 22.6667 19.6663 22.6667Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.6663 30C20.955 30 21.9997 28.9553 21.9997 27.6667C21.9997 26.378 20.955 25.3333 19.6663 25.3333C18.3777 25.3333 17.333 26.378 17.333 27.6667C17.333 28.9553 18.3777 30 19.6663 30Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30.6666 20L21.7666 26.6533"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30.6666 27.98L21.7666 21.32"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: 'Cultural Strategies',
    description: '45 Professional available',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="24" fill="#234D64" />
        <path
          d="M21.3333 22.6667L20 24L21.3333 25.3333"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M26.667 22.6667L28.0003 24L26.667 25.3333"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23.9997 30.6667C27.6816 30.6667 30.6663 27.6819 30.6663 24C30.6663 20.3181 27.6816 17.3333 23.9997 17.3333C20.3178 17.3333 17.333 20.3181 17.333 24C17.333 27.6819 20.3178 30.6667 23.9997 30.6667Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24.6663 22.4467L23.333 25.5533"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: 'Sports Event Planning',
    description: '43 Professional available',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="24" fill="#234D64" />
        <path
          d="M19.6663 22.6667C20.955 22.6667 21.9997 21.622 21.9997 20.3333C21.9997 19.0447 20.955 18 19.6663 18C18.3777 18 17.333 19.0447 17.333 20.3333C17.333 21.622 18.3777 22.6667 19.6663 22.6667Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.6663 30C20.955 30 21.9997 28.9553 21.9997 27.6667C21.9997 26.378 20.955 25.3333 19.6663 25.3333C18.3777 25.3333 17.333 26.378 17.333 27.6667C17.333 28.9553 18.3777 30 19.6663 30Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30.6666 20L21.7666 26.6533"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30.6666 27.98L21.7666 21.32"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: 'Arts & Creative Identity',
    description: '14 Professional available',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="24" fill="#234D64" />
        <path
          d="M30.5397 18.6267C29.513 21.1867 26.9397 24.6667 24.7864 26.3933L23.473 27.4467C23.3064 27.5667 23.1397 27.6733 22.953 27.7467C22.953 27.6267 22.9464 27.4933 22.9264 27.3667C22.853 26.8067 22.5997 26.2867 22.153 25.84C21.6997 25.3867 21.1464 25.12 20.5797 25.0467C20.4464 25.04 20.313 25.0267 20.1797 25.04C20.253 24.8333 20.3664 24.64 20.5064 24.48L21.5464 23.1667C23.2664 21.0133 26.7597 18.4267 29.313 17.4067C29.7064 17.26 30.0864 17.3667 30.3264 17.6133C30.5797 17.86 30.6997 18.24 30.5397 18.6267Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22.9532 27.7467C22.9532 28.48 22.6732 29.18 22.1465 29.7133C21.7399 30.12 21.1865 30.4 20.5265 30.4867L18.8865 30.6667C17.9932 30.7667 17.2265 30.0067 17.3332 29.1L17.5132 27.46C17.6732 26 18.8932 25.0667 20.1865 25.04C20.3199 25.0333 20.4599 25.04 20.5865 25.0467C21.1532 25.12 21.7065 25.38 22.1599 25.84C22.6065 26.2867 22.8599 26.8067 22.9332 27.3667C22.9399 27.4933 22.9532 27.62 22.9532 27.7467Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M25.4932 25.6467C25.4932 23.9067 24.0798 22.4933 22.3398 22.4933"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: 'Development',
    description: '66 Professional available',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="24" fill="#234D64" />
        <path
          d="M24.6137 17.5067L28.9537 19.8467C29.4603 20.12 29.4603 20.9 28.9537 21.1733L24.6137 23.5133C24.227 23.72 23.7737 23.72 23.387 23.5133L19.047 21.1733C18.5403 20.9 18.5403 20.12 19.047 19.8467L23.387 17.5067C23.7737 17.3 24.227 17.3 24.6137 17.5067Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.4063 22.7533L22.4397 24.7733C22.9397 25.0267 23.2597 25.54 23.2597 26.1V29.9133C23.2597 30.4667 22.6797 30.82 22.1863 30.5733L18.153 28.5533C17.653 28.3 17.333 27.7867 17.333 27.2267V23.4133C17.333 22.86 17.913 22.5067 18.4063 22.7533Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29.5936 22.7533L25.5602 24.7733C25.0602 25.0267 24.7402 25.54 24.7402 26.1V29.9133C24.7402 30.4667 25.3202 30.82 25.8136 30.5733L29.8469 28.5533C30.3469 28.3 30.6669 27.7867 30.6669 27.2267V23.4133C30.6669 22.86 30.0869 22.5067 29.5936 22.7533Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: 'Development',
    description: '66 Professional available',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="24" fill="#234D64" />
        <path
          d="M28.2133 24C29.9467 24 30.6667 23.3333 30.0267 21.1467C29.5933 19.6733 28.3267 18.4067 26.8533 17.9733C24.6667 17.3333 24 18.0533 24 19.7867V21.7067C24 23.3333 24.6667 24 26 24H28.2133Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29.333 25.8C28.713 28.8867 25.753 31.1267 22.3863 30.58C19.8596 30.1733 17.8263 28.14 17.413 25.6133C16.873 22.26 19.0996 19.3 22.173 18.6733"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: 'Franchise Expansion',
    description: '43 Professional available',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="24" fill="#234D64" />
        <path
          d="M20.667 23.16V25.2933"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24 22V26.4533"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M27.333 23.16V25.2933"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.9997 30.6667H25.9997C29.333 30.6667 30.6663 29.3333 30.6663 26V22C30.6663 18.6667 29.333 17.3333 25.9997 17.3333H21.9997C18.6663 17.3333 17.333 18.6667 17.333 22V26C17.333 29.3333 18.6663 30.6667 21.9997 30.6667Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: 'Corporate Feasibility',
    description: '18 Professional available',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="24" fill="#234D64" />
        <path
          d="M19.6663 22.6667C20.955 22.6667 21.9997 21.622 21.9997 20.3333C21.9997 19.0447 20.955 18 19.6663 18C18.3777 18 17.333 19.0447 17.333 20.3333C17.333 21.622 18.3777 22.6667 19.6663 22.6667Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.6663 30C20.955 30 21.9997 28.9553 21.9997 27.6667C21.9997 26.378 20.955 25.3333 19.6663 25.3333C18.3777 25.3333 17.333 26.378 17.333 27.6667C17.333 28.9553 18.3777 30 19.6663 30Z"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30.6666 20L21.7666 26.6533"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30.6666 27.98L21.7666 21.32"
          stroke="#F7CA71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: 'Development',
    description: '66 Professional available',
  },
]

const Operations: React.FC = () => {
  return (
    <section className="relative bg-gray-100 py-16">
      <div className="container mx-auto space-y-14 px-8">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="text-slate-blue mb-7 text-xl font-bold md:text-7xl">
            Streamline Operations
          </h2>
          <p className="text-sm text-gray-500 md:text-lg">
            Tailored Solutions for Startups, SMEs, and Enterprises
          </p>
        </div>

        {/* Swiper Section */}
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
              <div className="box relative overflow-hidden rounded-xl border border-gray-300 bg-white px-6 py-6">
                {/* Background Image */}

                <span className="absolute right-5 top-5 opacity-45">
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
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M27.5 65C37.165 65 45 57.165 45 47.5C45 37.835 37.165 30 27.5 30C17.835 30 10 37.835 10 47.5C10 57.165 17.835 65 27.5 65Z"
                        fill="white"
                        stroke="#234D64"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M110 -10L43.25 39.9"
                        stroke="#234D64"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M110 49.85L43.25 -0.0999756"
                        stroke="#234D64"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                </span>
                {/* Card Icon */}
                <span>{oper.icon}</span>
                {/* Card Content */}
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

        {/* Custom Navigation and Pagination Section */}
        <div className="mx-auto mt-8 flex max-w-60 items-center justify-center">
          {/* <!-- Previous Arrow --> */}
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

          {/* <!-- Pagination Dots --> */}
          <div className="custom-pagination flex items-center justify-center space-x-1"></div>

          {/* <!-- Next Arrow --> */}
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

export default Operations

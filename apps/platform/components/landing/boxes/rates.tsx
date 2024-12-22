'use client'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const usersRate = [
  {
    image: '/avatar.png',
    name: 'Jeff Beck',
    jobTitle: 'CEO, SomethingGood',
    comment:
      '“Dalla The most under-rated tools! Easy to setup, interactive analytics, great visualizations, and generous free tier. What more can you ask for!”',
  },
  {
    image: '/avatar.png',
    name: 'Fares Mohamed',
    jobTitle: 'Frontend Developer',
    comment:
      'Fares The most under-rated tools! Easy to setup, interactive analytics, great visualizations, and generous free tier. What more can you ask for!”',
  },
  {
    image: '/avatar.png',
    name: 'Amr Tamer',
    jobTitle: 'Frontend Developer',
    comment:
      'Amr Tamer The most under-rated tools! Easy to setup, interactive analytics, great visualizations, and generous free tier. What more can you ask for!”',
  },
  {
    image: '/avatar.png',
    name: 'Mahmoud Galal',
    jobTitle: 'Backend Developer',
    comment:
      'Mahmoud The most under-rated tools! Easy to setup, interactive analytics, great visualizations, and generous free tier. What more can you ask for!”',
  },
]

export function Rates() {
  return (
    <div className="mx-auto w-full max-w-xs lg:max-w-2xl">
      <div className="mb-3 text-center text-xl text-[#234D64] md:text-left">
        We love our users
      </div>
      <div className="-mt-4 mb-5 flex flex-col items-center justify-between space-y-3 font-semibold md:flex-row">
        <p className="text-center text-2xl text-[#234D64] md:text-left">
          because they love us.
        </p>
        <div className="btns flex items-center gap-x-4">
          <button className="custom-prev">
            <svg
              width="46"
              height="50"
              viewBox="0 0 46 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="44"
                height="48"
                rx="16"
                stroke="#D8D8D8"
              />
              <path
                d="M26 31.0856C26 31.3281 25.9026 31.5607 25.7293 31.7322C25.556 31.9037 25.3209 32 25.0758 32C24.8306 32 24.5956 31.9037 24.4222 31.7322L18.2714 25.6466C18.1854 25.5618 18.1171 25.461 18.0705 25.3501C18.024 25.2391 18 25.1201 18 25C18 24.8799 18.024 24.7609 18.0705 24.6499C18.1171 24.539 18.1854 24.4382 18.2714 24.3534L24.4222 18.2678C24.5956 18.0963 24.8306 18 25.0758 18C25.3209 18 25.556 18.0963 25.7293 18.2678C25.9026 18.4393 26 18.6719 26 18.9144C26 19.1569 25.9026 19.3895 25.7293 19.561L20.2327 24.9992L25.7293 30.439C25.9026 30.6105 26 30.8431 26 31.0856Z"
                fill="#23232D"
              />
            </svg>
          </button>
          <button className="custom-next">
            <svg
              width="46"
              height="50"
              viewBox="0 0 46 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="44"
                height="48"
                rx="16"
                stroke="#D8D8D8"
              />
              <path
                d="M21.1637 31.9132C20.9876 32.0894 20.7487 32.1883 20.4997 32.1883C20.2506 32.1883 20.0117 32.0894 19.8356 31.9132C19.6595 31.7371 19.5605 31.4983 19.5605 31.2492C19.5605 31.0001 19.6595 30.7612 19.8356 30.5851L25.4223 25L19.8372 19.4132C19.75 19.326 19.6808 19.2225 19.6336 19.1086C19.5864 18.9946 19.5621 18.8725 19.5621 18.7492C19.5621 18.6259 19.5864 18.5037 19.6336 18.3898C19.6808 18.2759 19.75 18.1723 19.8372 18.0851C19.9244 17.9979 20.0279 17.9287 20.1418 17.8815C20.2558 17.8343 20.3779 17.8101 20.5012 17.8101C20.6246 17.8101 20.7467 17.8343 20.8606 17.8815C20.9746 17.9287 21.0781 17.9979 21.1653 18.0851L27.4153 24.3351C27.5026 24.4223 27.5718 24.5259 27.619 24.6399C27.6662 24.7539 27.6904 24.8761 27.6903 24.9995C27.6901 25.1229 27.6656 25.245 27.6182 25.3589C27.5707 25.4728 27.5012 25.5763 27.4137 25.6632L21.1637 31.9132Z"
                fill="#23232D"
              />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={5}
        slidesPerView={1}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        className="max-h-[440px] rounded-[40px] p-8"
      >
        {usersRate.map((user, index) => (
          <SwiperSlide key={index}>
            <div className="max-h-[440px] space-y-12 rounded-[40px] bg-[#DBEFFA] px-4 py-8 lg:p-14">
              <div>
                <svg
                  width="188"
                  height="32"
                  viewBox="0 0 188 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.8564 24.22C17.5766 24.0814 17.2482 24.0814 16.9684 24.22L9.21918 28.06C8.48223 28.4252 7.64408 27.7942 7.79133 26.985L9.24166 19.0145C9.3031 18.6769 9.18711 18.3313 8.93439 18.0991L2.83409 12.4943C2.21084 11.9217 2.53642 10.882 3.37496 10.7672L11.9126 9.59785C12.2332 9.55394 12.5127 9.35762 12.6628 9.07096L16.5265 1.69195C16.9008 0.977101 17.924 0.9771 18.2983 1.69195L22.162 9.07096C22.3121 9.35762 22.5916 9.55394 22.9122 9.59785L31.4499 10.7672C32.2884 10.882 32.614 11.9217 31.9907 12.4943L25.8904 18.0991C25.6377 18.3313 25.5217 18.6769 25.5832 19.0145L27.0335 26.985C27.1807 27.7942 26.3426 28.4252 25.6056 28.06L17.8564 24.22Z"
                    fill="#FEBC62"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M56.0498 24.22C55.77 24.0814 55.4415 24.0814 55.1618 24.22L47.4125 28.06C46.6756 28.4252 45.8374 27.7942 45.9847 26.985L47.435 19.0145C47.4965 18.6769 47.3805 18.3313 47.1277 18.0991L41.0274 12.4943C40.4042 11.9217 40.7298 10.882 41.5683 10.7672L50.106 9.59785C50.4266 9.55394 50.7061 9.35762 50.8562 9.07096L54.7199 1.69195C55.0942 0.977101 56.1174 0.9771 56.4917 1.69195L60.3553 9.07096C60.5054 9.35762 60.785 9.55394 61.1055 9.59785L69.6432 10.7672C70.4818 10.882 70.8073 11.9217 70.1841 12.4943L64.0838 18.0991C63.8311 18.3313 63.7151 18.6769 63.7765 19.0145L65.2269 26.985C65.3741 27.7942 64.5359 28.4252 63.799 28.06L56.0498 24.22Z"
                    fill="#FEBC62"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M94.2431 24.22C93.9634 24.0814 93.6349 24.0814 93.3551 24.22L85.6059 28.06C84.869 28.4252 84.0308 27.7942 84.178 26.985L85.6284 19.0145C85.6898 18.6769 85.5738 18.3313 85.3211 18.0991L79.2208 12.4943C78.5976 11.9217 78.9231 10.882 79.7617 10.7672L88.2994 9.59785C88.6199 9.55394 88.8995 9.35762 89.0496 9.07096L92.9132 1.69195C93.2875 0.977101 94.3107 0.9771 94.685 1.69195L98.5487 9.07096C98.6988 9.35762 98.9783 9.55394 99.2989 9.59785L107.837 10.7672C108.675 10.882 109.001 11.9217 108.377 12.4943L102.277 18.0991C102.024 18.3313 101.908 18.6769 101.97 19.0145L103.42 26.985C103.567 27.7942 102.729 28.4252 101.992 28.06L94.2431 24.22Z"
                    fill="#FEBC62"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M132.437 24.22C132.158 24.0814 131.829 24.0814 131.549 24.22L123.8 28.06C123.063 28.4252 122.225 27.7942 122.372 26.985L123.823 19.0145C123.884 18.6769 123.768 18.3313 123.515 18.0991L117.415 12.4943C116.792 11.9217 117.117 10.882 117.956 10.7672L126.494 9.59785C126.814 9.55394 127.094 9.35762 127.244 9.07096L131.108 1.69195C131.482 0.977101 132.505 0.9771 132.879 1.69195L136.743 9.07096C136.893 9.35762 137.173 9.55394 137.493 9.59785L146.031 10.7672C146.869 10.882 147.195 11.9217 146.572 12.4943L140.471 18.0991C140.219 18.3313 140.103 18.6769 140.164 19.0145L141.615 26.985C141.762 27.7942 140.924 28.4252 140.187 28.06L132.437 24.22Z"
                    fill="#FEBC62"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M170.631 24.22C170.351 24.0814 170.023 24.0814 169.743 24.22L161.994 28.06C161.257 28.4252 160.418 27.7942 160.566 26.985L162.016 19.0145C162.078 18.6769 161.962 18.3313 161.709 18.0991L155.609 12.4943C154.985 11.9217 155.311 10.882 156.149 10.7672L164.687 9.59785C165.008 9.55394 165.287 9.35762 165.437 9.07096L169.301 1.69195C169.675 0.977101 170.698 0.9771 171.073 1.69195L174.936 9.07096C175.086 9.35762 175.366 9.55394 175.687 9.59785L184.224 10.7672C185.063 10.882 185.388 11.9217 184.765 12.4943L178.665 18.0991C178.412 18.3313 178.296 18.6769 178.358 19.0145L179.808 26.985C179.955 27.7942 179.117 28.4252 178.38 28.06L170.631 24.22Z"
                    fill="#FEBC62"
                  />
                </svg>
              </div>
              <p className="text-text-lg lg:text-text-2xl text-slate-blue">
                “Dalla The most under-rated tools! Easy to setup, interactive
                analytics, great visualizations, and generous free tier. What
                more can you ask for!”
              </p>
              <div className="flex items-center justify-between rounded-full bg-white px-5 py-5 lg:px-8">
                <div className="flex items-center gap-4">
                  <Image
                    src={user.image}
                    width="50"
                    height="50"
                    alt="user-image"
                  />
                  <div className="flex flex-col text-sm">
                    <span className="text-[ #000000] text-text-md lg:text-text-lg font-bold">
                      {user.name}
                    </span>
                    <span className="text-text-xs lg:text-text-sm text-[#787878]">
                      {user.jobTitle}
                    </span>
                  </div>
                </div>

                <div>
                  <svg
                    width="35"
                    height="32"
                    viewBox="0 0 35 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.9117 15.7857H15.0796V25H4.39453V19C4.39453 13.5 5.75859 10.2143 8.33514 6H13.564C11.9726 9.5 10.9117 12.2857 10.9117 15.7857ZM26.523 15.7857H30.7667V25H20.0059V19C20.0059 13.5 21.3699 10.2143 24.0222 6H29.2511C27.5839 9.5 26.523 12.2857 26.523 15.7857Z"
                      fill="#234D64"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

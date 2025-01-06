import Link from 'next/link'

import footerlogo from '../../../../public/footerlogo.png'
import Image from 'next/image'
import { FooterList } from './footer-list'
import { Button, LogoHorizontal } from '@dallah/design-system'

export function Footer() {
  return (
    <footer className="bg-foreground mt-16 text-sm">
      <div className="mx-auto px-5">
        <div className="flex flex-col justify-center gap-28 pb-8 pt-16 md:flex-row">
          <FooterList className="container-fluid">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex-shrink-0">
                <Link href="/" className="text-[#FFFFFF]">
                  <LogoHorizontal className="[&_path]:fill-slate-blue w-36 xl:w-60" />
                </Link>
              </div>
            </div>
            <p className="text-text-md xl:text-text-xl container-fluid w-full text-[#94959B]">
              Connect with expert consultants to transform your business.
            </p>
          </FooterList>
          <FooterList>
            <h3 className="text-text-md mb-2 font-bold text-[#12022F]">
              Sitemap
            </h3>
            <Link href="#" className="text-text-sm text-[#594D6D]">
              Product
            </Link>
            <Link href="#" className="text-text-sm text-[#594D6D]">
              Company
            </Link>
            <Link href="#" className="text-text-sm text-[#594D6D]">
              Pricing
            </Link>
            <Link href="#" className="text-text-sm text-[#594D6D]">
              Jobs
            </Link>
            <Link href="#" className="text-text-sm text-[#594D6D]">
              Community
            </Link>
          </FooterList>
          <FooterList>
            <h3 className="mb-2 text-lg font-bold text-[#12022F]">Utility</h3>
            <Link href="#" className="text-text-sm text-[#594D6D]">
              FAQ
            </Link>
            <Link href="#" className="text-text-sm text-[#594D6D]">
              Support
            </Link>
            <Link href="#" className="text-text-sm text-[#594D6D]">
              Licensing & Terms
            </Link>
            <Link href="#" className="text-text-sm text-[#594D6D]">
              Technology
            </Link>
          </FooterList>
          <FooterList>
            <h3 className="mb-2 text-lg font-bold">Subscribe our Newsletter</h3>
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
              <div className="relative">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-5 top-1/2 -translate-y-1/2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 3H7C4.23858 3 2 5.23858 2 8V16C2 18.7614 4.23858 21 7 21H16.9919L17.2087 20.9952C19.8687 20.8794 21.9901 18.6885 21.9939 16.0014L21.997 8.006L22 7.99797C22 5.23601 19.7607 2.99747 17 3ZM17.0009 5L17.1771 5.00494C18.6929 5.09145 19.907 6.30518 19.9949 7.8217L19.998 7.99949L19.9939 15.9995C19.9916 17.6556 18.6479 18.9985 16.991 19H7C5.34315 19 4 17.6569 4 16V8C4 6.34315 5.34315 5 7 5L17.0009 5Z"
                    fill="#234D64"
                  />
                  <g opacity="0.5">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.29289 8.29289C7.65338 7.93241 8.22061 7.90468 8.6129 8.2097L8.70711 8.29289L9.87868 9.46447C11.0034 10.5892 12.799 10.6342 13.9773 9.59943L14.1213 9.46447L15.2929 8.29289C15.6834 7.90237 16.3166 7.90237 16.7071 8.29289C17.0676 8.65338 17.0953 9.22061 16.7903 9.6129L16.7071 9.70711L15.5355 10.8787C13.6421 12.7721 10.6078 12.8295 8.64525 11.0508L8.46447 10.8787L7.29289 9.70711C6.90237 9.31658 6.90237 8.68342 7.29289 8.29289Z"
                      fill="#234D64"
                    />
                  </g>
                </svg>
                <input
                  type="text"
                  placeholder="Your email"
                  className="rounded-full border-none bg-[#E7E5EA] py-5 pl-14 pr-5 shadow-sm outline-none"
                />
              </div>
              <Button className="!rounded-full !px-10 !py-7" size="lg">
                Subscribe
              </Button>
            </div>
            <div className="icons mt-10 flex items-center gap-4">
              <span className="text-text-sm font-bold">follow us</span>
              <Link href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_127_2394)">
                    <path
                      d="M24 12C24 5.37188 18.6281 0 12 0C5.37188 0 0 5.37188 0 12C0 17.625 3.87656 22.35 9.10312 23.6484V15.6656H6.62812V12H9.10312V10.4203C9.10312 6.3375 10.95 4.44375 14.9625 4.44375C15.7219 4.44375 17.0344 4.59375 17.5734 4.74375V8.0625C17.2922 8.03438 16.8 8.01562 16.1859 8.01562C14.2172 8.01562 13.4578 8.76094 13.4578 10.6969V12H17.3766L16.7016 15.6656H13.4531V23.9109C19.3969 23.1938 24 18.1359 24 12Z"
                      fill="#234D64"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_127_2394">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
              <Link href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2434 2.25H21.5527L14.3246 10.5094L22.8277 21.75H16.1715L10.9543 14.9344L4.9918 21.75H1.67773L9.40742 12.9141L1.25586 2.25H8.08086L12.7918 8.47969L18.2434 2.25ZM17.0809 19.7719H18.9137L7.08242 4.125H5.11367L17.0809 19.7719Z"
                    fill="#234D64"
                  />
                </svg>
              </Link>
              <Link href="#">
                <svg
                  width="21"
                  height="24"
                  viewBox="0 0 21 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.70156 21H0.346875V6.97969H4.70156V21ZM2.52187 5.06719C1.12969 5.06719 0 3.91406 0 2.52187C0 1.85303 0.265697 1.21158 0.73864 0.73864C1.21158 0.265697 1.85303 0 2.52187 0C3.19072 0 3.83217 0.265697 4.30511 0.73864C4.77805 1.21158 5.04375 1.85303 5.04375 2.52187C5.04375 3.91406 3.91406 5.06719 2.52187 5.06719ZM20.9953 21H16.65V14.175C16.65 12.5484 16.6172 10.4625 14.3859 10.4625C12.1219 10.4625 11.775 12.2297 11.775 14.0578V21H7.425V6.97969H11.6016V8.89219H11.6625C12.2438 7.79062 13.6641 6.62812 15.7828 6.62812C20.1891 6.62812 21 9.52969 21 13.2984V21H20.9953Z"
                    fill="#234D64"
                  />
                </svg>
              </Link>
              <Link href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_127_2392)">
                    <path
                      d="M4.05937 3L8.05313 6.99375C9.11719 5.70469 9.75 4.05 9.75 2.25C9.75 1.56094 9.65625 0.895312 9.48281 0.2625C7.43438 0.703125 5.57812 1.66406 4.05937 3ZM3 4.05937C1.66406 5.57812 0.703125 7.43438 0.2625 9.48281C0.895312 9.65625 1.56094 9.75 2.25 9.75C4.05 9.75 5.70469 9.11719 6.99844 8.05781L3 4.05937ZM12 0C11.6578 0 11.3156 0.0140625 10.9781 0.0421875C11.1562 0.75 11.25 1.49062 11.25 2.25C11.25 4.46719 10.4484 6.49219 9.12188 8.0625L12 10.9406L19.9406 3C17.8219 1.13438 15.0422 0 12 0ZM2.25 11.25C1.49062 11.25 0.75 11.1562 0.0421875 10.9781C0.0140625 11.3156 0 11.6578 0 12C0 15.0422 1.13438 17.8219 3 19.9406L10.9406 12L8.0625 9.12188C6.49219 10.4484 4.46719 11.25 2.25 11.25ZM23.9578 13.0219C23.9859 12.6844 24 12.3422 24 12C24 8.95781 22.8656 6.17812 21 4.05937L13.0594 12L15.9375 14.8781C17.5031 13.5516 19.5328 12.75 21.75 12.75C22.5094 12.75 23.25 12.8437 23.9578 13.0219ZM23.7375 14.5172C23.1047 14.3438 22.4391 14.25 21.75 14.25C19.95 14.25 18.2953 14.8828 17.0016 15.9422L21 19.9406C22.3359 18.4266 23.3016 16.5703 23.7375 14.5172ZM15.9422 17.0016C14.8828 18.2953 14.25 19.95 14.25 21.75C14.25 22.4391 14.3438 23.1047 14.5172 23.7375C16.5656 23.2969 18.4219 22.3359 19.9406 21L15.9469 17.0062L15.9422 17.0016ZM14.8781 15.9375L12 13.0594L4.05937 21C6.17344 22.8656 8.95312 24 12 24C12.3422 24 12.6844 23.9859 13.0219 23.9578C12.8437 23.25 12.75 22.5094 12.75 21.75C12.75 19.5328 13.5516 17.5078 14.8781 15.9375Z"
                      fill="#234D64"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_127_2392">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </FooterList>
        </div>
      </div>
      <div className="border-t- mx-auto flex w-3/4 flex-col items-center justify-between gap-3 border-t py-10 md:flex-row">
        <p className="md:text-text-sm">© 2024 Dalla. All rights reserved.</p>
        <div className="flex items-center gap-2 md:gap-5 md:text-lg">
          <Link href="#" className="md:text-text-sm text-slate-blue font-bold">
            Privacy Policy
          </Link>
          <Link href="#" className="md:text-text-sm text-slate-blue font-bold">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  )
}

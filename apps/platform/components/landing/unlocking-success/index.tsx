import Image from 'next/image'

export function UnlockingSuccess() {
  return (
    <section className="bg-white py-10 md:py-20">
      <div className="mx-auto px-4">
        <div className="relative z-10 flex flex-col items-center text-center text-lg text-white md:grid md:grid-cols-5 md:items-start md:text-left">
          <div className="col-span-3 max-w-2xl space-y-8 md:py-20 md:pl-16">
            <h3 className="text-slate-blue text-heading-lg font-semibold leading-tight">
              Unlocking Success with Specialized Consultants Across MENA
            </h3>
            <p className="text-text-lg leading-loose text-[#594D6D]">
              Connecting businesses to 24,000+ vetted consultants across 80+
              countries. Dalla simplifies project management, ensures secure
              payments, and drives growth with tailored solutions in culture,
              sports, arts, franchising, and corporate management.
            </p>

            <div className="flex flex-col items-center gap-10 md:flex-row">
              <div className="space-y-5 text-center md:text-left">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto md:mx-0"
                >
                  <circle cx="24" cy="24" r="24" fill="#234D64" />
                  <path
                    d="M24.457 15.3555L31.0664 18.168C31.8398 18.5195 32.4375 19.2578 32.4375 20.1719C32.4023 23.6875 30.9609 30.0508 24.9141 32.9688C24.3164 33.25 23.6484 33.25 23.0508 32.9688C17.0039 30.0508 15.5625 23.6875 15.5625 20.1719C15.5273 19.2578 16.125 18.5195 16.8984 18.168L23.5078 15.3555C23.6484 15.2852 23.8242 15.25 24 15.25C24.1406 15.25 24.3164 15.2852 24.457 15.3555ZM17.8125 20.2422C17.8125 21.0859 17.918 22.0703 18.1641 23.125H24V17.6055L17.8125 20.2422ZM24 30.8945C27.5156 29.207 29.168 25.9727 29.8359 23.125H24V30.8945Z"
                    fill="white"
                  />
                </svg>

                <div className="text-slate-blue font-bold">Secure Payment</div>
                <p className="text-[#594D6D]">
                  Work with confidence using our escrow-based payment system,
                  ensuring security and transparency.
                </p>
              </div>

              <div className="space-y-5 text-center md:text-left">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto md:mx-0"
                >
                  <circle cx="24" cy="24" r="24" fill="#234D64" />
                  <path
                    d="M12.75 19.75C12.75 18.5195 13.7344 17.5 15 17.5H21.75H23.4375H24H33C34.2305 17.5 35.25 18.5195 35.25 19.75V28.75C35.25 30.0156 34.2305 31 33 31H24H23.4375H21.75H15C13.7344 31 12.75 30.0156 12.75 28.75V19.75ZM24 19.75V28.75H33V19.75H24ZM19.0078 21.4375C18.9023 21.1914 18.6211 21.0156 18.375 21.0156C18.0938 21.0156 17.8125 21.1914 17.707 21.4375L15.457 26.5C15.3164 26.8516 15.457 27.2734 15.8086 27.4492C16.1953 27.5898 16.582 27.4492 16.7578 27.0977L17.0742 26.3594H19.6406L19.957 27.0977C20.1328 27.4492 20.5547 27.5898 20.9062 27.4492C21.2578 27.2734 21.3984 26.8516 21.2578 26.5L19.0078 21.4375ZM18.375 23.4766L19.043 24.9531H17.707L18.375 23.4766ZM28.5 21.0156C28.8867 21.0156 29.2031 21.332 29.2031 21.7188V21.8594H30.75H31.3125C31.6992 21.8594 32.0156 22.1758 32.0156 22.5625C32.0156 22.9492 31.6992 23.2656 31.3125 23.2656H31.2422L31.1719 23.4414C30.8555 24.2852 30.3984 25.0938 29.7656 25.7266C29.8008 25.7617 29.8359 25.7617 29.8711 25.7969L30.5391 26.1836C30.8555 26.3945 30.9609 26.8164 30.7852 27.168C30.5742 27.4844 30.1523 27.5898 29.8008 27.4141L29.168 26.9922C28.9922 26.9219 28.8516 26.8164 28.6758 26.7109C28.3242 26.957 27.9375 27.2031 27.4805 27.3789L27.375 27.4492C27.0234 27.5898 26.6016 27.4492 26.4258 27.0977C26.2852 26.7109 26.4609 26.3242 26.8125 26.1484L26.918 26.1133C27.1641 26.0078 27.375 25.8672 27.5859 25.7617L27.1641 25.3398C26.8828 25.0586 26.8828 24.6016 27.1641 24.3203C27.4102 24.0391 27.8672 24.0391 28.1484 24.3203L28.6406 24.8477H28.6758C29.0977 24.3906 29.4492 23.8633 29.7305 23.2656H28.5H25.9688C25.582 23.2656 25.2656 22.9492 25.2656 22.5625C25.2656 22.1758 25.582 21.8594 25.9688 21.8594H27.7969V21.7188C27.7969 21.332 28.1133 21.0156 28.5 21.0156Z"
                    fill="white"
                  />
                </svg>

                <div className="text-slate-blue font-bold">
                  Localized Support
                </div>
                <p className="text-[#594D6D]">
                  Tailored solutions designed for the MENA region, backed by
                  consultants with regional expertise.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-2 mt-10 md:mt-0">
            <Image
              src="/unlocking.jpg"
              width="520"
              height="520"
              alt="Family sitting around a fire pit in front of cabin"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

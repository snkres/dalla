import Image from 'next/image'
// import unlocking from "../../public/unlocking.jpg";
import unlocking1 from '../../public/unlocking1.png'
import unlocking2 from '../../public/unlocking2.png'

function Unlocking_success() {
  return (
    <div className="container mx-auto px-4">
      <div className="relative z-10 flex flex-col py-20 text-center text-lg text-white md:grid md:grid-cols-5 md:text-left">
        <div className="col-span-3 max-w-[640px] space-y-8 py-8">
          <h3 className="text-slate-blue text-xl font-semibold leading-tight md:text-6xl">
            Unlocking Success with Specialized Consultants Across MENA
          </h3>
          <p className="leading-loose text-[#594D6D]">
            Connecting businesses to 24,000+ vetted consultants across 80+
            countries. Dalla simplifies project management, ensures secure
            payments, and drives growth with tailored solutions in culture,
            sports, arts, franchising, and corporate management.
          </p>

          <div className="flex flex-col items-center gap-10 md:flex-row">
            <div className="space-y-5">
              <Image
                src={unlocking1}
                alt="unlocking1"
                className="mx-auto md:m-0"
              />
              <div className="text-slate-blue font-bold">Secure Payment</div>
              <p className="text-[#594D6D]">
                Work with confidence using our escrow-based payment system,
                ensuring security and transparency.
              </p>
            </div>

            <div className="space-y-5">
              <Image
                src={unlocking2}
                alt="unlocking2"
                className="mx-auto md:m-0"
              />
              <div className="text-slate-blue font-bold">Secure Payment</div>
              <p className="text-[#594D6D]">
                Tailored solutions designed for the MENA region, backed by
                consultants with regional expertise.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          {/* <Image
            src={unlocking}
            placeholder="blur"
            quality={80}
            alt="Family sitting around a fire pit in front of cabin"
          /> */}
          <Image
            src="/unlocking.jpg"
            width="520"
            height="520"
            alt="Family sitting around a fire pit in front of cabin"
          />
        </div>
      </div>
    </div>
  )
}

export default Unlocking_success

function Cta() {
  return (
    <div className="flex flex-col items-center justify-around w-full px-20 my-20 bg-sunshine-yellow h-80 md:flex-row">
      <h3 className="text-center text-xl font-semibold leading-tight md:max-w-[850px] md:text-left md:text-5xl">
        A High-Quality Solution Tailored for Businesses Across MENA
      </h3>
      <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
        <button className="px-6 py-2 border rounded-full border-slate-blue bg-slate-blue text-sunshine-yellow md:px-14 md:py-5">
          Get Started
        </button>
        <button className="px-6 py-2 border-2 rounded-full border-slate-blue text-slate-blue md:px-14 md:py-5">
          Learn More
        </button>
      </div>
    </div>
  )
}

export default Cta

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface InsightCard {
  img: string
  title: string
  description: string
}

const insights: InsightCard[] = [
  {
    img: '/Insights2.png',
    title: '5 Ways Cultural Consulting Can Transform Your Business',
    description:
      'Discover how cultural consulting can help you develop compelling strategies, build meaningful connections, and achieve your organizational goals.',
  },
  {
    img: '/Insights1.jpg',
    title: 'Unlocking Growth with Franchising Expertise',
    description:
      'Explore how franchising consultants can provide tailored strategies for expansion, ensuring your business thrives in competitive markets.',
  },
  {
    img: '/Insights3.png',
    title: 'The Role of Arts Consulting in Shaping Brand Identity',
    description:
      'Learn how arts consultants can craft unique identities and deliver innovative marketing strategies to distinguish your brand.',
  },
]

const Insights_to_empower: React.FC = () => {
  return (
    <section className="Insights_to_empower bg-background py-24">
      <div className="container mx-auto px-4 md:px-32">
        <div className="mx-auto mb-20 md:w-[800px]">
          <h1 className="text-slate-blue mb-12 text-center text-xl font-bold md:text-5xl">
            Insights to Empower Your Business Growth
          </h1>
          <p className="text-center text-[#00000066]">
            Stay informed with the latest trends, strategies, and expert advice
            tailored for businesses in culture, sports, arts, franchising, and
            corporate management.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="card max-w-[345px] overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={insight.img}
                alt={insight.title}
                width={400}
                height={400}
                className="mb-2 p-6"
              />
              <div className="space-y-4 p-5">
                <h3 className="text-slate-blue text-xl font-semibold">
                  {insight.title}
                </h3>
                <p className="text-sm text-[#00000066] text-gray-500">
                  {insight.description}
                </p>
              </div>
              <div className="my-4 py-6 text-center">
                <Link
                  href="#"
                  className="border-slate-blue text-slate-blue rounded-full border-2 px-20 py-3 font-bold"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Insights_to_empower

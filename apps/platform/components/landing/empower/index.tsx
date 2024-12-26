import { Button } from '@dallah/design-system'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
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
    img: '/Insights2.jpg',
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

export function InsightsToEmpower() {
  return (
    <section className="Insights_to_empower bg-background py-24">
      <div className="container mx-auto px-4 xl:px-32">
        <div className="mx-auto mb-20 md:w-[800px]">
          <h2 className="text-slate-blue md:text-heading-lg text-heading-sm lg:text-heading-md xl:text-heading-lg mb-12 text-center font-bold leading-[56px]">
            Insights to Empower Your Business Growth
          </h2>
          <p className="text-text-lg mx-auto max-w-xl text-center text-[#00000066]">
            Stay informed with the latest trends, strategies, and expert advice
            tailored for businesses in culture, sports, arts, franchising, and
            corporate management.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="card bg-foreground max-w-sm overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg lg:max-w-xl xl:max-w-2xl"
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
                <Button
                  asChild
                  className="text-text-md border-slate-blue text-slate-blue hover:bg-slate-blue !rounded-full border-2 bg-transparent hover:text-white"
                  variant="outline"
                  size="lg"
                >
                  <Link href="#">Learn More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

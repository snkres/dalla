'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@dallah/design-system'

const data = [
  {
    title: 'What is Dalla?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How does Dalla work?',
    text: 'SaaS works by hosting software applications on remote servers and delivering them to users over the internet. Users can access and use the software through web browsers or dedicated applications, eliminating the need for local installations.',
  },
  {
    title: 'What is Dalla, again?',
    text: 'SaaS works by hosting software applications on remote servers and delivering them to users over the internet. Users can access and use the software through web browsers or dedicated applications, eliminating the need for local installations.',
  },
  {
    title: 'Can I integrate Dalla with my existing systems?',
    text: 'SaaS works by hosting software applications on remote servers and delivering them to users over the internet. Users can access and use the software through web browsers or dedicated applications, eliminating the need for local installations.',
  },
]

export function FAQ() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="mb-2 text-center text-3xl font-semibold text-[#234D64] md:text-left">
        Frequently
      </h2>
      <div className="mb-8 text-center text-4xl font-bold text-[#234D64] md:text-left">
        asked questions.
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
        defaultValue={`item-${data[0].title}`}
      >
        {data.map((item, index) => (
          <AccordionItem
            value={`item-${item.title}`}
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200"
          >
            <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline focus:outline-none">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-600">
              {item.text}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <style jsx global>{`
        .AccordionContent {
          overflow: hidden;
        }
        .AccordionContent[data-state='open'] {
          animation: slideDown 300ms ease-out;
        }
        .AccordionContent[data-state='closed'] {
          animation: slideUp 300ms ease-out;
        }

        @keyframes slideDown {
          from {
            height: 0;
          }
          to {
            height: var(--radix-accordion-content-height);
          }
        }

        @keyframes slideUp {
          from {
            height: var(--radix-accordion-content-height);
          }
          to {
            height: 0;
          }
        }
      `}</style>
    </div>
  )
}

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
    <div className="mx-auto w-full max-w-xs lg:max-w-2xl">
      <div className="text-center text-[24px] text-[#234D64] md:text-left">
        Frequently
      </div>
      <div className="text-center text-[32px] font-semibold text-[#234D64] md:text-left">
        asked questions.
      </div>
      <Accordion type="single" collapsible className="w-full pt-[34px]">
        {data.map((item, index) => (
          <AccordionItem value={`item-${item.title}`} key={index}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent className="text-foreground">
              {item.text}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

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
      <h2 className="text-paragraph-lg lg:text-paragraph-xl xl:text-paragraph-2xl text-center text-[#234D64] md:text-left">
        Frequently
      </h2>
      <div className="text-heading-sm lg:text-heading-md xl:text-heading-md text-center font-semibold text-[#234D64] md:text-left">
        asked questions.
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full -space-y-px pt-[34px]"
        defaultValue={`item-${data[1].title}`}
      >
        {data.map((item, index) => (
          <AccordionItem
            value={`item-${item.title}`}
            key={index}
            className="bg-background border px-4 py-1"
          >
            <AccordionTrigger className="text-paragraph-md xl:text-paragraph-lg py-2 leading-6 hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-foreground xl:text-paragraph-md text-paragraph-sm pb-2 leading-loose">
              {item.text}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

'use client'

import { useState } from 'react'
import {
  MessageSquare,
  FileText,
  Play,
  BookOpen,
  Mail,
  ExternalLink,
  Search,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@dallah/design-system'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@dallah/design-system'

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState('')

  const faqItems = [
    {
      question: 'How do I invite team members?',
      answer:
        "You can invite team members by going to Settings > Team Members and clicking on the 'Invite Member' button. Enter their email address, select a role, and send the invitation.",
    },
    {
      question: 'How do I update my billing information?',
      answer:
        "To update your billing information, go to Settings > Billing & Plans, scroll down to Payment Methods and click 'Edit' next to your current payment method or 'Add Payment Method' to add a new one.",
    },
    {
      question: 'How do I change my subscription plan?',
      answer:
        'You can change your subscription plan by going to Settings > Billing & Plans. From there, you can see all available plans and select the one that best suits your needs.',
    },
    {
      question: 'How do I generate a new API key?',
      answer:
        "To generate a new API key, go to Settings > API & Integrations and click on the 'Create New Key' button. Give your key a name, select permissions, and an optional expiration date.",
    },
    {
      question: 'How can I delete my account?',
      answer:
        "To delete your account, go to Settings > Security, navigate to the Privacy tab, and scroll down to the Account Management section. Click on 'Delete Account' and follow the confirmation steps.",
    },
  ]

  const helpResources = [
    {
      title: 'Documentation',
      description: 'Detailed guides and API reference',
      icon: <FileText className="h-5 w-5" />,
      link: '#',
    },
    {
      title: 'Video Tutorials',
      description: 'Learn with step-by-step videos',
      icon: <Play className="h-5 w-5" />,
      link: '#',
    },
    {
      title: 'Knowledge Base',
      description: 'Browse articles and how-tos',
      icon: <BookOpen className="h-5 w-5" />,
      link: '#',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-md font-medium">Help & Support</h3>
          <p className="text-sm text-gray-500">
            Get help and find answers to your questions
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {helpResources.map((resource, index) => (
          <Card
            key={index}
            className="transition-colors hover:border-[#234d64]/30"
          >
            <CardHeader className="pb-2">
              <div className="mb-2 w-fit rounded-lg bg-[#BEDDF1]/30 p-2 text-[#234d64]">
                {resource.icon}
              </div>
              <CardTitle className="text-base">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full text-[#234d64]">
                Browse
                <ExternalLink className="ml-2 h-3.5 w-3.5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="h-1.5 w-full bg-gray-100" />

      <div className="space-y-4">
        <h3 className="text-md font-medium">Frequently Asked Questions</h3>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-sm font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="h-1.5 w-full bg-gray-100" />

      <div className="space-y-4">
        <h3 className="text-md font-medium">Contact Support</h3>

        <div className="rounded-lg bg-[#BEDDF1]/20 p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input placeholder="What do you need help with?" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  placeholder="Describe your issue in detail..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email to receive response
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-9"
                  />
                </div>
              </div>

              <Button className="bg-[#234d64] hover:bg-[#1a3b4d]">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>

              <p className="mt-2 text-xs text-gray-500">
                Our typical response time is within 24 hours during business
                days.
              </p>
            </div>

            <div className="space-y-4 md:w-64">
              <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <h4 className="mb-2 flex items-center text-sm font-medium">
                  <MessageSquare className="mr-2 h-4 w-4 text-[#234d64]" />
                  Live Chat Support
                </h4>
                <p className="mb-3 text-xs text-gray-500">
                  Available Monday to Friday
                  <br />
                  9:00 AM - 5:00 PM PT
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Start Chat
                </Button>
              </div>

              <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <h4 className="mb-2 flex items-center text-sm font-medium">
                  <Mail className="mr-2 h-4 w-4 text-[#234d64]" />
                  Email Support
                </h4>
                <p className="mb-3 text-xs text-gray-500">
                  For general inquiries
                  <br />
                  support@example.com
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Copy Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

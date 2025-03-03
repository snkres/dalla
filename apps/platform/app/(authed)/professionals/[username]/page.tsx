'use client'

import { useState } from 'react'
import { ProfileCard } from '../(components)/profile-card'
import { DetailedInfo } from '../(components)/detailed-info'
import { ProExp } from '../(components)/pro-exp'
import { Skills } from '../(components)/skills'
import { Projects } from '../(components)/projects'

export default function FreelancerProfile() {
  const [activeSkillCategory, setActiveSkillCategory] = useState('Technical')

  const handleSkillCategoryChange = (category: string) => {
    setActiveSkillCategory(category)
  }

  const skills = {
    Technical: [
      { name: 'SEO Optimization', level: 90 },
      { name: 'Social Media Management', level: 85 },
      { name: 'Content Marketing', level: 80 },
      { name: 'Email Marketing', level: 75 },
    ],
    Soft: [
      { name: 'Communication', level: 95 },
      { name: 'Time Management', level: 85 },
      { name: 'Problem Solving', level: 80 },
      { name: 'Leadership', level: 70 },
    ],
  }

  return (
    <>
      <div className="relative mt-6 grid grid-cols-1 gap-6 pb-6 lg:grid-cols-3">
        <div className="sticky top-12 flex h-[calc(100vh-6rem)] flex-col gap-6 overflow-hidden">
          <ProfileCard />
          <DetailedInfo />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Projects
            projects={[
              {
                title: 'Digital Marketing Strategy',
                description: 'Campaign Development',
                startDate: 'March 05, 2024',
                endDate: 'March 05, 2024',
                status: 'Ongoing',
                teamMembers: ['John Doe', 'Jane Smith'],
                progress: 60,
                teamSize: 2,
                category: 'Marketing',
                color: '#FFA500',
              },
              {
                title: 'Website Redesign',
                description: 'UI/UX Design',
                startDate: 'March 05, 2024',
                endDate: 'March 05, 2024',
                status: 'Completed',
                teamMembers: ['John Doe', 'Jane Smith'],
                progress: 100,
                teamSize: 2,
                category: 'Design',
                color: '#0d0d0d',
              },
            ]}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ProExp
              experiences={[
                {
                  position: 'Marketing Specialist',
                  company: 'TechNova Solutions',
                  period: '2021 - Present',
                  description:
                    'Leading digital marketing campaigns and brand strategy development.',
                },
              ]}
              education={[
                {
                  degree: 'Bachelor of Science in Marketing',
                  institution: 'University of Marketing',
                  period: '2018 - 2022',
                  description:
                    'Concentration in Digital Marketing and Brand Strategy.',
                },
              ]}
            />
            <Skills
              skills={skills as unknown as any[]}
              activeSkillCategory={activeSkillCategory}
              handleSkillCategoryChange={handleSkillCategoryChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

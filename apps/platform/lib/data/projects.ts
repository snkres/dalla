import { Briefcase, MapPin, Zap, Code, PaintBucket } from 'lucide-react'
import {
  Project,
  FilterCategory,
  BudgetRange,
  FilterOption,
} from '@lib/types/project'

// Filter categories
export const filterCategories: FilterCategory[] = [
  {
    key: 'all',
    label: 'All Projects',
    icon: Briefcase,
    tooltip: 'View all available projects',
  },
  {
    key: 'remote',
    label: 'Remote Only',
    icon: MapPin,
    tooltip: 'Projects that can be done remotely',
  },
  {
    key: 'urgent',
    label: 'Urgent Needs',
    icon: Zap,
    tooltip: 'Projects requiring immediate attention',
  },
  {
    key: 'dev',
    label: 'Development',
    icon: Code,
    tooltip: 'Programming and development projects',
  },
  {
    key: 'design',
    label: 'Design Work',
    icon: PaintBucket,
    tooltip: 'Design and creative projects',
  },
]

// Budget ranges for filter
export const budgetRanges: BudgetRange[] = [
  { value: [0, 10000], label: 'Under $10,000' },
  { value: [10000, 25000], label: '$10,000 - $25,000' },
  { value: [25000, 50000], label: '$25,000 - $50,000' },
  { value: [50000, 100000], label: '$50,000+' },
]

// Duration options for filter
export const durationOptions: FilterOption[] = [
  { value: '1-month', label: 'Up to 1 month' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-plus-months', label: '6+ months' },
]

// Location options for filter
export const locationOptions: FilterOption[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'on-site', label: 'On-site' },
]

// // Mock projects data
// export const projects: Project[] = [
//   {
//     id: 1,
//     title: 'E-commerce Platform Development',
//     company: 'TechCorp Inc.',
//     companyLogo: '/company-placeholder.png',
//     budget: '15,000',
//     skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
//     location: 'Remote',
//     duration: '3 months',
//     postedDate: '2 days ago',
//     description:
//       'Looking for experienced developers to build a modern e-commerce platform...',
//     featured: true,
//     detailed: `We're looking for an experienced full-stack developer to help build our next-generation e-commerce platform. The ideal candidate will have strong experience with modern web technologies and a track record of delivering high-quality solutions.

// Key Responsibilities:
// - Develop and maintain core e-commerce functionality
// - Implement responsive user interfaces
// - Optimize application performance
// - Work with the team to design and implement new features`,
//     requirements: [
//       '5+ years of experience in web development',
//       'Strong proficiency in React and Node.js',
//       'Experience with e-commerce platforms',
//       'Excellent problem-solving skills',
//       'Good communication skills',
//     ],
//     benefits: [
//       'Competitive compensation',
//       'Flexible working hours',
//       'Remote work options',
//       'Health insurance',
//       'Professional development budget',
//     ],
//     applications: 12,
//     views: 243,
//   },
//   {
//     id: 2,
//     title: 'Mobile App for Healthcare',
//     company: 'HealthTech Solutions',
//     companyLogo: '/company-placeholder.png',
//     budget: '25,000',
//     skills: ['React Native', 'Firebase', 'TypeScript'],
//     location: 'Hybrid',
//     duration: '4 months',
//     postedDate: '1 week ago',
//     description: 'Healthcare app development for patient management...',
//     detailed: `We're seeking a mobile developer to create a healthcare application focused on patient management and telehealth features. This project will help healthcare providers better connect with their patients.

// Key Responsibilities:
// - Build a cross-platform mobile application using React Native
// - Implement secure authentication and data storage
// - Create intuitive user interfaces for both patients and healthcare providers
// - Integrate with existing healthcare systems`,
//     requirements: [
//       '3+ years of mobile development experience',
//       'Experience with React Native and TypeScript',
//       'Knowledge of HIPAA compliance requirements',
//       'Understanding of healthcare workflows',
//       'Experience with Firebase or similar backend solutions',
//     ],
//     benefits: [
//       'Competitive pay',
//       'Hybrid work arrangement',
//       'Possibility for long-term partnership',
//       'Impact in healthcare technology',
//       'Learning opportunities in healthcare domain',
//     ],
//     applications: 8,
//     views: 167,
//   },
//   {
//     id: 3,
//     title: 'AI-Powered Data Analytics Dashboard',
//     company: 'DataViz Inc.',
//     companyLogo: '/company-placeholder.png',
//     budget: '30,000',
//     skills: ['Python', 'TensorFlow', 'D3.js', 'React'],
//     location: 'Remote',
//     duration: '6 months',
//     postedDate: '3 days ago',
//     urgent: true,
//     description:
//       'Building an advanced analytics dashboard with AI-powered insights and visualization...',
//     detailed: `We need a data scientist/developer to create an AI-powered analytics dashboard that provides actionable insights from our clients' data. This urgent project requires someone with both AI and visualization skills.

// Key Responsibilities:
// - Develop machine learning models to analyze business data
// - Create interactive visualizations to present insights
// - Build a React-based dashboard to display analytics
// - Implement data processing pipelines`,
//     requirements: [
//       'Experience with Python and ML frameworks (TensorFlow, PyTorch)',
//       'Strong visualization skills with D3.js or similar libraries',
//       'React development experience',
//       'Understanding of data processing and ETL',
//       'Background in data science and analytics',
//     ],
//     benefits: [
//       'Premium rates for urgent delivery',
//       '100% remote work',
//       'Potential for ongoing maintenance contract',
//       'Access to cutting-edge data infrastructure',
//       'High-visibility project with industry leaders',
//     ],
//     applications: 15,
//     views: 312,
//   },
//   {
//     id: 4,
//     title: 'Blockchain Payment Solution',
//     company: 'FinTech Global',
//     companyLogo: '/company-placeholder.png',
//     budget: '40,000',
//     skills: ['Solidity', 'Web3.js', 'React', 'Node.js'],
//     location: 'Remote',
//     duration: '5 months',
//     postedDate: 'Just now',
//     description:
//       'Developing a secure blockchain-based payment processing system...',
//     featured: true,
//     detailed: `We are building a next-generation payment solution using blockchain technology and need a developer with expertise in both blockchain and web development to help us create this platform.

// Key Responsibilities:
// - Develop smart contracts for payment processing
// - Build a secure wallet integration system
// - Create user interfaces for payment management
// - Ensure compliance with financial regulations`,
//     requirements: [
//       'Experience with Solidity and smart contract development',
//       'Knowledge of Web3.js and Ethereum development',
//       'Strong frontend skills (React, Vue, or Angular)',
//       'Understanding of payment processing workflows',
//       'Security-focused development approach',
//     ],
//     benefits: [
//       'Top-tier compensation',
//       'Flexible work schedule',
//       'Opportunity to work with blockchain innovators',
//       'Potential for token grants/equity',
//       'Global, remote-first team',
//     ],
//     applications: 5,
//     views: 98,
//   },
//   {
//     id: 5,
//     title: 'UX/UI Redesign for SaaS Product',
//     company: 'SaaS Platform Co.',
//     companyLogo: '/company-placeholder.png',
//     budget: '18,000',
//     skills: ['Figma', 'UI/UX', 'Adobe XD', 'HTML/CSS'],
//     location: 'On-site',
//     duration: '2 months',
//     postedDate: '1 day ago',
//     description:
//       'Complete redesign of our customer-facing SaaS platform with focus on usability...',
//     detailed: `Our SaaS platform needs a complete UI/UX overhaul to improve user experience and conversion rates. We're looking for a designer who can create beautiful, functional interfaces that help our users accomplish their tasks efficiently.

// Key Responsibilities:
// - Conduct user research and create personas
// - Design wireframes and prototypes
// - Create a comprehensive design system
// - Work with developers to implement designs`,
//     requirements: [
//       '5+ years of UI/UX design experience',
//       'Portfolio showcasing SaaS/web application designs',
//       'Proficiency with Figma and design tools',
//       'Understanding of user-centered design principles',
//       'Experience with usability testing',
//     ],
//     benefits: [
//       'Competitive design rates',
//       'Modern office in downtown location',
//       'Portfolio piece with established SaaS company',
//       'Collaborative, design-focused team',
//       'Potential for ongoing design work',
//     ],
//     applications: 20,
//     views: 278,
//   },
// ]

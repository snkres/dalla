import { ProposalSample } from '@lib/types/proposals'

const sampleProposals: ProposalSample[] = [
  {
    id: 'PROP-001',
    consultant: {
      id: 'C001',
      name: 'Alex Morgan',
      role: 'UI/UX Designer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.9,
      location: 'San Francisco, CA',
      completedProjects: 28,
      experience: 7,
      skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'Prototyping'],
    },
    coverLetter:
      'I have extensive experience in e-commerce redesigns, having worked with brands like Nike and Adidas. I specialize in creating intuitive user experiences that drive conversion rates. My approach combines data-driven design decisions with aesthetic excellence.',
    price: '$4,500',
    deliveryTime: '3 weeks',
    proposalDate: 'Mar 15, 2024',
    status: 'pending',
    matchScore: 92,
  },
  {
    id: 'PROP-002',
    consultant: {
      id: 'C002',
      name: 'Sarah Johnson',
      role: 'Full Stack Developer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4.7,
      location: 'New York, NY',
      completedProjects: 35,
      experience: 5,
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    },
    coverLetter:
      "Having reviewed your project requirements, I believe my expertise in React and Node.js makes me an ideal candidate. I've successfully completed similar projects for e-commerce businesses, focusing on responsive design and performance optimization. I can deliver a solution that not only looks great but also performs exceptionally well.",
    price: '$5,200',
    deliveryTime: '4 weeks',
    proposalDate: 'Mar 14, 2024',
    status: 'pending',
    matchScore: 85,
  },
  {
    id: 'PROP-003',
    consultant: {
      id: 'C003',
      name: 'David Chen',
      role: 'E-commerce Specialist',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 4.8,
      location: 'Toronto, Canada',
      completedProjects: 42,
      experience: 10,
      skills: [
        'Shopify',
        'WooCommerce',
        'SEO',
        'Conversion Optimization',
        'Analytics',
      ],
    },
    coverLetter:
      "With over 10 years of experience in e-commerce platform development, I've helped businesses increase their conversion rates by an average of 35%. I specialize in creating seamless shopping experiences with a focus on mobile optimization and checkout flow improvements. I'd love to bring this expertise to your project.",
    price: '$4,800',
    deliveryTime: '3.5 weeks',
    proposalDate: 'Mar 12, 2024',
    status: 'pending',
    matchScore: 88,
  },
]

export default sampleProposals

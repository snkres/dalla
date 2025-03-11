export interface PlatformInfo {
  name: string
  icon: string // Icon component name from lucide-react
  domain: string | string[]
  color: string // Tailwind color class
  regex?: RegExp // Optional regex for more precise matching
}

export const SOCIAL_PLATFORMS: PlatformInfo[] = [
  {
    name: 'LinkedIn',
    icon: 'Linkedin',
    domain: ['linkedin.com', 'lnkd.in'],
    color: 'text-[#0077B5]',
    regex: /linkedin\.com\/in\/|lnkd\.in/i,
  },
  {
    name: 'Twitter',
    icon: 'Twitter',
    domain: ['twitter.com', 'x.com', 't.co'],
    color: 'text-[#1DA1F2]',
    regex: /twitter\.com\/|x\.com\/|t\.co\//i,
  },
  {
    name: 'GitHub',
    icon: 'Github',
    domain: ['github.com', 'github.io'],
    color: 'text-[#181717]',
    regex: /github\.com\/|github\.io/i,
  },
  {
    name: 'Instagram',
    icon: 'Instagram',
    domain: ['instagram.com', 'instagr.am'],
    color: 'text-[#E4405F]',
    regex: /instagram\.com\/|instagr\.am/i,
  },
  {
    name: 'Facebook',
    icon: 'Facebook',
    domain: ['facebook.com', 'fb.com', 'fb.me'],
    color: 'text-[#1877F2]',
    regex: /facebook\.com\/|fb\.com\/|fb\.me\//i,
  },
  {
    name: 'YouTube',
    icon: 'Youtube',
    domain: ['youtube.com', 'youtu.be'],
    color: 'text-[#FF0000]',
    regex: /youtube\.com\/|youtu\.be\//i,
  },
  {
    name: 'TikTok',
    icon: 'Music2',
    domain: ['tiktok.com'],
    color: 'text-[#000000]',
    regex: /tiktok\.com\/@/i,
  },
  {
    name: 'Medium',
    icon: 'FileText',
    domain: ['medium.com'],
    color: 'text-[#000000]',
    regex: /medium\.com\/@/i,
  },
  {
    name: 'Dribbble',
    icon: 'Dribbble',
    domain: ['dribbble.com'],
    color: 'text-[#EA4C89]',
    regex: /dribbble\.com\/[^/]+$/i,
  },
  {
    name: 'Behance',
    icon: 'Figma',
    domain: ['behance.net'],
    color: 'text-[#1769FF]',
    regex: /behance\.net\/[^/]+$/i,
  },
  {
    name: 'Stack Overflow',
    icon: 'LayoutStack',
    domain: ['stackoverflow.com'],
    color: 'text-[#F58025]',
    regex: /stackoverflow\.com\/users\//i,
  },
  {
    name: 'Substack',
    icon: 'Newspaper',
    domain: ['substack.com'],
    color: 'text-[#FF6719]',
    regex: /substack\.com/i,
  },
  {
    name: 'Twitch',
    icon: 'Twitch',
    domain: ['twitch.tv'],
    color: 'text-[#9146FF]',
    regex: /twitch\.tv\//i,
  },
  {
    name: 'Discord',
    icon: 'MessageSquare',
    domain: ['discord.gg', 'discord.com'],
    color: 'text-[#5865F2]',
    regex: /discord\.gg\/|discord\.com\/invite\//i,
  },
  {
    name: 'Mastodon',
    icon: 'Share2',
    domain: ['mastodon.social'],
    color: 'text-[#6364FF]',
    regex: /mastodon\.social\/@/i,
  },
  {
    name: 'Portfolio',
    icon: 'Globe',
    domain: [],
    color: 'text-[#63B7B7]',
  },
]

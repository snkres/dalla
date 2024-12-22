export default {
  colors: {
    background: '#F8F8F8',
    foreground: '#FFFFFF',
    'slate-blue': {
      10: '#F1F5F9',
      20: '#E2E8F0',
      30: '#CBD5E1',
      40: '#94A3B8',
      50: '#64748B',
      60: '#475569',
      70: '#334155',
      80: '#1E293B',
      90: '#0F172A',
      100: '#020617',
      DEFAULT: '#234D64',
    },
    'sunshine-yellow': {
      10: '#CCFBF1',
      20: '#99F6E4',
      30: '#5EEAD4',
      40: '#2DD4BF',
      50: '#14B8A6',
      60: '#0D9488',
      70: '#0F766E',
      80: '#115E59',
      90: '#134E4A',
      100: '#042F2E',
      DEFAULT: '#F7CA71',
    },
    'coral-red': {
      10: '#FFE4E6',
      20: '#FECDD3',
      30: '#FDA4AF',
      40: '#FB7185',
      50: '#F43F5E',
      60: '#E11D48',
      70: '#BE123C',
      80: '#9F1239',
      90: '#881337',
      100: '#4C0519',
    },
    'navy-black': {
      10: '#FEF3C7',
      20: '#FDE68A',
      30: '#FCD34D',
      40: '#FBBF24',
      50: '#F59E0B',
      60: '#D97706',
      70: '#B45309',
      80: '#92400E',
      90: '#78350F',
      100: '#451A03',
    },
    'snow-white': {
      10: '#CCFBF1',
      20: '#99F6E4',
      30: '#5EEAD4',
      40: '#2DD4BF',
      50: '#14B8A6',
      60: '#0D9488',
      70: '#0F766E',
      80: '#115E59',
      90: '#134E4A',
      100: '#042F2E',
    },
    destructive: {
      DEFAULT: '#F43F5E',
      disabled: '#FFE4E6',
      disabledText: '#FDA4AF',
    },
  },

  fontSize: {
    'display-lg': ['clamp(90px, 10vw, 180px)', { lineHeight: '1.1' }],
    'display-md': ['clamp(64px, 8vw, 128px)', { lineHeight: '1.1' }],
    'display-sm': ['clamp(48px, 6vw, 96px)', { lineHeight: '1.1' }],

    'heading-2xl': ['clamp(36px, 5vw, 72px)', { lineHeight: '1.2' }],
    'heading-xl': ['clamp(30px, 4vw, 60px)', { lineHeight: '1.2' }],
    'heading-lg': ['clamp(24px, 3.5vw, 48px)', { lineHeight: '1.2' }],
    'heading-md': ['clamp(20px, 3vw, 36px)', { lineHeight: '1.2' }],
    'heading-sm': ['clamp(18px, 2.5vw, 30px)', { lineHeight: '1.2' }],
    'heading-xs': ['clamp(16px, 2vw, 24px)', { lineHeight: '1.2' }],

    'text-2xl': ['clamp(20px, 1.8vw, 24px)', { lineHeight: '1.5' }],
    'text-xl': ['clamp(18px, 1.6vw, 20px)', { lineHeight: '1.5' }],
    'text-lg': ['clamp(16px, 1.4vw, 18px)', { lineHeight: '1.5' }],
    'text-md': ['clamp(14px, 1.2vw, 16px)', { lineHeight: '1.5' }],
    'text-sm': ['clamp(12px, 1.1vw, 14px)', { lineHeight: '1.5' }],
    'text-xs': ['clamp(10px, 1vw, 12px)', { lineHeight: '1.5' }],
    'text-2xs': ['clamp(8px, 0.9vw, 10px)', { lineHeight: '1.5' }],

    'paragraph-2xl': ['clamp(20px, 1.8vw, 24px)', { lineHeight: '1.6' }],
    'paragraph-xl': ['clamp(18px, 1.6vw, 20px)', { lineHeight: '1.6' }],
    'paragraph-lg': ['clamp(16px, 1.4vw, 18px)', { lineHeight: '1.6' }],
    'paragraph-md': ['clamp(14px, 1.2vw, 16px)', { lineHeight: '1.6' }],
    'paragraph-sm': ['clamp(12px, 1.1vw, 14px)', { lineHeight: '1.6' }],
    'paragraph-xs': ['clamp(10px, 1vw, 12px)', { lineHeight: '1.6' }],

    'label-2xl': [
      'clamp(18px, 1.6vw, 20px)',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-xl': [
      'clamp(16px, 1.4vw, 18px)',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-lg': [
      'clamp(14px, 1.2vw, 16px)',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-md': [
      'clamp(12px, 1.1vw, 14px)',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-sm': [
      'clamp(10px, 1vw, 12px)',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-xs': [
      'clamp(8px, 0.9vw, 10px)',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    'extra-bold': '800',
  },

  fontFamily: {
    sans: [
      'Sora Variable',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Arial',
      'sans-serif',
    ],
  },

  screens: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}

export default {
  colors: {
    background: '#F8F8F8',
    foreground: '#FFFFFF',
    'slate-blue': {
      10: '#E8F2F8',
      20: '#D0E4F0',
      30: '#B3D2E0',
      40: '#9DC0D0',
      50: '#7FADBE',
      60: '#6E9AAA',
      70: '#5E8697',
      80: '#4E7384',
      90: '#3D5F70',
      100: '#2D4C5C',
    },
    'sunshine-yellow': {
      10: '#FFFDF9',
      20: '#FEFDFC',
      30: '#FCF9F4',
      40: '#FBF5F0',
      50: '#F9F0E2',
      60: '#F8EACF',
      70: '#F7E4BD',
      80: '#F6DEA9',
      90: '#F5D896',
      100: '#F4D283',
      DEFAULT: '#F7CA71',
    },
    'coral-red': {
      10: '#FEF5F5',
      20: '#FDEBEC',
      30: '#FBDADB',
      40: '#FAC8C9',
      50: '#F5B7B9',
      60: '#ECA5A7',
      70: '#E39397',
      80: '#DA8284',
      90: '#D07072',
      100: '#C75F60',
    },
    'snow-white': {
      10: '#FFF',
      20: '#FFF',
      30: '#FFF',
      40: '#FFF',
      50: '#FEFEFE',
      60: '#FCFCFC',
      70: '#FAFAFA',
      80: '#F7F7F7',
      90: '#F5F5F5',
      100: '#F2F2F2',
    },
    destructive: {
      DEFAULT: '#F43F5E',
      disabled: '#FFE4E6',
      disabledText: '#FDA4AF',
    },
    'text-primary': {
      DEFAULT: '#101828',
      'on-brand': '#FFF',
    },
    'text-secondary': {
      DEFAULT: '#344054',
      hover: '#182230',
      'on-brand': '#9DC0D0',
    },
    'text-tertiary': {
      DEFAULT: '#475467',
      hover: '#344054',
      'on-brand': '#9DC0D0',
    },
    'text-disabled': {
      DEFAULT: '#667084',
    },
    'text-placeholder': {
      DEFAULT: '#667084',
      subtle: '#D0D5DD',
    },
    'text-brand': {
      primary: '#2D4C5C',
      secondry: '#4E7384',
      tertiary: {
        DEFAULT: '#5E8697',
        alt: '#6E9AAA',
      },
    },
    'text-error-primary': '#D92D20',
    'text-warning-primary': '#DC6804',
    'text-success-primary': '#2F9454',
  },
  fontSize: {
    'display-2xl': [
      '7.5rem',
      {
        lineHeight: '1.1',
      },
    ],
    'display-lg': [
      '5.625rem',
      {
        lineHeight: '1.1',
      },
    ],
    'display-md': [
      '4rem',
      {
        lineHeight: '1.1',
      },
    ],
    'display-sm': [
      '3rem',
      {
        lineHeight: '1.1',
      },
    ],
    'heading-2xl': [
      '2.25rem',
      {
        lineHeight: '1.2',
      },
    ],
    'heading-xl': [
      '1.875rem',
      {
        lineHeight: '1.2',
      },
    ],
    'heading-lg': [
      '1.5rem',
      {
        lineHeight: '1.2',
      },
    ],
    'heading-md': [
      '1.25rem',
      {
        lineHeight: '1.2',
      },
    ],
    'heading-sm': [
      '1.125rem',
      {
        lineHeight: '1.2',
      },
    ],
    'heading-xs': [
      '1rem',
      {
        lineHeight: '1.2',
      },
    ],
    'text-2xl': [
      '1.25rem',
      {
        lineHeight: '1.5',
      },
    ],
    'text-xl': [
      '1.125rem',
      {
        lineHeight: '1.5',
      },
    ],
    'text-lg': [
      '1rem',
      {
        lineHeight: '1.5',
      },
    ],
    'text-md': [
      '0.875rem',
      {
        lineHeight: '1.5',
      },
    ],
    'text-sm': [
      '0.75rem',
      {
        lineHeight: '1.5',
      },
    ],
    'text-xs': [
      '0.625rem',
      {
        lineHeight: '1.5',
      },
    ],
    'text-2xs': [
      '0.5rem',
      {
        lineHeight: '1.5',
      },
    ],
    'paragraph-2xl': [
      '1.25rem',
      {
        lineHeight: '1.6',
      },
    ],
    'paragraph-xl': [
      '1.125rem',
      {
        lineHeight: '1.6',
      },
    ],
    'paragraph-lg': [
      '1rem',
      {
        lineHeight: '1.6',
      },
    ],
    'paragraph-md': [
      '0.875rem',
      {
        lineHeight: '1.6',
      },
    ],
    'paragraph-sm': [
      '0.75rem',
      {
        lineHeight: '1.6',
      },
    ],
    'paragraph-xs': [
      '0.625rem',
      {
        lineHeight: '1.6',
      },
    ],
    'label-2xl': [
      '1.125rem',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-xl': [
      '1rem',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-lg': [
      '0.875rem',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-md': [
      '0.75rem',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-sm': [
      '0.625rem',
      {
        fontWeight: '800',
        lineHeight: '1.4',
      },
    ],
    'label-xs': [
      '0.5rem',
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
    sora: [
      'Sora Variable',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Arial',
      'sans-serif',
    ],
    inter: ['Inter Variable', 'system-ui', 'sans-serif'],
  },

  screens: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '2k': '2048px',
    '4k': '3840px',
  },
  maxWidth: {
    '2k': '2048px',
    '4k': '3840px',
  },
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a5f',
          light: '#2a4f7f',
          dark: '#152a45',
        },
        accent: {
          DEFAULT: '#22c55e',
          light: '#4ade80',
          dark: '#16a34a',
        },
        orange: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
        },
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f8fafc',
        },
        text: {
          DEFAULT: '#1e293b',
          light: '#64748b',
          lighter: '#94a3b8',
        },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'section': ['36px', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}

export default config

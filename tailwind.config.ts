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
          DEFAULT: '#0f766e',   // teal
          light: '#14b8a6',     // teal-400
          dark: '#0d5e57',      // teal-800
        },
        accent: {
          DEFAULT: '#eab308',   // gold
          light: '#fde047',     // gold-300
          dark: '#ca8a04',      // gold-600
        },
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f0fdfa', // teal-50
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

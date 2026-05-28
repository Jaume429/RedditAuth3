import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F5F0E8',
        ink: '#191512',
        muted: '#6D6258',
        line: '#DED4C8',
        clay: '#B35C3E',
        moss: '#536B4F',
        butter: '#F2C871'
      },
      fontFamily: {
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 60px rgba(45, 35, 25, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;

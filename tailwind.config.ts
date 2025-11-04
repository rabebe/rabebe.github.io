import type { Config } from 'tailwindcss';

const config: Config = {
  // Define which directories Tailwind should scan for utility classes (e.g., 'flex', 'p-4')
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          '500': '#4f46e5',
        },
      }
    },
  },
  plugins: [],
};

export default config;
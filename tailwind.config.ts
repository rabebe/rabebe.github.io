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
      // You can define custom colors, fonts, or spacing here
      fontFamily: {
        // Sets 'Inter' as the default sans-serif font
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          '500': '#4f46e5', // A nice indigo/violet color for accents
        },
      }
    },
  },
  plugins: [],
};

export default config;
import tailwindConfig from 'tailwindcss/stubs/tailwind.config';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/content/**/*.{md,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [{ pattern: /^swiper-/ }],
  darkMode: 'class',

  theme: {
    screens: {
      sm: '540px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: tailwindConfig,
  },
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-bootstrap-grid')({
      generateContainer: false,
      gridGutterWidth: '2rem',
      gridGutters: {
        1: '0.25rem',
        2: '0.5rem',
        3: '1rem',
        4: '1.5rem',
        5: '3rem',
      },
    }),
    require('daisyui'),
  ],
};

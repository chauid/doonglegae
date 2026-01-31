import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    extend: {
      fontFamily: {
        layout: ['Noto Sans KR', 'IBM Plex Sans KR', 'sans-serif'],
        sans: [...fontFamily.sans],
      },
    },
  },
};

export default config;

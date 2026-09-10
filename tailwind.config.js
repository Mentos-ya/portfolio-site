/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#666666',
        // Палитра «ночной» темы
        night: {
          DEFAULT: '#0b0b14',
          card: '#12121c',
          line: '#23233a',
          edge: '#2a2a3a',
          ring: '#3a3a4d',
        },
        soft: '#c4c4cc',
      },
    },
  },
  plugins: [],
}

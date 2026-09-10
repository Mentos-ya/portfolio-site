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
        // Палитра «печать»: кремовая бумага, тёмно-синие чернила, электрический синий из растра фона
        paper: {
          DEFAULT: '#f7f0db',
          card: '#fffaf0',
        },
        ink: '#0f1440',
        electric: '#1f33ff',
      },
      // Весь текст жирный: у шрифта сайта (JetBrains Mono) подключены только 700 и 800,
      // поэтому все классы начертаний сдвинуты вверх — тонкий и обычный = 700, выделенный = 800
      fontWeight: {
        light: '700',
        normal: '700',
        medium: '700',
        semibold: '800',
        bold: '800',
        extrabold: '800',
      },
    },
  },
  plugins: [],
}

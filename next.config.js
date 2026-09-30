/** @type {import('next').NextConfig} */

// STATIC_EXPORT=1 — сборка статической копии для Яндекс Облака (папка out/).
// Без переменной — обычная сборка для Vercel.
const isStatic = process.env.STATIC_EXPORT === '1'

const nextConfig = isStatic
  ? {
      reactStrictMode: true,
      output: 'export',
      // Каждая страница — папка с index.html: так бакет отдаёт /projects/letoplace/
      trailingSlash: true,
      // В бакете нет сервера, который сжимает картинки
      images: { unoptimized: true },
    }
  : {
      reactStrictMode: true,
      async rewrites() {
        return [
          { source: '/apple-touch-icon.png', destination: '/images/profile.jpg' },
          { source: '/apple-touch-icon-precomposed.png', destination: '/images/profile.jpg' },
        ]
      },
    }

module.exports = nextConfig

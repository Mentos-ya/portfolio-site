/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/apple-touch-icon.png', destination: '/images/profile.jpg' },
      { source: '/apple-touch-icon-precomposed.png', destination: '/images/profile.jpg' },
    ]
  },
}

module.exports = nextConfig

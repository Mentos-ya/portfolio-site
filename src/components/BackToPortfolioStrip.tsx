'use client'

import Link from 'next/link'

export default function BackToPortfolioStrip() {
  return (
    <Link
      href="/#projects"
      className="fixed left-0 top-0 bottom-0 z-30 w-[max(5rem,calc(50vw-28rem))] flex items-center justify-center bg-transparent hover:bg-gray-200/90 transition-colors duration-200 group"
      aria-label="На главную страницу портфолио"
    >
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-600 group-hover:text-gray-800 text-3xl font-light">
        ←
      </span>
    </Link>
  )
}

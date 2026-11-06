'use client'

import { useEffect, useState } from 'react'

// Кнопка «наверх» в правом нижнем углу (просьба Ильи 06.11.2026): появляется, когда прокрутил
// больше одного экрана вниз, и плавно возвращает к началу страницы. Вид — как у листов: квадрат
// с рамкой чернилами и жёсткой тенью, при наведении синеет. Нажатия считает Метрика (цель click_button)
const SHOW_AFTER = 0.8 // доля высоты экрана, после которой кнопка появляется

export default function ScrollToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const check = () => setShown(window.scrollY > window.innerHeight * SHOW_AFTER)
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Наверх"
      title="Наверх"
      tabIndex={shown ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed z-30 right-4 bottom-4 md:right-6 md:bottom-6 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-none border-2 border-ink bg-paper text-ink shadow-[4px_4px_0_#0f1440] hover:bg-electric hover:border-electric hover:text-paper hover:shadow-[4px_4px_0_#1f33ff] transition-[opacity,transform,background-color,color] duration-200 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M9 15V3M9 3L3.5 8.5M9 3l5.5 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      </svg>
    </button>
  )
}

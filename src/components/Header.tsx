'use client'

import { useEffect, useRef, useState } from 'react'

// Разделы сайта — одни и те же в строке меню на компьютере и в выпадающем меню на телефоне
const links = [
  { href: '/#projects', label: 'Опыт' },
  { href: '/#ai', label: 'ИИ-проекты' },
  { href: '/#skills', label: 'Навыки' },
  { href: '/#contact', label: 'Контакты' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Открытое меню закрывается по Esc и по касанию мимо шапки
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    // Почти непрозрачная шапка: растр под ней не должен мутить фон
    <header ref={headerRef} className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-ink/10">
      <nav className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
        <a href="/" className="text-lg md:text-xl font-bold text-ink hover:text-electric transition">
          Портфолио
        </a>

        <ul className="hidden md:flex gap-7 text-[15px]">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-ink hover:text-electric transition">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* «Бутерброд» на телефоне: квадратная кнопка в рамке, три полоски превращаются в крестик */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`md:hidden -my-2 w-11 h-11 flex flex-col items-center justify-center gap-[5px] border-2 border-ink transition-colors ${
            open ? 'bg-ink text-paper' : 'text-ink'
          }`}
        >
          <span
            className={`block w-5 h-[2px] bg-current transition-transform duration-200 motion-reduce:transition-none ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span className={`block w-5 h-[2px] bg-current ${open ? 'opacity-0' : ''}`} />
          <span
            className={`block w-5 h-[2px] bg-current transition-transform duration-200 motion-reduce:transition-none ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Выпадающее меню на телефоне — поверх страницы, ничего не сдвигает */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="md:hidden absolute left-0 right-0 top-full bg-paper border-b border-ink/15 shadow-[0_12px_24px_rgba(15,20,64,0.12)]"
      >
        <ul className="max-w-5xl mx-auto px-6 py-2">
          {links.map((link) => (
            <li key={link.href} className="border-b border-ink/10 last:border-b-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center min-h-[52px] text-lg text-ink hover:text-electric"
              >
                <span className="text-electric mr-2" aria-hidden>
                  &gt;
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

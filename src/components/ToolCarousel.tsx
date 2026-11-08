'use client'

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

// Лента карточек «Сделал для себя» (вариант «Лента», выбрал Илья 08.11.2026): карточки в один ряд
// с прилипанием, листают стрелками, точками, пальцем или колесом; справа выглядывает край следующей.
// Карточки рисует сервер (AiProjects), здесь — только прокрутка, счётчик и кнопки.
// Подписи кнопок (aria-label) уходят в Метрику как название нажатой кнопки.
export default function ToolCarousel({ labels, children }: { labels: string[]; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const count = Children.count(children)

  // Шаг ленты — ширина карточки плюс зазор между карточками
  const step = useCallback(() => {
    const el = track.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return 1
    return first.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)
  }, [])

  // Какая карточка сейчас первая. Последние карточки не могут встать к левому краю —
  // поэтому в самом конце ленты считаем, что показана последняя
  const sync = useCallback(() => {
    const el = track.current
    if (!el) return
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4
    setCurrent(atEnd ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / step())))
  }, [count, step])

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const target = Math.max(0, Math.min(count - 1, i))
    el.scrollTo({ left: target === count - 1 ? el.scrollWidth : target * step(), behavior: 'smooth' })
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const arrow =
    'grid h-11 w-11 place-items-center border-2 border-ink text-lg text-ink transition-colors hover:bg-ink hover:text-paper active:scale-95 disabled:pointer-events-none disabled:opacity-30'

  return (
    // min-w-0: лента лежит в сетке, и без него ячейка растягивается на всю длину ленты — страница становится шире экрана
    <div className="min-w-0">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-sm tracking-[0.04em] text-ink" aria-live="polite">
          <span className="text-electric">{pad(current + 1)}</span> / {pad(count)}
        </span>
        <div className="flex gap-2">
          <button type="button" className={arrow} aria-label="Лента: назад" disabled={current === 0} onClick={() => go(current - 1)}>
            ←
          </button>
          <button type="button" className={arrow} aria-label="Лента: дальше" disabled={current === count - 1} onClick={() => go(current + 1)}>
            →
          </button>
        </div>
      </div>

      {/* Лента доходит до правого края листа (за его внутренний отступ, но не на рамку), чтобы следующая
          карточка выглядывала из-под края. Полоса прокрутки скрыта: листают стрелками, точками и пальцем */}
      <div
        ref={track}
        tabIndex={0}
        aria-label="Инструменты, которые я сделал для себя"
        className="grid grid-flow-col auto-cols-[86%] gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory -mr-[22px] pr-[22px] md:auto-cols-[min(72%,660px)] md:gap-5 md:-mr-[38px] md:pr-[38px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:snap-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
      >
        {children}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={`Лента: ${label}`}
            aria-current={i === current ? 'true' : undefined}
            onClick={() => go(i)}
            // Полоска тонкая, а зона нажатия — выше на 12 px сверху и снизу, чтобы попадать пальцем
            className={`relative h-1.5 transition-all duration-300 before:absolute before:inset-x-0 before:-inset-y-3 before:content-[''] ${i === current ? 'w-[38px] bg-electric' : 'w-[22px] bg-ink/20 hover:bg-ink/40'}`}
          />
        ))}
      </div>
    </div>
  )
}

'use client'

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

// Лента карточек «Сделал для себя» (вариант «Лента», выбрал Илья 08.11.2026): карточки в один ряд
// с прилипанием, листают стрелками, точками, пальцем или колесом; справа выглядывает край следующей.
// Один жест — ровно одна карточка (Илья 09.11.2026): сильный свайп или рывок тачпада раньше
// пролетал сразу несколько. CSS snap-always этого не гарантирует — Safari на рывке тачпада его
// не слушает (проверено: улетало на 6-ю и 9-ю), поэтому жесты тачпада и колеса ведёт скрипт.
// Карточки рисует сервер (AiProjects), здесь — только прокрутка, счётчик и кнопки.
// Подписи кнопок (aria-label) уходят в Метрику как название нажатой кнопки.
export default function ToolCarousel({ labels, children }: { labels: string[]; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  // Та же карточка, но для обработчиков жестов: им нужно свежее значение без пересоздания
  const currentRef = useRef(0)
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
    const index = atEnd ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / step()))
    currentRef.current = index
    setCurrent(index)
  }, [count, step])

  const go = useCallback(
    (i: number) => {
      const el = track.current
      if (!el) return
      const target = Math.max(0, Math.min(count - 1, i))
      el.scrollTo({ left: target === count - 1 ? el.scrollWidth : target * step(), behavior: 'smooth' })
    },
    [count, step],
  )

  useEffect(() => {
    const el = track.current
    if (!el) return

    // Тачпад и колесо: первый толчок жеста сдвигает ленту на одну карточку, остальные события
    // этого жеста (у тачпада после пальца ещё долго идёт инерция) гасим, пока не стихнут на 220 мс.
    // Новый жест поверх затухающей инерции узнаём по резкому росту толчка
    let locked = false
    let lockedAt = 0
    let lastPush = 0
    let quiet: number | undefined
    const onWheel = (e: WheelEvent) => {
      const push = Math.abs(e.deltaX)
      if (push <= Math.abs(e.deltaY)) return // вертикальная прокрутка — это страница, не лента
      e.preventDefault()
      window.clearTimeout(quiet)
      quiet = window.setTimeout(() => (locked = false), 220)
      const now = performance.now()
      const freshGesture = locked && now - lockedAt > 350 && push > 20 && push > lastPush * 2
      lastPush = push
      if ((locked && !freshGesture) || push < 4) return
      locked = true
      lockedAt = now
      go(currentRef.current + Math.sign(e.deltaX))
    }

    // Палец: прокрутку ведёт сам браузер (с прилипанием и snap-always), а если он всё же
    // пролетел дальше соседней карточки — когда лента остановилась, возвращаем на соседнюю
    let fromIndex: number | null = null
    let touching = false
    let settle: number | undefined
    const onTouchStart = () => {
      touching = true
      fromIndex = currentRef.current
    }
    const onTouchEnd = () => {
      touching = false
    }
    const onScroll = () => {
      sync()
      if (touching || fromIndex === null) return
      window.clearTimeout(settle)
      settle = window.setTimeout(() => {
        if (fromIndex === null) return
        const moved = currentRef.current - fromIndex
        if (Math.abs(moved) > 1) go(fromIndex + Math.sign(moved))
        fromIndex = null
      }, 140)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.clearTimeout(quiet)
      window.clearTimeout(settle)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', sync)
    }
  }, [sync, go])

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
        className="grid grid-flow-col auto-cols-[86%] gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory -mr-[22px] pr-[22px] md:auto-cols-[min(72%,660px)] md:gap-5 md:-mr-[38px] md:pr-[38px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:snap-start [&>*]:snap-always focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
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

'use client'

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createWheelSwipe } from './wheelSwipe'

// Лента карточек «Сделал для себя» (вариант «Лента», выбрал Илья 08.11.2026): карточки в один ряд
// с прилипанием, листают стрелками, точками, пальцем или колесом; справа выглядывает край следующей.
// Один жест — ровно одна карточка (Илья 09.11.2026): сильный свайп или рывок тачпада раньше
// пролетал сразу несколько. CSS snap-always этого не гарантирует — Safari на рывке тачпада его
// не слушает (проверено: улетало на 6-ю и 9-ю), поэтому жесты тачпада и колеса ведёт скрипт:
// что считать одним жестом, решает wheelSwipe.ts (там же — почему лента раньше застревала).
// Карточки рисует сервер (AiProjects), здесь — только прокрутка, счётчик и кнопки.
// Подписи кнопок (aria-label) уходят в Метрику как название нажатой кнопки.
export default function ToolCarousel({ labels, children }: { labels: string[]; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  // Та же карточка, но для обработчиков жестов: им нужно свежее значение без пересоздания
  const currentRef = useRef(0)
  // Карточка, к которой лента сейчас едет. Следующий шаг считаем от неё: пока лента плавно
  // проезжает мимо карточек, «текущая» ещё старая, и быстрый второй свайп вёл туда же, куда первый
  const targetRef = useRef(0)
  // Таймер «лента остановилась»; go() его сбрасывает, чтобы он не затёр только что заданную цель
  const idle = useRef<number | undefined>(undefined)
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
      targetRef.current = target
      window.clearTimeout(idle.current)
      el.scrollTo({ left: target === count - 1 ? el.scrollWidth : target * step(), behavior: 'smooth' })
    },
    [count, step],
  )

  useEffect(() => {
    const el = track.current
    if (!el) return

    // Тачпад и колесо: один жест — одна карточка. Что считать одним жестом (инерция после пальца
    // или уже новый свайп поверх неё), решает wheelSwipe. Все толчки горизонтального жеста гасим —
    // иначе браузер сам сдвигает ленту на пару пикселей и сбивает её плавный ход к карточке
    const swipe = createWheelSwipe()
    const onWheel = (e: WheelEvent) => {
      // Колесо мыши в Firefox считает строками или страницами — переводим в пиксели
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1
      const { prevent, step } = swipe(e.deltaX * unit, e.deltaY * unit, e.timeStamp)
      if (prevent) e.preventDefault()
      if (step) go(targetRef.current + step)
    }

    // Палец: прокрутку ведёт сам браузер (с прилипанием и snap-always), а если он всё же
    // пролетел дальше соседней карточки — когда лента остановилась, возвращаем на соседнюю
    let fromIndex: number | null = null
    let touching = false
    const onTouchStart = () => {
      touching = true
      fromIndex = currentRef.current
    }
    // Лента остановилась на 140 мс: если палец пролетел дальше соседней — возвращаем на соседнюю,
    // иначе запоминаем, что цель там, где лента стоит (её мог сдвинуть палец, клавиши или прилипание)
    const settle = () => {
      window.clearTimeout(idle.current)
      idle.current = window.setTimeout(() => {
        if (touching) return
        const from = fromIndex
        fromIndex = null
        const moved = from === null ? 0 : currentRef.current - from
        if (from !== null && Math.abs(moved) > 1) go(from + Math.sign(moved))
        else targetRef.current = currentRef.current
      }, 140)
    }
    const onTouchEnd = () => {
      touching = false
      settle()
    }
    const onScroll = () => {
      sync()
      settle()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.clearTimeout(idle.current)
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
          <button type="button" className={arrow} aria-label="Лента: назад" disabled={current === 0} onClick={() => go(targetRef.current - 1)}>
            ←
          </button>
          <button type="button" className={arrow} aria-label="Лента: дальше" disabled={current === count - 1} onClick={() => go(targetRef.current + 1)}>
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

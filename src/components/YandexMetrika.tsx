'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

// Номер счётчика Яндекс Метрики. Он публичный (виден в коде любой страницы), это не секрет.
// Счётчик «Портфолио Ильи Якупова» в личном аккаунте Binocole77. null — счётчик выключен
export const YM_ID: number | null = 112465200

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
  }
}

// Отправить цель в Метрику; без счётчика тихо ничего не делаем
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (YM_ID && typeof window !== 'undefined' && window.ym) window.ym(YM_ID, 'reachGoal', goal, params)
}

// Цель запуска ролика — по имени файла, чтобы видеть, какой проект цепляет
const VIDEO_GOALS: [string, string][] = [
  ['mentask', 'play_mentask'],
  ['korotkoe', 'play_ponyatno'],
  ['letoplace', 'play_letoplace'],
]

// Разделы, до которых долистал посетитель: где бросают страницу
const SECTION_GOALS: [string, string][] = [
  ['ai', 'reach_ai'],
  ['contact', 'reach_contacts'],
]

// Название кнопки для отчёта: подпись для экранного диктора, иначе видимый текст
function buttonLabel(el: HTMLElement): string {
  const text = el.getAttribute('aria-label') || el.textContent || el.getAttribute('href') || ''
  return text.replace(/\s+/g, ' ').trim().slice(0, 60) || 'без подписи'
}

// Какая цель у клика: явный data-goal или тип ссылки по её адресу
function goalFor(el: HTMLElement): string | null {
  if (el.dataset.goal) return el.dataset.goal
  const href = el.getAttribute('href') || ''
  if (href.includes('t.me/')) return 'click_telegram'
  if (href.includes('linkedin.com')) return 'click_linkedin'
  if (href.startsWith('mailto:')) return 'click_email'
  if (href.includes('drive.google.com')) return 'open_resume'
  if (href.startsWith('/projects/')) return 'open_project'
  return null
}

export default function YandexMetrika() {
  const pathname = usePathname()
  const isFirst = useRef(true)

  // Переход между страницами без перезагрузки — считаем отдельным просмотром
  useEffect(() => {
    if (!YM_ID) return
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    window.ym?.(YM_ID, 'hit', window.location.href)
  }, [pathname])

  // Цели по клику: сначала явный data-goal, иначе узнаём цель по адресу ссылки.
  // Плюс любая кнопка или ссылка — общая цель click_button с названием и страницей
  useEffect(() => {
    if (!YM_ID) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const el = target?.closest<HTMLElement>('[data-goal], a[href]')
      const goal = el ? goalFor(el) : null
      if (goal) reachGoal(goal)
      const btn = target?.closest<HTMLElement>('a[href], button')
      if (btn) reachGoal('click_button', { Кнопки: { [buttonLabel(btn)]: window.location.pathname } })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // Запуск ролика: событие play не всплывает, поэтому ловим на погружении; один раз на ролик
  useEffect(() => {
    if (!YM_ID) return
    const sent = new Set<string>()
    const onPlay = (e: Event) => {
      const video = e.target as HTMLVideoElement
      if (!(video instanceof HTMLVideoElement)) return
      const src = video.currentSrc || video.querySelector('source')?.src || ''
      const goal = VIDEO_GOALS.find(([key]) => src.includes(key))?.[1]
      if (goal && !sent.has(goal)) {
        sent.add(goal)
        reachGoal(goal)
      }
    }
    document.addEventListener('play', onPlay, true)
    return () => document.removeEventListener('play', onPlay, true)
  }, [])

  // Долистал до раздела: его верх поднялся выше 60% высоты экрана.
  // Долю раздела не берём — длинный раздел на телефоне целиком не влезает
  useEffect(() => {
    if (!YM_ID) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const goal = SECTION_GOALS.find(([id]) => id === entry.target.id)?.[1]
          if (goal) reachGoal(goal)
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -40% 0px' },
    )
    SECTION_GOALS.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  if (!YM_ID) return null

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">{`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${YM_ID}, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
      `}</Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
    </>
  )
}

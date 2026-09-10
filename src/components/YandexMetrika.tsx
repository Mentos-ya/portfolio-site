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
export function reachGoal(goal: string) {
  if (YM_ID && typeof window !== 'undefined' && window.ym) window.ym(YM_ID, 'reachGoal', goal)
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

  // Цели по клику: сначала явный data-goal, иначе узнаём цель по адресу ссылки
  useEffect(() => {
    if (!YM_ID) return
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-goal], a[href]')
      const goal = el ? goalFor(el) : null
      if (goal) reachGoal(goal)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

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

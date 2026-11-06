'use client'

import { useEffect } from 'react'

// Подсветка блока после перехода по ссылке-якорю: меню, «Смотреть проекты», точки «Моего пути».
// Когда прокрутка остановилась, рамка и тень листа на миг становятся синими и гаснут — видно,
// куда привела ссылка (просьба Ильи 06.11.2026). Вид подсветки — класс .anchor-hit в globals.css.
const STILL_FRAMES = 8 // столько кадров подряд страница не двигается — прокрутка закончилась
const MAX_FRAMES = 120 // но ждём не дольше ~2 секунд

export default function AnchorHighlight() {
  useEffect(() => {
    let lastId = ''
    let lastAt = 0

    const flash = (rawId: string) => {
      const id = decodeURIComponent(rawId)
      const el = id && document.getElementById(id)
      if (!el) return
      // щелчок и смена адреса приходят от одного перехода — подсвечиваем один раз
      const now = Date.now()
      if (id === lastId && now - lastAt < 400) return
      lastId = id
      lastAt = now

      let prev = window.scrollY
      let still = 0
      let frames = 0
      const tick = () => {
        frames += 1
        if (window.scrollY === prev) still += 1
        else {
          still = 0
          prev = window.scrollY
        }
        if (still < STILL_FRAMES && frames < MAX_FRAMES) {
          requestAnimationFrame(tick)
          return
        }
        el.classList.remove('anchor-hit')
        void el.offsetWidth // перезапуск анимации, если щёлкнули второй раз подряд
        el.classList.add('anchor-hit')
      }
      requestAnimationFrame(tick)
    }

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
      if (!link) return
      const url = new URL(link.href, window.location.href)
      if (url.pathname !== window.location.pathname || url.hash.length < 2) return
      flash(url.hash.slice(1))
    }
    const onHash = () => {
      if (window.location.hash.length > 1) flash(window.location.hash.slice(1))
    }
    const onEnd = (e: AnimationEvent) => {
      if (e.animationName.startsWith('anchor-hit')) {
        ;(e.target as Element).closest('.anchor-hit')?.classList.remove('anchor-hit')
      }
    }

    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHash)
    document.addEventListener('animationend', onEnd)
    // пришли по ссылке с другой страницы («/#ai» со страницы кейса) — подсветить после загрузки
    onHash()
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('animationend', onEnd)
    }
  }, [])

  return null
}

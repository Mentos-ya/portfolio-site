'use client'

import { useEffect, useRef } from 'react'

// Ролик инструмента на месте снимка экрана (Илья 09.11.2026, вечер: «ролики должны быть вместо картинок»;
// до этого ролик запускался кнопкой «> ролик 0:18»). Играет сам, без звука (его в роликах нет) и по кругу,
// пока карточка видна в ленте хотя бы на 60%; уехала за край ленты больше чем наполовину — пауза.
// Наблюдатель учитывает обрезку лентой, поэтому выглядывающая соседняя карточка стоит на паузе.
// До первого показа ролик не грузится (preload="none"): виден снимок экрана, соседние карточки не тянут мегабайты.
export default function ToolClip({ image, imageAlt, clip }: { image: string; imageAlt: string; clip: string }) {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    if (!v) return
    v.muted = true // без этого браузеры не дают ролику запуститься самому
    const io = new IntersectionObserver(
      ([entry]) => {
        // В режиме энергосбережения автозапуск запрещён — тогда так и остаётся снимок
        if (entry.intersectionRatio >= 0.6) v.play().catch(() => {})
        else if (entry.intersectionRatio < 0.5) v.pause()
      },
      { threshold: [0, 0.5, 0.6, 1] },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden border border-ink/15 bg-paper">
      <video
        ref={video}
        src={clip}
        poster={image}
        muted
        loop
        playsInline
        preload="none"
        aria-label={imageAlt}
        className="h-full w-full object-cover object-top"
      />
    </div>
  )
}

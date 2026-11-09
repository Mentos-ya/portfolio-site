'use client'

import { useEffect, useRef, useState } from 'react'

// Снимок экрана инструмента с кнопкой «> ролик 0:18» (Илья 09.11.2026: ролик — «по кнопке, как у Mentask»).
// До нажатия ролик не грузится; после — играет прямо в карточке, с плеером, без звука (его в роликах нет).
// Пролистали карточку из ленты — ролик встаёт на паузу.
// Подпись кнопки «Ролик: …» уходит в Метрику общей целью click_button — отдельные цели под ролики не нужны.
export default function ToolClip({
  title,
  image,
  imageAlt,
  clip,
  seconds,
}: {
  title: string
  image: string
  imageAlt: string
  clip: string
  seconds: number
}) {
  const [playing, setPlaying] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = box.current
    if (!playing || !el) return
    // Наблюдатель учитывает обрезку лентой: карточка уехала за край ленты больше чем наполовину — пауза
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.5) video.current?.pause()
      },
      { threshold: [0, 0.5] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [playing])

  return (
    <div ref={box} className="relative mb-4 aspect-[16/10] w-full overflow-hidden border border-ink/15 bg-paper">
      {playing ? (
        <video
          ref={video}
          src={clip}
          poster={image}
          autoPlay
          controls
          playsInline
          muted
          aria-label={imageAlt}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <img
            src={image}
            alt={imageAlt}
            width={960}
            height={600}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
          <button
            type="button"
            aria-label={`Ролик: ${title}`}
            onClick={() => setPlaying(true)}
            className="btn btn-primary absolute bottom-2.5 left-2.5 min-h-[40px] px-3 text-[13px] md:bottom-3 md:left-3"
          >
            ролик 0:{String(seconds).padStart(2, '0')}
          </button>
        </>
      )}
    </div>
  )
}

'use client'

import Link from 'next/link'

interface ProjectCardProps {
  id: number
  isSelected?: boolean
  onClick?: () => void
  href?: string
  title?: string
  role?: string
  emoji?: string
  metrics?: string[]
  description?: string
  /** Фрагмент в конце описания, который не переносить на новую строку (например, «(vs ~25% по рынку).») */
  descriptionNoWrapSuffix?: string
  logo?: string
  video?: string
  videoPoster?: string
  /** Зелёная метка «● Сейчас» над заголовком — для текущего места работы */
  now?: boolean
}

export default function ProjectCard({
  id: _id,
  isSelected = false,
  onClick,
  href,
  title,
  role,
  emoji: _emoji = '📦',
  metrics = [],
  description,
  descriptionNoWrapSuffix,
  logo,
  video: _video,
  videoPoster,
  now,
}: ProjectCardProps) {
  const hasData = title || role || metrics.length > 0
  const clickable = Boolean(href || onClick)

  const cardContent = (
    <>
      {now && (
        <span className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-green-500 border border-[#1f3d2b] bg-[#0f1f16] px-2.5 py-1 rounded-full mb-3">
          ● Сейчас
        </span>
      )}

      {/* Logo — на белой подложке, чтобы тёмные логотипы читались на тёмном фоне */}
      {logo && (
        <div className="mb-4">
          <img src={logo} alt={title || 'Company logo'} className="h-10 w-auto object-contain rounded-md bg-white" />
        </div>
      )}

      {/* Title and Role — на мобильной время работы (после " | ") с новой строки */}
      <div className="mb-3">
        {title && <h3 className="text-2xl font-bold tracking-[-0.01em] text-white">{title}</h3>}
        {role && (
          <p className="text-[13px] text-zinc-400 mt-1">
            {role.includes('|') ? (() => {
              const parts = role.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean)
              const [first, ...rest] = parts
              return (
                <>
                  <span className="block md:inline">{first}</span>
                  {rest.length > 0 && (
                    <>
                      <span className="hidden md:inline"> · </span>
                      <span className="block md:inline">{rest.join(' · ')}</span>
                    </>
                  )}
                </>
              )
            })() : role}
          </p>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="mb-4 text-sm text-zinc-300 leading-relaxed">
          <p>
            {descriptionNoWrapSuffix != null
              ? <>
                  {description}
                  <span className="whitespace-nowrap">{descriptionNoWrapSuffix}</span>
                </>
              : description}
          </p>
        </div>
      )}

      {/* Metrics */}
      {metrics.length > 0 && (
        <div className="space-y-2">
          {metrics.map((metric, idx) => (
            <div key={idx} className="text-xs text-zinc-300 leading-relaxed">
              • {metric}
            </div>
          ))}
        </div>
      )}

      {/* Video Thumbnail — прижат к низу карточки, чтобы превью были на одном уровне */}
      {videoPoster && (
        <div className="mt-auto pt-4 rounded-xl overflow-hidden relative aspect-video w-full bg-night-card">
          <img
            src={videoPoster}
            alt="Video preview"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Hover overlay for linked cards */}
      {href && hasData && (
        <div className="absolute inset-0 hidden md:flex bg-black/60 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center pointer-events-none">
          <span className="text-white text-lg font-semibold">Узнать подробнее →</span>
        </div>
      )}

      {/* Empty state */}
      {!hasData && (
        <div className="text-center text-zinc-400 flex items-center justify-center h-full">
          <p>Нажмите чтобы узнать больше</p>
        </div>
      )}
    </>
  )

  const cardClassName = `group relative card-glow rounded-[18px] p-6 md:p-[26px] flex flex-col overflow-hidden transition-[transform,box-shadow] duration-300 ${
    clickable ? 'cursor-pointer md:hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(168,85,247,0.18)]' : ''
  } ${isSelected ? 'ring-2 ring-purple-500' : ''}`

  // Если есть href — рендерим как Link
  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {cardContent}
      </Link>
    )
  }

  // Иначе — обычный div с onClick
  return (
    <div onClick={onClick} className={cardClassName}>
      {cardContent}
    </div>
  )
}

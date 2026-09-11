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
  /** Широкая карточка: на компьютере текст слева, превью видео справа */
  wide?: boolean
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
  wide,
}: ProjectCardProps) {
  const hasData = title || role || metrics.length > 0
  const clickable = Boolean(href || onClick)

  // Текст карточки: метка, логотип, заголовок с ролью, описание, метрики
  const info = (
    <>
      {now && (
        <span className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-green-700 border border-green-700/25 bg-green-50 px-2.5 py-1 rounded-full mb-3">
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
        {title && <h3 className="text-2xl font-bold tracking-[-0.01em] text-ink">{title}</h3>}
        {role && (
          <p className="text-[13px] text-ink/60 mt-1">
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
        <div className="mb-4 text-base text-ink/75 leading-relaxed">
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
            <div key={idx} className="text-xs text-ink/75 leading-relaxed">
              • {metric}
            </div>
          ))}
        </div>
      )}
    </>
  )

  // Превью видео: в обычной карточке прижато к низу (превью соседних карточек на одном уровне),
  // в широкой — справа от текста
  const media = videoPoster && (
    <div
      className={`${wide ? 'mt-2 md:mt-0' : 'mt-auto pt-4'} rounded-xl overflow-hidden relative aspect-video w-full bg-paper-card`}
    >
      <img
        src={videoPoster}
        alt="Video preview"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg className="w-6 h-6 text-[#fff] ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  )

  const cardContent = (
    <>
      {wide ? <div className="flex flex-col">{info}</div> : info}
      {media}

      {/* Hover overlay for linked cards */}
      {href && hasData && (
        <div className="absolute inset-0 hidden md:flex bg-electric/90 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center pointer-events-none">
          <span className="text-[#fff] text-lg font-semibold">Узнать подробнее →</span>
        </div>
      )}

      {/* Empty state */}
      {!hasData && (
        <div className="text-center text-ink/60 flex items-center justify-center h-full">
          <p>Нажмите чтобы узнать больше</p>
        </div>
      )}
    </>
  )

  const cardClassName = `group relative card-glow rounded-[18px] p-6 md:p-[26px] flex flex-col ${
    wide ? 'md:grid md:grid-cols-[1fr_minmax(0,420px)] md:gap-8 md:items-center' : ''
  } overflow-hidden transition-[transform,box-shadow] duration-300 ${
    clickable ? 'cursor-pointer md:hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(31,51,255,0.15)]' : ''
  } ${isSelected ? 'ring-2 ring-electric' : ''}`

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

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
  /** Вертикальная градиентная полоска справа (розовый → фиолетовый → синий) */
  gradientStripe?: boolean
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
  gradientStripe,
}: ProjectCardProps) {
  const hasData = title || role || metrics.length > 0

  const cardContent = (
    <>
      {/* Logo */}
      {logo && (
        <div className="mb-4">
          <img src={logo} alt={title || 'Company logo'} className="h-12 object-contain" />
        </div>
      )}

      {/* Title and Role — на мобильной время работы (после " | ") с новой строки */}
      <div className="mb-4">
        {title && <h3 className="text-2xl font-bold text-gray-800">{title}</h3>}
        {role && (
          <p className="text-sm text-gray-500 mt-1">
            {role.includes('|') ? (() => {
              const parts = role.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean)
              const [first, ...rest] = parts
              return (
                <>
                  <span className="block md:inline">{first}</span>
                  {rest.length > 0 && (
                    <>
                      <span className="hidden md:inline"> | </span>
                      <span className="block md:inline">{rest.join(' | ')}</span>
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
        <div className="mb-4 text-sm text-gray-700 leading-relaxed">
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
            <div key={idx} className="text-xs text-gray-700 leading-relaxed">
              • {metric}
            </div>
          ))}
        </div>
      )}

      {/* Video Thumbnail — прижат к низу карточки, чтобы превью были на одном уровне */}
      {videoPoster && (
        <div className="mt-auto pt-4 rounded-lg overflow-hidden relative aspect-video w-full bg-gray-100">
          <img
            src={videoPoster}
            alt="Video preview"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
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
        <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="text-white text-lg font-semibold">Узнать подробнее →</span>
        </div>
      )}

      {/* Empty state */}
      {!hasData && (
        <div className="text-center text-gray-500 flex items-center justify-center h-full">
          <p>Нажмите чтобы узнать больше</p>
        </div>
      )}
    </>
  )

  const cardClassName = `group relative border-2 border-gray-300 rounded-lg p-6 cursor-pointer transition-all duration-300 flex flex-col overflow-hidden ${
    isSelected ? 'border-blue-600 bg-blue-50 shadow-lg' : 'hover:border-blue-400 hover:shadow-md bg-white'
  }`

  const stripe = gradientStripe ? (
    <div
      className="absolute right-0 top-0 bottom-0 w-2 rounded-r-lg shrink-0"
      style={{ background: 'linear-gradient(to bottom, #ec4899, #a855f7, #6366f1)' }}
      aria-hidden
    />
  ) : null

  // Если есть href — рендерим как Link
  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {stripe}
        {cardContent}
      </Link>
    )
  }

  // Иначе — обычный div с onClick
  return (
    <div onClick={onClick} className={cardClassName}>
      {stripe}
      {cardContent}
    </div>
  )
}

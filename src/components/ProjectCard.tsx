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

      {/* Title and Role */}
      <div className="mb-4">
        {title && <h3 className="text-2xl font-bold text-gray-800">{title}</h3>}
        {role && <p className="text-sm text-gray-500 mt-1">{role}</p>}
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

      {/* Video Thumbnail */}
      {videoPoster && (
        <div className="mt-4 rounded-lg overflow-hidden relative">
          <img src={videoPoster} alt="Video preview" className="w-full rounded-lg" />
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

  const cardClassName = `group relative border-2 border-gray-300 rounded-lg p-6 cursor-pointer transition-all duration-300 flex flex-col ${
    isSelected ? 'border-blue-600 bg-blue-50 shadow-lg' : 'hover:border-blue-400 hover:shadow-md bg-white'
  }`

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

'use client'

interface ProjectCardProps {
  id: number
  isSelected: boolean
  onClick: () => void
  title?: string
  role?: string
  emoji?: string
  metrics?: string[]
  description?: string
}

export default function ProjectCard({
  id,
  isSelected,
  onClick,
  title,
  role,
  emoji = '📦',
  metrics = [],
  description,
}: ProjectCardProps) {
  const hasData = title || role || metrics.length > 0

  return (
    <div
      onClick={onClick}
      className={`border-2 border-gray-300 rounded-lg p-6 min-h-[640px] cursor-pointer transition-all duration-300 flex flex-col overflow-y-auto ${
        isSelected ? 'border-blue-600 bg-blue-50 shadow-lg' : 'hover:border-blue-400 hover:shadow-md bg-white'
      }`}
    >
      {/* Title and Role */}
      <div className="mb-4">
        {title && <h3 className="text-2xl font-bold text-gray-800">{title}</h3>}
        {role && <p className="text-sm text-gray-500 mt-1">{role}</p>}
      </div>

      {/* Description */}
      {description && (
        <div className="mb-4 text-sm text-gray-700 leading-relaxed">
          <p>{description}</p>
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

      {/* Empty state */}
      {!hasData && (
        <div className="text-center text-gray-500 flex items-center justify-center h-full">
          <p>Нажмите чтобы узнать больше</p>
        </div>
      )}
    </div>
  )
}

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
      className={`border-2 border-gray-300 rounded-lg p-8 min-h-[640px] cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
        isSelected ? 'border-blue-600 bg-blue-50 shadow-lg' : 'hover:border-blue-400 hover:shadow-md bg-white'
      }`}
    >
      <div className="text-center flex-1 flex flex-col justify-center">
        <div className="text-6xl mb-4">{emoji}</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title || `Объект ${id + 1}`}</h3>
        {role && <p className="text-sm text-gray-500 mb-4">{role}</p>}
        <p className="text-gray-600 text-sm">
          {hasData && isSelected
            ? 'Нажмите еще раз чтобы скрыть детали'
            : hasData
              ? 'Нажмите чтобы узнать больше'
              : isSelected
                ? 'Нажмите еще раз чтобы скрыть'
                : 'Нажмите чтобы узнать больше'}
        </p>
      </div>

      {isSelected && hasData && (
        <div className="mt-6 pt-6 border-t border-gray-300 w-full text-sm text-gray-700 space-y-3">
          {description && <p className="text-center text-sm leading-relaxed">{description}</p>}

          {metrics.length > 0 && (
            <div className="space-y-2">
              {metrics.map((metric, idx) => (
                <div key={idx} className="text-center text-xs bg-gray-100 rounded py-1 px-2">
                  {metric}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

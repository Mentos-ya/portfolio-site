'use client'

interface ProjectCardProps {
  id: number
  isSelected: boolean
  onClick: () => void
}

export default function ProjectCard({ id, isSelected, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className={`border-2 border-gray-300 rounded-lg p-8 min-h-[640px] cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
        isSelected ? 'border-blue-600 bg-blue-50 shadow-lg' : 'hover:border-blue-400 hover:shadow-md bg-white'
      }`}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Объект {id + 1}</h3>
        <p className="text-gray-600">
          {isSelected ? 'Нажмите еще раз чтобы скрыть детали' : 'Нажмите чтобы узнать больше'}
        </p>
      </div>

      {isSelected && (
        <div className="mt-6 pt-6 border-t border-gray-300 w-full text-sm text-gray-700">
          <p className="text-center">Здесь будут детальная информация об объекте...</p>
        </div>
      )}
    </div>
  )
}

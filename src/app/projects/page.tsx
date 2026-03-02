import projectsData from '@/data/projects.json'

export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-4">{projectsData.pageTitle}</h1>
      <p className="text-xl text-gray-600 mb-12">
        {projectsData.pageDescription}
      </p>

      <div className="space-y-12">
        {/* LetoPlace */}
        <div className="border-b border-gray-200 pb-12 last:border-b-0">
          <h2 className="text-3xl font-bold mb-2">LetoPlace</h2>
          <p className="text-gray-500 mb-4">Product Manager & Growth PM | 2018 - Июнь 2025</p>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="font-bold mb-2">Описание</h3>
              <p className="text-gray-700">
                Построил и масштабировал digital marketplace для аренды, соединяющий владельцев объектов с путешественниками.
                Запущен в 3 городах с 50+ активными объектами, генерирующими 5M RUB ежемесячного дохода.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Ключевые метрики</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>5M RUB</strong> ежемесячный доход</li>
                <li>• <strong>50+</strong> активных объектов</li>
                <li>• <strong>31%</strong> маржа</li>
                <li>• <strong>+23%</strong> рост LTV</li>
              </ul>
            </div>
          </div>

          <h3 className="font-bold mb-2">Ответственность</h3>
          <ul className="text-gray-700 space-y-1 mb-6">
            <li>✓ Определил product vision и стратегию развития marketplace</li>
            <li>✓ Провел customer development интервью с 50+ владельцами объектов и путешественниками</li>
            <li>✓ Спроектировал и реализовал A/B тесты, результатом которых стал рост LTV на 23%</li>
            <li>✓ Управлял B2B партнерствами с компаниями property management</li>
            <li>✓ Построил и руководил remote командой разработчиков и дизайнеров</li>
            <li>✓ Интегрировал IoT системы и разработал Telegram bot для управления объектами</li>
            <li>✓ Настроил аналитику через Amplitude для анализа funnels и cohorts</li>
            <li>✓ Вырастил North Star Metric с 8% до 12% через оптимизацию продукта</li>
          </ul>

          <h3 className="font-bold mb-2">Tech Stack & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {['Lean Canvas', 'User Research', 'A/B Testing', 'Amplitude', 'Asana', 'Notion', 'amoCRM', 'API Integration', 'Telegram Bot', 'Funnel Analysis'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Other Experience */}
      <div className="mt-16 pt-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-8">Другой опыт</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold">Product Manager - HotelTech & TravelTech</h3>
            <p className="text-gray-500 text-sm">Различные проекты | 7+ лет опыта</p>
            <p className="text-gray-700 mt-2">
              Обширный опыт в отраслях hospitality и travel tech, разработка продуктов с 0-1 и масштабирование
              до миллионов в выручке. Экспертиза в marketplace dynamics, user onboarding и sustainable growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

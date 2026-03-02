import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Илья Якупов
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            Product Manager & Growth Leader
          </p>
          <p className="text-lg text-gray-500 max-w-2xl">
            7+ лет опыта в разработке и масштабировании цифровых продуктов в HotelTech и TravelTech.
            Увлечён user-centered дизайном, data-driven решениями и созданием продуктов, которые люди любят.
          </p>
        </div>

        <div className="flex gap-4 mb-16">
          <Link
            href="/projects"
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Смотреть проекты
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-black text-black rounded hover:bg-black hover:text-white transition"
          >
            Связаться со мной
          </Link>
        </div>
      </section>

      {/* Key Achievement */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Ключевое достижение</h2>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">LetoPlace</h3>
            <p className="text-gray-600 mb-6">
              Построил и масштабировал digital marketplace для аренды с нуля до 50+ активных объектов в 3 городах
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-black">5M</p>
                <p className="text-gray-600">Ежемесячный доход</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black">50+</p>
                <p className="text-gray-600">Объектов</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black">31%</p>
                <p className="text-gray-600">Маржа</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Улучшение ключевых метрик:</p>
              <ul className="text-gray-700 space-y-1">
                <li>✓ Вырос LTV на 23%</li>
                <li>✓ Увеличился North Star Metric с 8% до 12%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services / What I Do */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12">Чем я занимаюсь</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition">
            <h3 className="text-xl font-bold mb-3">Product Strategy</h3>
            <p className="text-gray-600">
              Разрабатываю ясные product roadmaps, определяю go-to-market стратегии и создаю lean canvases для валидации.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition">
            <h3 className="text-xl font-bold mb-3">User Research</h3>
            <p className="text-gray-600">
              Провожу глубокие customer development интервью и картирую user lifecycle для определения ключевых точек влияния.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition">
            <h3 className="text-xl font-bold mb-3">Data & Analytics</h3>
            <p className="text-gray-600">
              Дизайню experiments, анализирую funnels, провожу cohort analysis и принимаю решения на основе данных через Amplitude и GA.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition">
            <h3 className="text-xl font-bold mb-3">Growth & Scaling</h3>
            <p className="text-gray-600">
              Строю масштабируемые системы, управляю remote teams, интегрирую новые технологии и стимулирую рост бизнеса.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

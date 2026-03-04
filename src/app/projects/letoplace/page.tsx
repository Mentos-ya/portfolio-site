import Link from 'next/link'
import Image from 'next/image'
import projectsData from '@/data/projects.json'
import ImageCarousel from '@/components/ImageCarousel'

export default function LetoPlacePage() {
  const project = projectsData.projects[0]

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Кнопка назад */}
      <Link
        href="/#projects"
        className="inline-flex items-center text-gray-500 hover:text-black transition mb-10 group"
      >
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
        Назад к проектам
      </Link>

      {/* Шапка проекта */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/logos/letoplace-logo.png"
          alt="LetoPlace"
          width={48}
          height={48}
          className="h-12 w-auto object-contain"
        />
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">{project.name}</h1>
        </div>
      </div>
      <div className="flex flex-nowrap items-center justify-between gap-4 w-full mb-10 text-lg text-gray-500">
        <span className="shrink-0">{project.period.split(/\s*\|\s*/)[0]?.trim() ?? project.period}</span>
        <span className="shrink-0">{project.period.split(/\s*\|\s*/)[1]?.trim() ?? ''}</span>
      </div>

      {/* Описание */}
      <div className="mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          {project.description.split(/(digital-сервис аренды)/).map((segment, i) =>
            segment === 'digital-сервис аренды' ? (
              <span key={`desc-${i}`} className="relative inline-block group/link">
                <a href="https://letoplace.ru" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-2">
                  digital-сервис аренды
                </a>
                <span className="absolute left-0 top-full mt-1 px-2 py-1.5 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover/link:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                  https://letoplace.ru
                </span>
              </span>
            ) : (
              <span key={`desc-${i}`}>{segment}</span>
            )
          )}
        </p>
      </div>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {project.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center"
          >
            <div className="text-3xl font-bold text-black mb-1">{metric.value}</div>
            <div className="text-sm text-gray-500">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Зоны ответственности — 4 кнопки-якоря */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Зоны ответственности</h2>
        <div className="grid grid-cols-2 gap-3">
          <a href="#b2b-segment" className="px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 text-center font-medium transition">
            B2B-сегмент
          </a>
          <a href="#b2c-segment" className="px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 text-center font-medium transition">
            B2C-сегмент
          </a>
          <a href="#unit-economics" className="px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 text-center font-medium transition">
            Юнит-экономика
          </a>
          <a href="#automation" className="px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 text-center font-medium transition">
            Автоматизация процессов
          </a>
        </div>
      </div>

      {/* B2B-сегмент — текст над видео, под заголовком; буллеты + превью */}
      <div id="b2b-segment" className="mb-14 scroll-mt-28">
        <h2 className="text-2xl font-bold mb-6">B2B-сегмент</h2>
        <div className="space-y-3 text-gray-700 mb-6">
          <p className="leading-relaxed">
            <span className="relative inline-block group/link">
              <a href="https://letoplace.ru/cooperation" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-2">
                Работа с собственниками недвижимости
              </a>
              <span className="absolute left-0 top-full mt-1 px-2 py-1.5 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover/link:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                https://letoplace.ru/cooperation
              </span>
            </span>: долгосрочная аренда «под ключ», управление объектами, прозрачная отчётность по доходам и автоматизация процессов для масштабирования портфеля.
          </p>
        </div>
        <div className="group relative rounded-xl overflow-hidden shadow-lg mb-6">
          <video
            controls
            preload="metadata"
            poster="/videos/letoplace-poster.png"
            className="w-full"
          >
            <source src="/videos/letoplace.mp4" type="video/mp4" />
          </video>
          <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium text-sm pointer-events-none">
            Воспроизвести моушн-видео
          </span>
        </div>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-stretch">
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Разработал GTM-стратегию для B2B: через конкурентный анализ и глубинные интервью выявил ключевые боли собственников, с нуля создал оффер и моушн-видео для привлечения</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Увеличил портфель объектов в 3 раза за 3 года, выстроив sales-команду и реферальную программу</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Достиг 80% retention B2B-клиентов (vs 50% по рынку) благодаря системе прозрачной аналитики доходности</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Оптимизировал юнит-экономику B2B: +30% дохода к долгосрочной аренде через адаптивную модель аренды</span>
            </li>
          </ul>
          <a
            href="https://drive.google.com/file/d/1dCSAhc8Yd9RQJZmSFxgB_Sa_EJMH3Etk/view"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 relative flex w-[190px] h-full min-h-0 rounded-xl border-2 border-gray-200 hover:border-black overflow-hidden shadow-md hover:shadow-lg transition"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/letoplace-proposal-preview.png"
              alt="Предложение о сотрудничестве с LetoPlace"
              width={200}
              height="auto"
              className="block w-full h-full object-cover object-top"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium text-sm rounded-xl pointer-events-none">
              Открыть оффер
            </span>
          </a>
        </div>
      </div>

      {/* B2C-сегмент — буллеты слева, карусель справа */}
      <div id="b2c-segment" className="mb-14 scroll-mt-28">
        <h2 className="text-2xl font-bold mb-6">B2C-сегмент</h2>
        <div className="space-y-3 text-gray-700 mb-6">
          <p className="leading-relaxed">
            <span className="relative inline-block group/link">
              <a href="https://letoplace.ru" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-2">
                Работа с путешественниками
              </a>
              <span className="absolute left-0 top-full mt-1 px-2 py-1.5 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover/link:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                https://letoplace.ru
              </span>
            </span>: краткосрочная аренда, удобный поиск и бронирование, качество размещения и сервиса для гостей, оптимизация загрузки и ценообразования.
          </p>
        </div>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Вел customer development и user research: проводил глубинные интервью, собирал обратную связь, анализировал поведение; строил Customer Journey Map для выявления точек роста и барьеров конверсии</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Оптимизировал каждый этап AARRR через тестирование онбординга, бизнес модели</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Вырастил LTV на 23%, увеличив North Star Metric (повторные бронирования) с 8% до 12% через программу лояльности, персонализированные предложения и контроль качества на основе User Research</span>
            </li>
          </ul>
          <ImageCarousel
            slides={[
              { src: '/images/letoplace-b2c-merch-3.png', alt: 'Апартаменты LetoPlace — брендированная подушка и интерьер' },
              { src: '/images/letoplace-b2c-merch-1.png', alt: 'Мерч LetoPlace — кружка с логотипом' },
              { src: '/images/letoplace-b2c-merch-2.png', alt: 'Мерч LetoPlace — подушка с логотипом' },
            ]}
          />
        </div>
        <ul className="mt-3 space-y-3 text-gray-700 w-full">
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Снизил CAC на 15% и увеличил трафик сайта на 30% через интеграцию booking-системы и UX-оптимизацию, координируя работу дизайнеров и разработчиков</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Усилил узнаваемость бренда: разработал визуальную айдентику, внедрил брендированный инвентарь в квартирах (мерч, welcome-наборы)</span>
          </li>
        </ul>
      </div>

      {/* Юнит-экономика — над Автоматизацией процессов */}
      <div id="unit-economics" className="mb-14 scroll-mt-28">
        <h2 className="text-2xl font-bold mb-6">Юнит-экономика</h2>
        <div className="space-y-3 text-gray-700 mb-4">
          <p className="leading-relaxed">
            LTV, CAC, ARPU, payback period, маржинальность и контроль ключевых метрик для масштабирования и устойчивой экономики продукта.
          </p>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Отвечал за unit-экономику: рассчитывал payback period, margin, ARPU, LTV, CAC; перераспределял маркетинговый бюджет между каналами на основе ROI и прогнозов окупаемости инвестиций в привлечение</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Повысил ROI маркетинга на 12% за счёт оптимизации бюджета на основе когортного анализа и channel performance</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Поднял загрузку объектов с 75% до 91% (vs ~80% по рынку) за счет динамичного ценообразования</span>
          </li>
        </ul>
      </div>

      {/* Автоматизация процессов — буллеты слева, карусель справа */}
      <div id="automation" className="mb-14 scroll-mt-28">
        <h2 className="text-2xl font-bold mb-6">Автоматизация процессов</h2>
        <div className="space-y-3 text-gray-700 mb-6">
          <p className="leading-relaxed">
            Электронные замки, amoCRM, Telegram-боты, интеграции с букинг-системами и передача показаний счётчиков — снижение рутины и расходов на персонал при сохранении качества сервиса.
          </p>
        </div>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Уменьшил расходы на персонал на 15% за счёт внедрения системы электронных замков с автоматической генерацией кодов через amoCRM, обеспечив бесконтактный заезд гостей и снизив нагрузку на админов</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Сократил время ответа клиенту с 15 до 5 минут через автоматизацию коммуникаций, интеграцию с маркетплейсами и Telegram-бота</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Уменьшил на 20% время на операционные задачи персонала, на 30% — время онбординга сотрудников за счет системы в Asana + Notion с базой регламентов и дашборда метрик</span>
            </li>
          </ul>
          <ImageCarousel
            maxWidth={300}
            slides={[
              { src: '/images/letoplace-automation-1.png', alt: 'Воронка «Проживание» в amoCRM — этапы от брони до выезда' },
              { src: '/images/letoplace-automation-2.png', alt: 'Рабочий стол LetoPlace в amoCRM — KPI, задачи, роботы и триггеры' },
              { src: '/images/letoplace-automation-3.png', alt: 'Asana — проект «Ассистент» для задач по квартирам и операционке' },
            ]}
          />
        </div>
      </div>

      {/* Tech Stack & Tools */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Tech Stack & Tools</h2>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

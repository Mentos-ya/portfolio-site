import Link from 'next/link'
import Image from 'next/image'
import projectsData from '@/data/projects.json'
import ImageCarousel from '@/components/ImageCarousel'

export default function LetoPlacePage() {
  const project = projectsData.projects[0]

  return (
    <div className="sheet max-w-4xl">
      {/* Кнопка назад */}
      <Link
        href="/#projects"
        className="inline-flex items-center text-ink/60 hover:text-electric transition mb-10 group"
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
      <div className="flex flex-col md:flex-row md:flex-nowrap items-start md:items-center justify-between gap-y-0 gap-x-4 w-full mb-10 text-lg text-ink/60">
        <span className="shrink-0">
          {(() => {
            const titlePart = project.period.split(/\s*\|\s*/)[0]?.trim() ?? project.period
            const slashParts = titlePart.split(/\s*\/\s*/).map((s) => s.trim()).filter(Boolean)
            if (slashParts.length >= 2) {
              return (
                <>
                  <span className="block md:hidden">{slashParts[1]} /</span>
                  <span className="block md:hidden">{slashParts[0]}</span>
                  <span className="hidden md:inline">{titlePart}</span>
                </>
              )
            }
            return titlePart
          })()}
        </span>
        <span className="shrink-0">{project.period.split(/\s*\|\s*/)[1]?.trim() ?? ''}</span>
      </div>

      {/* Описание */}
      <div className="mb-12">
        <p className="text-lg text-ink/75 leading-relaxed">
          {/* Сайт letoplace.ru больше не работает, поэтому без ссылки */}
          {project.description}
        </p>
      </div>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {project.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="card-glow rounded-2xl p-5 text-center"
          >
            <div className="text-3xl font-bold mb-1 text-gradient-hero">{metric.value}</div>
            <div className="text-sm text-ink/60">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Зоны ответственности — 4 кнопки-якоря */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Зоны ответственности</h2>
        <div className="grid grid-cols-2 gap-3">
          <a href="#b2b-segment" className="px-4 py-3 rounded-lg border border-ink/15 bg-paper-card hover:border-electric/60 hover:bg-ink/5 text-center font-medium transition">
            B2B-сегмент
          </a>
          <a href="#b2c-segment" className="px-4 py-3 rounded-lg border border-ink/15 bg-paper-card hover:border-electric/60 hover:bg-ink/5 text-center font-medium transition">
            B2C-сегмент
          </a>
          <a href="#unit-economics" className="px-4 py-3 rounded-lg border border-ink/15 bg-paper-card hover:border-electric/60 hover:bg-ink/5 text-center font-medium transition">
            Юнит-экономика
          </a>
          <a href="#automation" className="px-4 py-3 rounded-lg border border-ink/15 bg-paper-card hover:border-electric/60 hover:bg-ink/5 text-center font-medium transition">
            Автоматизация процессов
          </a>
        </div>
      </div>

      {/* B2B-сегмент — текст над видео, под заголовком; буллеты + превью */}
      <div id="b2b-segment" className="mb-14 scroll-mt-28">
        <h2 className="text-2xl font-bold mb-6">B2B-сегмент</h2>
        <div className="space-y-3 text-ink/75 mb-6">
          <p className="leading-relaxed">
            {/* Ссылку на letoplace.ru убрали: сайт больше не работает */}
            <span className="text-ink font-medium">Работа с собственниками недвижимости</span>: долгосрочная аренда «под ключ», управление объектами, прозрачная отчётность по доходам и автоматизация процессов для масштабирования портфеля.
          </p>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-6">
          <video
            controls
            preload="metadata"
            poster="/videos/letoplace-poster.webp"
            className="w-full"
            playsInline
          >
            <source src="/videos/letoplace.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-stretch">
          <ul className="space-y-3 text-ink/75">
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Разработал GTM-стратегию для B2B: через конкурентный анализ и глубинные интервью выявил ключевые боли собственников, с нуля создал оффер и моушн-видео для привлечения</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Увеличил портфель объектов в 3 раза за 3 года, выстроив sales-команду и реферальную программу</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Достиг 80% retention B2B-клиентов (vs 50% по рынку) благодаря системе прозрачной аналитики доходности</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Оптимизировал юнит-экономику B2B: +30% дохода к долгосрочной аренде через адаптивную модель аренды</span>
            </li>
          </ul>
          <a
            href="https://drive.google.com/file/d/1dCSAhc8Yd9RQJZmSFxgB_Sa_EJMH3Etk/view"
            data-goal="open_offer"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 relative flex w-full md:w-[190px] h-full min-h-0 rounded-xl border border-ink/15 hover:border-electric/60 overflow-hidden shadow-md hover:shadow-lg transition mx-auto md:mx-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/letoplace-proposal-preview.png"
              alt="Предложение о сотрудничестве с LetoPlace"
              width={200}
              height="auto"
              className="block w-full h-full object-cover object-top"
            />
            <span className="absolute inset-0 hidden md:flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-[#fff] font-medium text-sm rounded-xl pointer-events-none">
              Открыть оффер
            </span>
          </a>
        </div>
      </div>

      {/* B2C-сегмент — буллеты слева, карусель справа */}
      <div id="b2c-segment" className="mb-14 scroll-mt-28">
        <h2 className="text-2xl font-bold mb-6">B2C-сегмент</h2>
        <div className="space-y-3 text-ink/75 mb-6">
          <p className="leading-relaxed">
            <span className="text-ink font-medium">Работа с путешественниками</span>: краткосрочная аренда, удобный поиск и бронирование, качество размещения и сервиса для гостей, оптимизация загрузки и ценообразования.
          </p>
        </div>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <ul className="space-y-3 text-ink/75">
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Вел customer development и user research: проводил глубинные интервью, собирал обратную связь, анализировал поведение; строил Customer Journey Map для выявления точек роста и барьеров конверсии</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Оптимизировал каждый этап AARRR через тестирование онбординга, бизнес модели</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
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
        <ul className="mt-3 space-y-3 text-ink/75 w-full">
          <li className="flex gap-3 items-start">
            <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Снизил CAC на 15% и увеличил трафик сайта на 30% через интеграцию booking-системы и UX-оптимизацию, координируя работу дизайнеров и разработчиков</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Усилил узнаваемость бренда: разработал визуальную айдентику, внедрил брендированный инвентарь в квартирах (мерч, welcome-наборы)</span>
          </li>
        </ul>
      </div>

      {/* Юнит-экономика — над Автоматизацией процессов */}
      <div id="unit-economics" className="mb-14 scroll-mt-28">
        <h2 className="text-2xl font-bold mb-6">Юнит-экономика</h2>
        <div className="space-y-3 text-ink/75 mb-4">
          <p className="leading-relaxed">
            LTV, CAC, ARPU, payback period, маржинальность и контроль ключевых метрик для масштабирования и устойчивой экономики продукта.
          </p>
        </div>
        <ul className="space-y-3 text-ink/75">
          <li className="flex gap-3 items-start">
            <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Отвечал за unit-экономику: рассчитывал payback period, margin, ARPU, LTV, CAC; перераспределял маркетинговый бюджет между каналами на основе ROI и прогнозов окупаемости инвестиций в привлечение</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Повысил ROI маркетинга на 12% за счёт оптимизации бюджета на основе когортного анализа и channel performance</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Поднял загрузку объектов с 75% до 91% (vs ~80% по рынку) за счет динамичного ценообразования</span>
          </li>
        </ul>
      </div>

      {/* Автоматизация процессов — буллеты слева, карусель справа */}
      <div id="automation" className="mb-14 scroll-mt-28">
        <h2 className="text-2xl font-bold mb-6">Автоматизация процессов</h2>
        <div className="space-y-3 text-ink/75 mb-6">
          <p className="leading-relaxed">
            Электронные замки, amoCRM, Telegram-боты, интеграции с букинг-системами и передача показаний счётчиков — снижение рутины и расходов на персонал при сохранении качества сервиса.
          </p>
        </div>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <ul className="space-y-3 text-ink/75">
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Уменьшил расходы на персонал на 15% за счёт внедрения системы электронных замков с автоматической генерацией кодов через amoCRM, обеспечив бесконтактный заезд гостей и снизив нагрузку на админов</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Сократил время ответа клиенту с 15 до 5 минут через автоматизацию коммуникаций, интеграцию с маркетплейсами и Telegram-бота</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-electric font-bold mt-0.5 shrink-0">•</span>
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

      {/* Tech Stack & Tools — скрыто на мобильной */}
      <div className="mb-14 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Tech Stack & Tools</h2>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 bg-paper-card border border-ink/15 text-ink/75 rounded-full text-sm font-medium hover:bg-ink/5 transition"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

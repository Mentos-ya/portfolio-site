import Link from 'next/link'
import Image from 'next/image'

export default function PonyatnoPage() {
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

      {/* Шапка проекта — как у LetoPlace */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/logos/ponyatno-logo.png"
          alt="Понятно"
          width={48}
          height={48}
          className="h-12 w-auto object-contain"
        />
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">Понятно</h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-0 w-full mb-10 text-lg text-gray-500">
        <span className="shrink-0">Indie Maker</span>
        <span className="shrink-0 w-full md:w-auto basis-full md:basis-auto">Февраль 2026 — По наст. время</span>
      </div>

      {/* Описание из превью карточки */}
      <div className="mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          Запустил Telegram Mini App для сканирования меню иностранных ресторанов — с переводом текста, калорийностью, составом и ценами в одном экране. Весь продукт построен через вайбкодинг (AI-инструменты без классической разработки). Стадия MVP, приложение уже приносит первый revenue.
        </p>
      </div>

      {/* Текст слева, видео справа */}
      <div className="grid md:grid-cols-[1fr_340px] gap-8 items-start">
        <div className="min-h-0 w-full">
      {/* Discovery & CustDev */}
      <div className="mb-6">
        <p className="text-base font-semibold text-gray-800 mb-2">Discovery & CustDev</p>
        <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Определил ЦА: русскоязычные туристы 20–45 лет с языковым барьером при заказе еды за рубежом</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Проанализировал конкурентов (Google Translate, Lens, TripAdvisor, Yandex) — выявил незанятую нишу «перевод + нутриенты + цена в одном экране»</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Провёл интервью с путешественниками: ключевые боли — непонятные названия блюд, пересчёт курса, отсутствие калорийности</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">УТП: «Сфотографируй меню — получи перевод, калорийность, состав и цену в рублях за 5–10 секунд»</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Учел технические (качество распознавания при плохих фото) и финансовые (контроль unit-экономики при стоимости AI-запроса) риски</span>
          </li>
        </ul>
      </div>

      {/* Приоритизация & Дизайн */}
      <div className="mb-6">
        <p className="text-base font-semibold text-gray-800 mb-2">Приоритизация & Дизайн</p>
        <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Собрал бэклог 20+ фич, приоритизировал по RICE: в MVP вошли сканирование, AI-перевод, расчёт КБЖУ, конвертация валют</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Спроектировал UX single-screen карточки: фото, название на двух языках, цены, калорийность, БЖУ, состав</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">Заложил аналитику на каждом шаге воронки</span>
          </li>
        </ul>
      </div>
        </div>

        {/* Превью видео — на мобильной на всю ширину и по центру */}
        <div className="group relative w-full max-w-full md:max-w-[294px] mx-auto md:ml-auto md:mr-0 aspect-[9/16] min-h-[336px] rounded-lg border border-gray-200 shadow-md overflow-hidden bg-black order-first md:order-none">
            <video
              controls
              className="w-full h-full object-contain"
              poster="/videos/ponyatno-video-poster.png?v=2"
              preload="metadata"
            >
              <source src="/videos/korotkoe.mov" type="video/quicktime" />
              <source src="/videos/korotkoe.mp4" type="video/mp4" />
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium text-sm pointer-events-none rounded-lg">
              Воспроизвести демо-видео
            </span>
        </div>
      </div>

      {/* Запуск & Итерации и Стек — на всю ширину */}
      <div className="w-full mt-0">
        <div className="mb-6">
          <p className="text-base font-semibold text-gray-800 mb-2">Запуск & Итерации</p>
          <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Запустил MVP как Telegram Mini App: распознавание фото меню, перевод, калорийность, конвертация цен</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Метрики: DAU, сканирования на пользователя, retention</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Собираю фидбек и логи сессий для итераций</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">•</span>
              <span className="leading-relaxed">Бэклог v2: оптимизация скорости, история сканирований, монетизация через Stripe</span>
            </li>
          </ul>
        </div>

        <section className="mb-6">
          <p className="text-base font-semibold text-gray-800 mb-2">Стек проекта</p>
          <div className="flex flex-wrap gap-2 w-full">
            {[
              'React 19 + TypeScript',
              'Vite',
              '@twa-dev/sdk (Telegram Mini App)',
              'Vercel (Serverless, хостинг, CDN)',
              'Claude Sonnet 4 (меню, перевод, калории)',
              'Pexels API (фото блюд)',
              'ExchangeRate-API (курсы валют)',
              'BigDataCloud (геокодирование)',
              'GitHub (репозиторий, деплои)',
              'Cursor (вайбкодинг)',
            ].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

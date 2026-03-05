import Image from 'next/image'
import homeData from '@/data/home.json'
import projectsData from '@/data/projects.json'
import ProjectCard from '@/components/ProjectCard'
import AddCaseBlock from '@/components/AddCaseBlock'

export default function Home() {

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10 mb-8 items-stretch">
          <div className="flex flex-col">
            <div className="overflow-hidden">
              {/* Фото слева в абзаце только на мобильной, текст обтекает */}
              <div className="float-left mr-5 mb-2 w-24 h-24 shrink-0 block md:hidden rounded-full border-[4px] border-blue-600 overflow-hidden shadow-lg bg-white">
                <Image
                  src="/images/profile.jpg"
                  alt=""
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-5 text-black">
                {homeData.hero.name}
              </h1>
              <p className="text-lg text-gray-500 mb-3">
              <strong className="font-semibold text-gray-700">Product Manager</strong>
              {homeData.hero.descriptionPart1.slice('Product Manager'.length)}
            </p>
            {(() => {
              const text = homeData.hero.descriptionPart2
              const gradientStart = 'Активно применяю'
              const i = text.indexOf(gradientStart)
              if (i === -1) return <p className="text-lg text-gray-500 mb-6">{text}</p>
              return (
                <>
                  <p className="text-lg text-gray-500 mb-3">
                    {text.slice(0, i)}
                  </p>
                  <p className="text-lg text-gray-500 mb-6">
                    <span className="text-gradient-hero">{text.slice(i)}</span>
                  </p>
                </>
              )
            })()}
            </div>

            <div className="flex gap-4 mt-auto w-full">
              <a
                href="#projects"
                className="flex-1 min-w-0 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition text-center"
              >
                Смотреть <br className="sm:hidden" />проекты
              </a>
              <a
                href="#contact"
                className="flex-1 min-w-0 px-6 py-3 border border-black text-black rounded hover:bg-black hover:text-white transition text-center"
              >
                Связаться <br className="sm:hidden" />со мной
              </a>
            </div>
          </div>

          <div className="min-h-0 flex items-start justify-end md:h-full">
            <a
              href="https://drive.google.com/file/d/1V5T1eL9UcOuFwWGZegu2HZKgeDoPdsxW/view"
              target="_blank"
              rel="noopener noreferrer"
              title="Открыть резюме"
              className="group transition-all duration-300 hover:shadow-lg relative h-full w-full max-w-[360px] flex items-center justify-center ml-auto origin-top mt-4"
              style={{ transform: 'scale(0.97)' }}
            >
              <div className="relative w-full h-full min-h-[280px] max-h-full">
                <Image
                  src="/images/resume.png"
                  alt="Resume preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-contain rounded-lg border-2 border-gray-300 group-hover:border-blue-600 transition-all duration-300 shadow-md group-hover:shadow-xl"
                  priority
                />
                {/* Оверлей при наведении: "Открыть резюме →" */}
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xl font-bold text-white">
                    Открыть резюме →
                  </span>
                </div>
                {/* Profile Photo in Top-Right Corner — только на десктопе; на мобильной фото в блоке текста */}
                <div className="hidden md:block absolute top-0 right-0 w-[105px] h-[105px] rounded-full border-[5px] border-blue-600 overflow-hidden shadow-lg bg-white transform -translate-y-1/2 translate-x-1/2">
                  <Image
                    src="/images/profile.jpg"
                    alt="Profile"
                    width={105}
                    height={105}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="text-5xl font-bold mb-3">{projectsData.pageTitle}</h1>
        <p className="text-xl text-gray-600 mb-8">
          {projectsData.pageDescription}
        </p>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard
            id={0}
            href="/projects/letoplace"
            title="LetoPlace"
            role="Product Manager & Growth PM | 2020 – Ноябрь 2025"
            emoji=""
            logo="/logos/letoplace-logo.png"
            videoPoster="/videos/letoplace-poster.png"
            description="С нуля создал digital-сервис для аренды имущества. Разработал двустороннюю платформу (B2C для путешественников и B2B для собственников недвижимости с управлением «под ключ»). В портфеле 50+ объектов в Санкт-Петербурге, 5M RUB revenue в месяц, 31% маржинальность "
            descriptionNoWrapSuffix="(vs ~25% по рынку)."
          />
          <ProjectCard
            id={1}
            href="/projects/ponyatno"
            title="Понятно"
            role="Indie Maker | Февраль 2026 — По наст. время"
            logo="/logos/ponyatno-logo.png"
            description="Запустил Telegram Mini App для сканирования меню иностранных ресторанов — с переводом текста, калорийностью, составом и ценами в одном экране. Весь продукт построен через вайбкодинг (AI-инструменты без классической разработки). Стадия MVP, приложение уже приносит первый revenue."
            videoPoster="/videos/ponyatno-poster.png?v=2"
            gradientStripe
          />
        </div>

        <AddCaseBlock />
      </section>

      {/* Education Section */}
      <section id="education" className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="text-5xl font-bold mb-3">Образование</h1>
        <p className="text-xl text-gray-600 mb-6">
          Учебные заведения и курсы
        </p>
        <ul className="space-y-4 text-gray-700">
          <li className="flex gap-3 items-start">
            <span className="text-gray-400 shrink-0">•</span>
            <span><a href="https://gopractice.ru/course/pm/certificate/rryphyzv" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 underline decoration-gray-400 hover:decoration-gray-900 relative group/link">
                GoPractice
                <span className="absolute left-0 top-full mt-1 px-2.5 py-1.5 bg-gray-800 text-white text-sm rounded-md opacity-0 pointer-events-none transition-opacity duration-150 group-hover/link:opacity-100 whitespace-nowrap z-10">
                  Открыть сертификат
                </span>
              </a> — Симулятор управления продуктом на основе данных</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-gray-400 shrink-0">•</span>
            <span><strong>Томский государственный университет</strong> — Высшая школа бизнеса, 2015–2018</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-gray-400 shrink-0">•</span>
            <span><strong>Томский государственный архитектурно-строительный университет</strong> — Архитектура, 2011–2015</span>
          </li>
        </ul>
      </section>

      {/* Skills Section — скрыт на мобильной */}
      <section id="skills" className="max-w-4xl mx-auto px-6 py-14 hidden md:block">
        <h1 className="text-5xl font-bold mb-3">Навыки</h1>
        <p className="text-xl text-gray-600 mb-8">
          Tech Stack & Tools
        </p>
        <div className="flex flex-wrap gap-3">
          {(() => {
            const gradientSkills = new Set(['Vibe Coding', 'Cursor', 'Claude', 'Prompt Engineering', 'No-code / Low-code'])
            return [
            'Strategy',
            'Roadmap',
            'Lifecycle',
            'Customer Lifecycle Mapping',
            'Lean Canvas',
            'Go-To-Market',
            'Hypothesis Testing',
            'User Research',
            'Product/Market Fit',
            'Amplitude',
            'Asana',
            'Notion',
            'Google Analytics',
            'Funnel Analysis',
            'Cohort Analysis',
            'Channel Performance Analysis',
            'API Integration',
            'Webhooks',
            'CRM Automation (amoCRM)',
            'IoT Integration',
            'Telegram Bots',
            'AI Integration',
            'Process Automation',
            'Team Leadership',
            'Remote Team Management',
            'Stakeholder Management',
            'Data-Driven Decisions',
            'KPI/OKR',
            'Financial Model',
            'Pricing Strategy',
            'Unit Economics',
            'B2C/B2B',
            'Vibe Coding',
            'Cursor',
            'Claude',
            'Prompt Engineering',
            'No-code / Low-code',
          ].map((skill) => {
            const useGradient = gradientSkills.has(skill)
            return (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 border border-gray-200"
              >
                {useGradient ? (
                  <span className="text-gradient-hero">{skill}</span>
                ) : (
                  <span className="text-gray-800">{skill}</span>
                )}
              </span>
            )
          })
          })()}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="text-5xl font-bold mb-3">Связаться со мной</h1>
        <p className="text-xl text-gray-600 mb-8">
          Я всегда заинтересован в обсуждении новых идей продукта, возможностях сотрудничества или инсайтах по product management.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Options */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Telegram</h3>
                <a
                  href="https://t.me/iak_ilia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-lg"
                >
                  https://t.me/iak_ilia
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">LinkedIn</h3>
                <a
                  href="https://linkedin.com/in/iakupov-ilia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-lg"
                >
                  linkedin.com/in/iakupov-ilia
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <a
                  href="mailto:iak.ilia.main@gmail.com"
                  className="text-blue-600 hover:text-blue-800 text-lg"
                >
                  iak.ilia.main@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex flex-col md:h-full">
            <h2 className="text-2xl font-bold mb-6">Чем я могу помочь</h2>
            <div className="flex-1 min-h-0" aria-hidden />
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-bold mb-2">Product Manager в команду</h3>
                <p className="text-gray-600 text-sm">
                  Ищу позицию, где смогу применить свой опыт работы — от discovery до масштабирования
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-bold mb-2">Нетворкинг</h3>
                <p className="text-gray-600 text-sm">
                  Открыт к общению. Пишите — обсудим идеи, обменяемся опытом или просто познакомимся
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

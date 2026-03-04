import Image from 'next/image'
import homeData from '@/data/home.json'
import projectsData from '@/data/projects.json'
import ProjectCard from '@/components/ProjectCard'

export default function Home() {

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 mb-12 items-stretch">
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              {homeData.hero.name}
            </h1>
            <p className="text-lg text-gray-500 mb-4">
              <strong className="font-semibold text-gray-700">Product Manager</strong>
              {homeData.hero.descriptionPart1.slice('Product Manager'.length)}
            </p>
            <p className="text-lg text-gray-500 mb-8">
              {homeData.hero.descriptionPart2}
            </p>

            <div className="flex gap-4 mt-auto">
              <a
                href="#projects"
                className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Смотреть проекты
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-black text-black rounded hover:bg-black hover:text-white transition"
              >
                Связаться со мной
              </a>
            </div>
          </div>

          <div className="min-h-0 flex items-center justify-end md:h-full">
            <a
              href="https://drive.google.com/file/d/1V5T1eL9UcOuFwWGZegu2HZKgeDoPdsxW/view"
              target="_blank"
              rel="noopener noreferrer"
              title="Открыть резюме"
              className="group transition-all duration-300 hover:shadow-lg relative h-full w-full max-w-[360px] flex items-center justify-center ml-auto"
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
                {/* Profile Photo in Top-Right Corner */}
                <div className="absolute top-0 right-0 w-[105px] h-[105px] rounded-full border-[5px] border-blue-600 overflow-hidden shadow-lg bg-white transform -translate-y-1/2 translate-x-1/2">
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
      <section id="projects" className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">{projectsData.pageTitle}</h1>
        <p className="text-xl text-gray-600 mb-12">
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
            title="Понятно"
            role="Indie Maker | Январь 2026 — По наст. время"
            logo="/logos/ponyatno-logo.png"
          />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">Навыки</h1>
        <p className="text-xl text-gray-600 mb-12">
          Tech Stack & Tools
        </p>
        <div className="flex flex-wrap gap-3">
          {[
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
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">Связаться со мной</h1>
        <p className="text-xl text-gray-600 mb-12">
          Я всегда заинтересован в обсуждении новых идей продукта, возможностях сотрудничества или инсайтах по product management.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
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

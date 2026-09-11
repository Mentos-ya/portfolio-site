import Image from 'next/image'
import homeData from '@/data/home.json'
import projectsData from '@/data/projects.json'
import ProjectCard from '@/components/ProjectCard'
import AddCaseBlock from '@/components/AddCaseBlock'
import AiProjects from '@/components/AiProjects'

const RESUME_URL = 'https://drive.google.com/file/d/1V7jEQQH0xdIrrB1YcVwKtXHadfmwcY3g/view'

// «Мой путь»: по порядку, последняя точка — где работаю сейчас
const path: { years: string; title: string; text: string; href?: string; now?: boolean }[] = [
  {
    years: '2018 – 2020',
    title: 'ЦУМ',
    text: 'Продажи и работа с корпоративными клиентами в премиум-сегменте',
  },
  {
    years: '2018 – 2025',
    title: 'LetoPlace',
    text: 'Основал сервис аренды и вырастил до 5 млн ₽ выручки в месяц',
    href: '/projects/letoplace',
  },
  {
    years: '2026',
    title: 'Понятно',
    text: 'Сам собрал Telegram-приложение с помощью ИИ, первые продажи',
    href: '/projects/ponyatno',
  },
  {
    years: '2026',
    title: 'ИИ-проекты',
    text: 'Сам собрал задачник Mentask, приложение для Mac и бота-дайджест новостей',
    href: '#ai',
  },
  {
    years: '2026 — сейчас',
    title: 'Домклик',
    text: 'Product Manager в сервисе недвижимости Сбера',
    now: true,
  },
]

// Навыки: 12 главных, сначала работа с ИИ (градиентом)
const skills = [
  { name: 'Vibe Coding', ai: true },
  { name: 'Claude Code', ai: true },
  { name: 'Cursor', ai: true },
  { name: 'AI Agents', ai: true },
  { name: 'Prompt Engineering', ai: true },
  { name: 'Product Strategy & Roadmap', ai: false },
  { name: 'Customer Development', ai: false },
  { name: 'Unit Economics', ai: false },
  { name: 'A/B Testing', ai: false },
  { name: 'Funnel & Cohort Analysis', ai: false },
  { name: 'Go-To-Market', ai: false },
  { name: 'Team Leadership', ai: false },
]

// Контакты; цель для Метрики определяется по адресу ссылки
const contacts = [
  { label: 'Telegram', href: 'https://t.me/iak_ilia', text: 't.me/iak_ilia', hint: 'Открыть Telegram', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ilia-iakupov', text: 'linkedin.com/in/ilia-iakupov', hint: 'Открыть LinkedIn', external: true },
  { label: 'Email', href: 'mailto:iak.ilia.main@gmail.com', text: 'iak.ilia.main@gmail.com', hint: 'Написать письмо', external: false },
]

export default function Home() {
  return (
    <div>
      {/* Первый экран */}
      {/* Первый экран без общей подложки: отдельные ореолы у текста, фото и «Моего пути» */}
      <section id="home" className="sheet sheet-split">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-7 md:gap-12 items-center">
          <div className="halo">
            {/* Моноширинный шрифт шире — на телефоне плашка мельче, чтобы остаться в одну строку */}
            <span className="inline-flex items-center gap-2 text-[11px] md:text-[13px] whitespace-nowrap text-ink/75 border border-ink/15 bg-paper-card px-3.5 py-[7px] rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" aria-hidden />
              Сейчас · Product Manager в Домклике
            </span>
            {/* Имя — тем же начертанием, что основной текст: та же жирность, без сжатия букв и пробела */}
            <h1 className="text-[46px] md:text-[68px] leading-none font-normal [word-spacing:normal] my-5 text-ink">
              {homeData.hero.name}
            </h1>
            <p className="text-base md:text-lg leading-[1.55] text-ink/70">
              <strong className="text-ink font-semibold">Product Manager с предпринимательским бэкграундом</strong> с&nbsp;7&nbsp;годами опыта в HotelTech и TravelTech. С нуля создал{' '}
              {/* Сайт letoplace.ru больше не работает — ведём на кейс внутри портфолио */}
              <a
                href="/projects/letoplace"
                data-goal="open_project"
                title="Открыть кейс LetoPlace"
                className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink transition-colors"
              >
                {/* Не разрываем «digital-сервис» по дефису */}
                <span className="whitespace-nowrap">digital-сервис</span> аренды
              </a>{' '}
              в&nbsp;3&nbsp;городах.
            </p>
            <p className="text-base md:text-lg leading-normal font-semibold mt-3 text-gradient-hero">
              Активно применяю LLM и AI-агентов. Этот сайт собран с помощью&nbsp;Claude&nbsp;Code.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#projects" className="btn btn-primary flex-1 sm:flex-none">
                Смотреть проекты
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex-1 sm:flex-none"
              >
                Открыть резюме
              </a>
            </div>
          </div>

          <div className="photo-ring halo halo-round order-first md:order-none justify-self-start md:justify-self-center w-[180px] h-[180px] md:w-[290px] md:h-[290px]">
            <Image
              src="/images/profile.jpg"
              alt="Илья Якупов"
              width={290}
              height={290}
              className="w-full h-full object-cover rounded-full border-[5px] border-paper-card"
              priority
            />
          </div>
        </div>

        {/* Мой путь */}
        <div className="halo mt-12 md:mt-16">
          <p className="text-[15px] uppercase tracking-[0.1em] text-ink/60 mb-4">Мой путь</p>
          <ol className="path">
            {path.map((step) => {
              const body = (
                <>
                  <p className={`text-[15px] ${step.now ? 'text-green-700 font-semibold' : 'text-ink/60'}`}>
                    {step.years}
                  </p>
                  <p className="text-[24px] font-bold tracking-[-0.01em] mt-1.5 text-ink">
                    {step.title}
                    {step.href && (
                      <span className="inline-block ml-1.5 text-lg text-ink/40 group-hover:text-electric group-hover:translate-x-0.5 transition" aria-hidden>
                        →
                      </span>
                    )}
                  </p>
                  <p className="text-base text-ink/75 mt-2 leading-[1.45]">{step.text}</p>
                </>
              )
              return (
                <li key={step.title} className={`path-step ${step.now ? 'is-now' : ''}`}>
                  {step.href ? (
                    <a href={step.href} className="group block">
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Опыт: работа и продукты, собранные с ИИ, — в одном разделе, двумя группами */}
      <section id="projects" className="sheet scroll-mt-20">
        <h2 className="section-title">{projectsData.pageTitle}</h2>
        <p className="section-lead">Где вёл продукт как Product Manager и Growth PM — и что собрал сам с помощью ИИ</p>

        <h3 className="text-2xl md:text-[28px] font-bold text-ink mb-5">Работа</h3>
        <div className="grid gap-5">
          {/* Текущая работа — первой */}
          <ProjectCard
            id={2}
            title="Домклик"
            logo="/logos/domclick-logo.svg"
            role="Product Manager | 04.2026 — По наст. время"
            description="Продакт-менеджер отельного направления в Домклике — сервисе недвижимости экосистемы Сбера. После собственного бизнеса — масштаб задач и данных большой экосистемы. Москва, гибридный формат, полный день."
          />
          {/* LetoPlace — широкой карточкой: текст слева, превью видео справа */}
          <ProjectCard
            id={0}
            wide
            href="/projects/letoplace"
            title="LetoPlace"
            role="Founder / Product Owner | 02.2018 – 09.2025"
            emoji=""
            logo="/logos/letoplace-logo.png"
            videoPoster="/videos/letoplace-poster.webp"
            description="С нуля создал digital-сервис для аренды имущества. Разработал двустороннюю платформу (B2C для путешественников и B2B для собственников недвижимости с управлением «под ключ»). В портфеле 50+ объектов в Санкт-Петербурге, 5M RUB revenue в месяц, 31% маржинальность."
          />
        </div>

        {/* «+» — место под следующую работу: сразу под группой «Работа» */}
        <AddCaseBlock />

        {/* Вторая группа: Mentask, Понятно и небольшие инструменты */}
        <AiProjects />
      </section>

      {/* Образование */}
      <section id="education" className="sheet scroll-mt-20">
        <h2 className="section-title">Образование</h2>
        <p className="section-lead">Учебные заведения и курсы</p>
        <ul className="space-y-4 text-ink/75">
          <li className="flex gap-3 items-start">
            <span className="text-electric shrink-0">•</span>
            <span>
              <a
                href="https://gopractice.ru/course/pm/certificate/rryphyzv"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink relative group/link"
              >
                GoPractice
                <span className="absolute left-0 top-full mt-1 px-2.5 py-1.5 bg-ink text-paper text-sm rounded-md opacity-0 pointer-events-none transition-opacity duration-150 group-hover/link:opacity-100 whitespace-nowrap z-10">
                  Открыть сертификат
                </span>
              </a>{' '}
              — Симулятор управления продуктом на основе данных
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-electric shrink-0">•</span>
            <span><strong className="text-ink">Томский государственный университет</strong> — Высшая школа бизнеса, 2015–2018</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-electric shrink-0">•</span>
            <span><strong className="text-ink">Томский государственный архитектурно-строительный университет</strong> — Архитектура, 2011–2015</span>
          </li>
        </ul>
      </section>

      {/* Навыки: видны и на телефоне */}
      <section id="skills" className="sheet scroll-mt-20">
        <h2 className="section-title">Навыки</h2>
        <p className="section-lead">Tech Stack & Tools</p>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="px-4 py-2 rounded-full text-sm font-medium bg-paper-card border border-ink/15"
            >
              <span className={skill.ai ? 'text-gradient-hero' : 'text-ink/85'}>{skill.name}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="sheet scroll-mt-20">
        <h2 className="section-title">Связаться<br className="md:hidden" /> со мной</h2>
        <p className="section-lead">Ищу позицию продакта — пишите в Telegram.</p>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-ink">Контактная информация</h3>
            <div className="space-y-6">
              {contacts.map((c) => (
                <div key={c.label}>
                  <h4 className="font-bold text-lg mb-2 text-ink">{c.label}</h4>
                  <div className="relative inline-block group">
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-ink/85 underline decoration-ink/30 underline-offset-4 hover:decoration-ink hover:text-electric text-lg transition-colors"
                    >
                      {c.text}
                    </a>
                    <span className="absolute left-0 top-full mt-1 px-2 py-1 bg-ink text-paper text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {c.hint}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:h-full">
            <h3 className="text-2xl font-bold mb-6 text-ink">Чем я могу помочь</h3>
            <div className="flex-1 min-h-0" aria-hidden />
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-paper-card border border-ink/10">
                <h4 className="font-bold mb-2 text-ink">Product Manager в команду</h4>
                <p className="text-ink/60 text-base">
                  Ищу позицию, где смогу применить свой опыт работы — от discovery до масштабирования
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-paper-card border border-ink/10">
                <h4 className="font-bold mb-2 text-ink">Нетворкинг</h4>
                <p className="text-ink/60 text-base">
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

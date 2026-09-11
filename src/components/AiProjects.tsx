import aiData from '@/data/ai.json'
import ProjectCard from '@/components/ProjectCard'

type AiProject = (typeof aiData.projects)[number]

// Текст карточки ИИ-проекта: название, тип и период, описание, возможности, итог
function ProjectText({ project }: { project: AiProject }) {
  const [kind, ...period] = project.kind.split(/\s*\|\s*/)
  return (
    <>
      <h3 className="text-2xl font-bold tracking-[-0.01em] text-ink">{project.title}</h3>
      <p className="text-[13px] text-ink/60 mt-1">
        <span className="block md:inline">{kind}</span>
        {period.length > 0 && (
          <>
            <span className="hidden md:inline"> · </span>
            <span className="block md:inline">{period.join(' · ')}</span>
          </>
        )}
      </p>
      <p className="mt-3 text-base text-ink/75 leading-relaxed">{project.description}</p>
      {project.features && (
        <ul className="mt-3 space-y-1.5 text-base text-ink/75 leading-relaxed">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2.5">
              <span className="text-electric shrink-0" aria-hidden>
                —
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-auto pt-4 text-base font-semibold">
        <span className="text-gradient-hero">{project.result}</span>
      </p>
    </>
  )
}

// Группа «Собрал сам с ИИ» внутри раздела «Опыт»: сначала продукты с роликами — широкими карточками
// (Mentask, Понятно), под ними небольшие инструменты по три в ряд
export default function AiProjects() {
  const withVideo = aiData.projects.filter((project) => project.video)
  const small = aiData.projects.filter((project) => !project.video)

  return (
    <div id="ai" className="scroll-mt-20 mt-12 md:mt-14">
      <h3 className="text-2xl md:text-[28px] font-bold text-ink">
        {aiData.pageTitle} <span className="text-gradient-hero">{aiData.pageTitleAccent}</span>
      </h3>
      <p className="text-base text-ink/60 mt-2 mb-5">{aiData.pageDescription}</p>

      <div className="grid gap-5">
        {withVideo.map((project) => (
          <div
            key={project.title}
            className="card-glow rounded-none p-6 md:p-[26px] grid md:grid-cols-[1fr_minmax(0,380px)] gap-6 md:gap-8"
          >
            <div className="flex flex-col">
              <ProjectText project={project} />
            </div>
            {/* Ролик — как на странице LetoPlace: сам не запускается, по кнопке, со звуком */}
            <video
              controls
              preload="metadata"
              playsInline
              poster={project.poster}
              className="w-full aspect-square self-center rounded-none bg-black border border-ink/10"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* Понятно — Telegram-приложение, тоже собрано вайбкодингом; ведёт на страницу кейса */}
        <ProjectCard
          id={1}
          wide
          href="/projects/ponyatno"
          title="Понятно"
          role="Indie Maker | 02.2026 — По наст. время"
          logo="/logos/ponyatno-logo.png"
          description="Запустил Telegram Mini App для сканирования меню иностранных ресторанов — с переводом текста, калорийностью, составом и ценами в одном экране. Весь продукт построен через вайбкодинг (AI-инструменты без классической разработки). Стадия MVP, приложение уже приносит первый revenue."
          videoPoster="/videos/ponyatno-poster.png?v=2"
        />

        {/* Небольшие инструменты — по три в ряд на широком экране */}
        <div className="grid lg:grid-cols-3 gap-5">
          {small.map((project) => (
            <div key={project.title} className="card-glow rounded-none p-6 md:p-[26px] flex flex-col">
              <ProjectText project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

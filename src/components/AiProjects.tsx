import aiData from '@/data/ai.json'
import ToolCarousel from './ToolCarousel'
import ToolClip from './ToolClip'

type AiProject = (typeof aiData.projects)[number]
type AiGroup = (typeof aiData.groups)[number]

// Число со словом в нужной форме: 1 продукт, 2 продукта, 5 продуктов
function countLabel(n: number, [one, few, many]: string[]) {
  const mod10 = n % 10
  const mod100 = n % 100
  const word =
    mod10 === 1 && mod100 !== 11 ? one : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? few : many
  return `${n} ${word}`
}

// Текст карточки ИИ-проекта: название, тип и период, описание, возможности, итог и, если есть, ссылки на продукт и кейс
function ProjectText({ project }: { project: AiProject }) {
  const [kind, ...period] = project.kind.split(/\s*\|\s*/)
  return (
    <>
      <h3 className="text-2xl font-bold tracking-[-0.01em] text-ink">{project.title}</h3>
      {/* Ссылка на сам продукт — сразу под названием (Илья 06.11.2026); метка utm — чтобы в Метрике продукта
          было видно, что пришли с портфолио */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 self-start text-[15px] text-ink underline decoration-ink/30 underline-offset-4 hover:text-electric hover:decoration-electric transition-colors"
        >
          Открыть {new URL(project.link).host} →
        </a>
      )}
      <p className="text-[13px] text-ink mt-1">
        <span className="block md:inline">{kind}</span>
        {period.length > 0 && (
          <>
            <span className="hidden md:inline"> · </span>
            <span className="block md:inline">{period.join(' · ')}</span>
          </>
        )}
      </p>
      <p className="mt-3 text-base text-ink leading-relaxed">{project.description}</p>
      {project.features && (
        <ul className="mt-3 space-y-1.5 text-base text-ink leading-relaxed">
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
      {/* Подробный кейс — для тех, кому мало карточки; Метрика сама считает переход по адресу /projects/ */}
      {project.case && (
        <a
          href={project.case}
          className="mt-3 self-start text-[15px] text-ink underline decoration-ink/30 underline-offset-4 hover:text-electric hover:decoration-electric transition-colors"
        >
          Подробный кейс →
        </a>
      )}
    </>
  )
}

// Группа проектов: заголовок, плашка с числом, подпись; продукты с роликом — широкими карточками,
// ролик играет прямо в карточке; остальные — лентой карточек со снимками экрана (ToolCarousel)
function GroupBlock({ group, projects }: { group: AiGroup; projects: AiProject[] }) {
  const withVideo = projects.filter((project) => project.video)
  const small = projects.filter((project) => !project.video)
  const count = countLabel(projects.length, group.units)

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="text-2xl md:text-[28px] font-bold text-ink">
          {group.title}
          {/* Акцент не рвём: на телефоне «в паблике» целиком уходит на вторую строку */}
          {group.titleAccent && (
            <>
              {' '}
              <span className="text-gradient-hero whitespace-nowrap">{group.titleAccent}</span>
            </>
          )}
        </h3>
        {group.badge ? (
          <span className="cli-badge text-[13px] text-ink px-2 py-1">
            <span className="text-[#16a34a]">●</span> {count} · {group.badge}
          </span>
        ) : (
          <span className="text-[13px] text-ink/70">{count}</span>
        )}
      </div>
      <p className="text-[15px] md:text-base text-ink mt-2 mb-5 md:mb-6">{group.lead}</p>

      <div className="grid gap-5">
        {withVideo.map((project) => (
          <div
            key={project.title}
            className="card-glow card-lift rounded-none p-5 md:p-[26px] grid gap-6 md:gap-8 md:grid-cols-[1fr_minmax(0,380px)]"
          >
            <div className="flex flex-col">
              <ProjectText project={project} />
            </div>
            {/* Ролик прямо в карточке: сам не запускается, по кнопке, со звуком. Оба ролика квадратные
                (у Понятно до 09.11.2026 был вертикальный, снятый с телефона) */}
            <video
              controls
              preload="metadata"
              playsInline
              poster={project.poster}
              className="w-full self-center rounded-none bg-black border border-ink/10 aspect-square"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* Остальные — лентой: крупный снимок и полный текст, листают стрелками, точками или пальцем
            (вариант «Лента», Илья 08.11.2026; раньше — сетка по три в ряд почти на два экрана) */}
        {small.length > 0 && (
          <ToolCarousel labels={small.map((project) => project.title)}>
            {small.map((project) => (
              <article key={project.title} className="card-glow rounded-none p-[18px] md:p-[22px] flex flex-col">
                {/* Снимок экрана инструмента — сверху карточки, у всех одна рамка 16:10.
                    Личных данных на снимках нет: письма в Gment и записи еды — для примера.
                    Есть ролик (поле clip) — он стоит на месте снимка и играет сам, пока карточка видна */}
                {project.image && project.clip ? (
                  <ToolClip image={project.image} imageAlt={project.imageAlt ?? ''} clip={project.clip} />
                ) : project.image && (
                  <img
                    src={project.image}
                    alt={project.imageAlt ?? ''}
                    width={960}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="mb-4 w-full aspect-[16/10] object-cover object-top rounded-none border border-ink/15 bg-paper"
                  />
                )}
                <ProjectText project={project} />
              </article>
            ))}
          </ToolCarousel>
        )}
      </div>
    </div>
  )
}

// Раздел «Собрал сам с ИИ» — два листа подряд: в первом заголовок раздела и «Сделал и тестирую в паблике»
// (продуктами пользуются другие люди), во втором — «Сделал для себя»
export default function AiProjects() {
  const [first, ...rest] = aiData.groups
  const projectsOf = (id: string) => aiData.projects.filter((project) => project.group === id)

  return (
    <>
      <section id="ai" className="sheet scroll-mt-20">
        <h2 className="section-title">
          {aiData.pageTitle} <span className="text-gradient-hero">{aiData.pageTitleAccent}</span>
        </h2>
        <p className="section-lead">{aiData.pageDescription}</p>
        <GroupBlock group={first} projects={projectsOf(first.id)} />
      </section>

      {rest.map((group) => (
        <section key={group.id} className="sheet" aria-label={group.title}>
          <GroupBlock group={group} projects={projectsOf(group.id)} />
        </section>
      ))}
    </>
  )
}

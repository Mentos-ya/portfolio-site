import aiData from '@/data/ai.json'

type AiProject = (typeof aiData.projects)[number]
type AiGroup = (typeof aiData.groups)[number]

// Рамка блока без заливки: «в паблике» — сплошная, «для себя» — пунктир, оба приглушённые
const FRAME: Record<string, string> = {
  public: 'border-2 border-ink/40',
  personal: 'border-2 border-dashed border-ink/30',
}

// Число со словом в нужной форме: 1 продукт, 2 продукта, 5 продуктов
function countLabel(n: number, [one, few, many]: string[]) {
  const mod10 = n % 10
  const mod100 = n % 100
  const word =
    mod10 === 1 && mod100 !== 11 ? one : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? few : many
  return `${n} ${word}`
}

// Текст карточки ИИ-проекта: название, тип и период, описание, возможности, итог и, если есть, ссылка на кейс
function ProjectText({ project }: { project: AiProject }) {
  const [kind, ...period] = project.kind.split(/\s*\|\s*/)
  return (
    <>
      <h3 className="text-2xl font-bold tracking-[-0.01em] text-ink">{project.title}</h3>
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

// Блок группы в рамке: заголовок, плашка с числом, подпись; продукты с роликом — широкими карточками,
// ролик играет прямо в карточке; остальные — небольшими карточками по три в ряд
function GroupBlock({ group, projects }: { group: AiGroup; projects: AiProject[] }) {
  const withVideo = projects.filter((project) => project.video)
  const small = projects.filter((project) => !project.video)
  const count = countLabel(projects.length, group.units)

  return (
    <div className={`mt-6 md:mt-8 p-3 md:p-8 ${FRAME[group.id] ?? FRAME.personal}`}>
      <div className="px-2 pt-2 md:p-0 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h4 className="text-xl md:text-2xl font-bold text-ink [word-spacing:-0.25em]">
          {group.title}
          {/* Акцент не рвём: на телефоне «в паблике» целиком уходит на вторую строку */}
          {group.titleAccent && (
            <>
              {' '}
              <span className="text-gradient-hero whitespace-nowrap">{group.titleAccent}</span>
            </>
          )}
        </h4>
        {group.badge ? (
          <span className="cli-badge text-[13px] text-ink px-2 py-1">
            <span className="text-[#16a34a]">●</span> {count} · {group.badge}
          </span>
        ) : (
          <span className="text-[13px] text-ink/70">{count}</span>
        )}
      </div>
      <p className="px-2 md:px-0 text-[15px] text-ink mt-2 mb-4 md:mb-6">{group.lead}</p>

      <div className="grid gap-5">
        {withVideo.map((project) => (
          <div
            key={project.title}
            className={`card-glow card-lift rounded-none p-5 md:p-[26px] grid gap-6 md:gap-8 ${
              project.vertical ? 'md:grid-cols-[1fr_minmax(0,260px)]' : 'md:grid-cols-[1fr_minmax(0,380px)]'
            }`}
          >
            <div className="flex flex-col">
              <ProjectText project={project} />
            </div>
            {/* Ролик прямо в карточке: сам не запускается, по кнопке, со звуком.
                Вертикальный (Понятно, снят с телефона) — узким высоким столбцом */}
            <video
              controls
              preload="metadata"
              playsInline
              poster={project.poster}
              className={`w-full self-center rounded-none bg-black border border-ink/10 ${
                project.vertical ? 'aspect-[590/1280] max-w-[260px] mx-auto md:mx-0' : 'aspect-square'
              }`}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        ))}

        {small.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-5">
            {small.map((project) => (
              <div key={project.title} className="card-glow card-lift rounded-none p-5 md:p-[26px] flex flex-col">
                <ProjectText project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Группа «Собрал сам с ИИ» внутри раздела «Опыт»: два блока в рамках —
// «Сделал и тестирую в паблике» (продуктами пользуются другие люди) и «Сделал для себя»
export default function AiProjects() {
  return (
    <div id="ai" className="scroll-mt-20 mt-12 md:mt-14">
      <h3 className="text-2xl md:text-[28px] font-bold text-ink">
        {aiData.pageTitle} <span className="text-gradient-hero">{aiData.pageTitleAccent}</span>
      </h3>
      <p className="text-base text-ink mt-2">{aiData.pageDescription}</p>

      {aiData.groups.map((group) => (
        <GroupBlock
          key={group.id}
          group={group}
          projects={aiData.projects.filter((project) => project.group === group.id)}
        />
      ))}
    </div>
  )
}

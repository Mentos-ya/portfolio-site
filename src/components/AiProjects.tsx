import aiData from '@/data/ai.json'

// Блок «Собрал сам с ИИ»: продукты и инструменты, сделанные вайбкодингом
export default function AiProjects() {
  return (
    <section id="ai" className="sheet scroll-mt-20">
      <h2 className="section-title">
        {aiData.pageTitle} <span className="text-gradient-hero">{aiData.pageTitleAccent}</span>
      </h2>
      <p className="section-lead">{aiData.pageDescription}</p>

      <div className="grid md:grid-cols-2 gap-5">
        {aiData.projects.map((project) => {
          const [kind, ...period] = project.kind.split(/\s*\|\s*/)
          return (
            <div
              key={project.title}
              className="card-glow rounded-[18px] p-6 md:p-[26px] flex flex-col"
            >
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
              <p className="mt-3 text-sm text-ink/75 leading-relaxed">{project.description}</p>
              <p className="mt-auto pt-4 text-base font-semibold">
                <span className="text-gradient-hero">{project.result}</span>
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

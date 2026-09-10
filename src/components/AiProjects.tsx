import aiData from '@/data/ai.json'

// Блок «Собрал сам с ИИ»: продукты и инструменты, сделанные вайбкодингом
export default function AiProjects() {
  return (
    <section id="ai" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
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
              <h3 className="text-2xl font-bold tracking-[-0.01em] text-white">{project.title}</h3>
              <p className="text-[13px] text-zinc-400 mt-1">
                <span className="block md:inline">{kind}</span>
                {period.length > 0 && (
                  <>
                    <span className="hidden md:inline"> · </span>
                    <span className="block md:inline">{period.join(' · ')}</span>
                  </>
                )}
              </p>
              <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{project.description}</p>
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

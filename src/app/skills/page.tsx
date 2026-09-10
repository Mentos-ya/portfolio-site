export default function Skills() {
  const skillCategories = [
    {
      name: 'Product & Strategy',
      skills: ['Product Strategy', 'Roadmap Planning', 'Customer Lifecycle Mapping', 'Lean Canvas', 'Go-To-Market Strategy', 'Hypothesis Testing'],
    },
    {
      name: 'Analytics & Data',
      skills: ['A/B Testing', 'Funnel Analysis', 'Cohort Analysis', 'Amplitude', 'Google Analytics', 'User Research'],
    },
    {
      name: 'Tools & Tech',
      skills: ['Asana', 'Notion', 'API Integration', 'CRM Automation (amoCRM)', 'IoT Integration', 'Telegram Bots', 'AI Integration'],
    },
    {
      name: 'Leadership & Management',
      skills: ['Team Leadership', 'Remote Team Management', 'Stakeholder Management', 'Cross-functional Collaboration', 'Product Discovery'],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-4">Навыки & Экспертиза</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Всесторонний обзор моих основных компетенций как Product Manager
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill} className="flex items-start">
                  <span className="text-white mr-3 mt-1">▪</span>
                  <span className="text-zinc-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Industries */}
      <div className="mt-16 pt-12 border-t border-night-edge">
        <h2 className="text-2xl font-bold mb-6">Индустрии & Домены</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-night-card rounded">
            <p className="font-bold text-white mb-2">HotelTech</p>
            <p className="text-zinc-400 text-sm">
              Marketplace dynamics, property management системы, оптимизация guest experience
            </p>
          </div>
          <div className="p-4 bg-night-card rounded">
            <p className="font-bold text-white mb-2">TravelTech</p>
            <p className="text-zinc-400 text-sm">
              Booking платформы, планирование маршрутов, travel distribution каналы
            </p>
          </div>
          <div className="p-4 bg-night-card rounded">
            <p className="font-bold text-white mb-2">Marketplace Платформы</p>
            <p className="text-zinc-400 text-sm">
              Two-sided сети, баланс supply & demand, привлечение merchants
            </p>
          </div>
          <div className="p-4 bg-night-card rounded">
            <p className="font-bold text-white mb-2">Growth & Scaling</p>
            <p className="text-zinc-400 text-sm">
              От разработки 0-1 до операций с выручкой в миллионы
            </p>
          </div>
        </div>
      </div>

      {/* Methodologies */}
      <div className="mt-16 pt-12 border-t border-night-edge">
        <h2 className="text-2xl font-bold mb-6">Методологии & Frameworks</h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="text-white mr-3 mt-1">✓</span>
            <div>
              <p className="font-bold text-white">Lean Startup</p>
              <p className="text-zinc-400 text-sm">Hypothesis-driven разработка продукта и rapid experimentation</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-white mr-3 mt-1">✓</span>
            <div>
              <p className="font-bold text-white">Jobs to be Done (JTBD)</p>
              <p className="text-zinc-400 text-sm">Понимание customer motivations и pain points</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-white mr-3 mt-1">✓</span>
            <div>
              <p className="font-bold text-white">User-Centered Design</p>
              <p className="text-zinc-400 text-sm">Continuous user research и iterative совершенствование продукта</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-white mr-3 mt-1">✓</span>
            <div>
              <p className="font-bold text-white">Data-Driven Decision Making</p>
              <p className="text-zinc-400 text-sm">Metrics-driven стратегия и A/B testing культура</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

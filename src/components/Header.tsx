export default function Header() {
  return (
    // Полупрозрачная шапка: сквозь неё видно свечение фона
    <header className="sticky top-0 z-40 bg-night/70 backdrop-blur-md border-b border-white/[0.06]">
      <nav className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
        <a href="/" className="text-lg md:text-xl font-bold text-white hover:text-zinc-300 transition">
          Портфолио
        </a>

        <ul className="hidden md:flex gap-7 text-[15px]">
          <li>
            <a href="/#projects" className="text-zinc-400 hover:text-white transition">
              Опыт
            </a>
          </li>
          <li>
            <a href="/#ai" className="text-zinc-400 hover:text-white transition">
              ИИ-проекты
            </a>
          </li>
          <li>
            <a href="/#skills" className="text-zinc-400 hover:text-white transition">
              Навыки
            </a>
          </li>
          <li>
            <a href="/#contact" className="text-zinc-400 hover:text-white transition">
              Контакты
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

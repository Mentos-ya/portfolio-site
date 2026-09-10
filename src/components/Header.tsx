export default function Header() {
  return (
    // Почти непрозрачная шапка: растр под ней не должен мутить фон
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-ink/10">
      <nav className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
        <a href="/" className="text-lg md:text-xl font-bold text-ink hover:text-electric transition">
          Портфолио
        </a>

        <ul className="hidden md:flex gap-7 text-[15px]">
          <li>
            <a href="/#projects" className="text-ink/60 hover:text-electric transition">
              Опыт
            </a>
          </li>
          <li>
            <a href="/#ai" className="text-ink/60 hover:text-electric transition">
              ИИ-проекты
            </a>
          </li>
          <li>
            <a href="/#skills" className="text-ink/60 hover:text-electric transition">
              Навыки
            </a>
          </li>
          <li>
            <a href="/#contact" className="text-ink/60 hover:text-electric transition">
              Контакты
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

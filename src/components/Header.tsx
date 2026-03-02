import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200">
      <nav className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-black hover:text-gray-700 transition">
          IY
        </a>

        <ul className="flex gap-8">
          <li>
            <a href="#home" className="text-gray-700 hover:text-black transition">
              Обо мне
            </a>
          </li>
          <li>
            <a href="#projects" className="text-gray-700 hover:text-black transition">
              Опыт
            </a>
          </li>
          <li>
            <a href="#skills" className="text-gray-700 hover:text-black transition">
              Навыки
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-700 hover:text-black transition">
              Контакты
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200">
      <nav className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black">
          IY
        </Link>

        <ul className="flex gap-8">
          <li>
            <Link href="/" className="text-gray-700 hover:text-black transition">
              Обо мне
            </Link>
          </li>
          <li>
            <Link href="/projects" className="text-gray-700 hover:text-black transition">
              Проекты
            </Link>
          </li>
          <li>
            <Link href="/skills" className="text-gray-700 hover:text-black transition">
              Навыки
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-700 hover:text-black transition">
              Контакты
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-4">Свяжись со мной</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:iak.ilia.main@gmail.com" className="hover:text-white transition">
                  Email
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/iakupov-ilia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://t.me/iak_ilia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Основное</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition">
                  Обо мне
                </a>
              </li>
              <li>
                <a href="/projects" className="hover:text-white transition">
                  Проекты
                </a>
              </li>
              <li>
                <a href="/skills" className="hover:text-white transition">
                  Навыки
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Локация</h3>
            <p className="text-gray-400">Белград, Сербия</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Илья Якупов. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
        <p>© {currentYear} Илья Якупов. Все права защищены.</p>
      </div>
    </footer>
  )
}

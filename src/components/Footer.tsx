export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.06] mt-2 md:mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
        <p>© {currentYear} Илья Якупов. Все права защищены.</p>
      </div>
    </footer>
  )
}

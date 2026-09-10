export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-paper/95 backdrop-blur-sm border-t border-ink/10 mt-2 md:mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8 text-center text-ink/50 text-sm">
        <p>© {currentYear} Илья Якупов. Все права защищены.</p>
      </div>
    </footer>
  )
}

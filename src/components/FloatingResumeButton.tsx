'use client'

import { useEffect, useRef } from 'react'

export default function FloatingResumeButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const updateButtonVisibility = () => {
      const achievementSection = document.getElementById('achievement')
      if (!achievementSection) {
        button.style.opacity = '0'
        button.style.pointerEvents = 'none'
        return
      }

      const rect = achievementSection.getBoundingClientRect()
      // Показываем кнопку когда блок виден или когда мы уже прошли по нему (выше экрана)
      const shouldShow = (rect.top < window.innerHeight && rect.bottom > 0) || rect.top < 0

      button.style.opacity = shouldShow ? '1' : '0'
      button.style.pointerEvents = shouldShow ? 'auto' : 'none'
    }

    // Слушаем события scroll
    window.addEventListener('scroll', updateButtonVisibility, { passive: true })

    // Инициализация: вызываем функцию несколько раз чтобы гарантировать работу
    updateButtonVisibility() // Первый вызов сразу
    setTimeout(updateButtonVisibility, 100) // Второй вызов через 100ms
    setTimeout(updateButtonVisibility, 500) // Третий вызов через 500ms

    return () => {
      window.removeEventListener('scroll', updateButtonVisibility)
    }
  }, [])

  return (
    <a
      ref={buttonRef}
      href="https://drive.google.com/file/d/1V5T1eL9UcOuFwWGZegu2HZKgeDoPdsxW/view"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-opacity hover:scale-110 hover:bg-blue-700 z-50 floating-resume-btn"
      style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
      title="Открыть резюме"
    >
      <span className="text-2xl font-bold">📄</span>
    </a>
  )
}

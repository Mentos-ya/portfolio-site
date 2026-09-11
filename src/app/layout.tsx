import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingResumeButton from '@/components/FloatingResumeButton'
import YandexMetrika from '@/components/YandexMetrika'
import DitherBackground from '@/components/DitherBackground'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Шрифт сайта — «терминальный» JetBrains Mono, только жирные начертания.
// Next кладёт файлы шрифта на сам сайт, запросов к Google нет
const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['700', '800'],
  variable: '--font-mono',
  display: 'swap',
})

const title = 'Илья Якупов — Product Manager'
const description =
  'Продакт с 7 годами опыта в HotelTech и TravelTech, основатель LetoPlace. Сам собираю продукты с помощью ИИ.'

export const metadata: Metadata = {
  metadataBase: new URL('https://iakupov-portfolio.vercel.app'),
  title,
  description,
  // Карточка-превью, когда ссылку отправляют в Telegram, WhatsApp, LinkedIn
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Илья Якупов',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={mono.variable}>
      <body className="relative bg-paper text-ink">
        {/* Фон всего сайта: пиксельный растр, стоит на месте, страница прокручивается поверх */}
        <DitherBackground />
        <Header />
        {/* relative — чтобы содержимое лежало поверх растра */}
        <main className="relative min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingResumeButton />
        <YandexMetrika />
      </body>
    </html>
  )
}

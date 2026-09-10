import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingResumeButton from '@/components/FloatingResumeButton'
import YandexMetrika from '@/components/YandexMetrika'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

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
    <html lang="ru">
      <body className="relative bg-night text-zinc-100 overflow-x-hidden md:overflow-x-visible">
        {/* Цветные пятна света вверху страницы — фон «ночной» темы */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[1000px] overflow-hidden">
          <div className="absolute w-[340px] h-[340px] md:w-[480px] md:h-[480px] rounded-full bg-[#ec4899] opacity-[0.55] blur-[90px] -top-40 -right-20" />
          <div className="absolute w-[380px] h-[380px] md:w-[520px] md:h-[520px] rounded-full bg-[#6366f1] opacity-40 blur-[90px] top-[260px] -left-[220px]" />
        </div>
        <Header />
        {/* relative — чтобы содержимое лежало поверх пятен света */}
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

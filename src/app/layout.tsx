import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingResumeButton from '@/components/FloatingResumeButton'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Илья Якупов - Product Manager',
  description: 'Portfolio of Ilya Yakupov, Product Manager with 7+ years of experience in HotelTech and TravelTech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingResumeButton />
      </body>
    </html>
  )
}

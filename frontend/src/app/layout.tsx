import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GrowDiaries 2.0 - Open Grow Log Platform',
  description: 'Track and share your growing journey with the community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 GrowDiaries 2.0 - Open Source Grow Log Platform</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

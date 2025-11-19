import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'homegrowbook 2.0 - Open Grow Log Platform',
  description: 'Track and share your growing journey with the community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className="font-sans">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-100 dark:bg-black py-8 mt-16 border-t dark:border-neon-green/20">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p className="font-bold">&copy; 2024 homegrowbook 2.0 - Open Source Grow Log Platform</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HomeGrowBook - Professionelles Grow-Tagebuch',
  description: 'Dokumentiere deinen Grow professionell - Von der Keimung bis zur Ernte. Die moderne Plattform für Cannabis-Grower.',
  keywords: 'grow diary, cannabis, growing, tagebuch, homegrow, cultivation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`dark ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
          {children}
        </main>
        <footer className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-950 dark:to-black py-12 mt-20 border-t-2 border-primary-500/20 dark:border-primary-500/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-black text-primary-600 dark:text-primary-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🌿</span> HomeGrowBook
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Die professionelle Plattform für Cannabis-Grower. Dokumentiere jeden Grow von der Keimung bis zur Ernte.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-4">Platform</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/runs" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Tagebücher</Link></li>
                  <li><Link href="/runs/trending" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Trending</Link></li>
                  <li><Link href="/auth/register" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Registrieren</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-4">Features</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>📊 Messungen tracken</li>
                  <li>📸 Foto-Galerie</li>
                  <li>💬 Community</li>
                  <li>📈 Statistiken</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-4">Open Source</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  100% Open Source & kostenlos
                </p>
                <a 
                  href="https://github.com/homegrowbook-cmd/Test" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                &copy; 2024 HomeGrowBook - Open Source Grow-Tagebuch Platform
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Built with ❤️ by the HomeGrowBook Community
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

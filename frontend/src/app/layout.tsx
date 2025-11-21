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
        <div className="w-full max-w-[1040px] mx-auto px-4 py-4 md:px-6 md:py-6 min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 mt-6 md:mt-8">
            {children}
          </main>
          <footer className="mt-6 pt-3.5 border-t text-xs flex flex-wrap justify-between gap-2"
                  style={{
                    borderColor: 'rgba(32, 40, 52, 0.9)',
                    color: 'var(--text-muted)'
                  }}>
            <span>&copy; {new Date().getFullYear()} homegrowbook 2.0 - Open Source Grow Log Platform</span>
            <span>
              Follow on{' '}
              <a href="https://instagram.com/homegrowbook" target="_blank" rel="noreferrer" 
                 className="hover:underline" style={{color: 'var(--accent)'}}>
                Instagram
              </a>
              {' · '}
              <a href="https://www.youtube.com/@HOMEGROWBOOK" target="_blank" rel="noreferrer"
                 className="hover:underline" style={{color: 'var(--accent)'}}>
                YouTube
              </a>
            </span>
          </footer>
        </div>
      </body>
    </html>
  )
}

import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section with Split Layout */}
      <div className="hero-section p-6 md:p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <section className="flex flex-col gap-6">
            {/* Label Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill w-fit text-xs uppercase tracking-widest font-medium"
                 style={{
                   background: 'rgba(9, 15, 22, 0.86)',
                   border: '1px solid var(--accent-border)',
                   color: 'var(--accent)'
                 }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: 'var(--accent)',
                      boxShadow: '0 0 16px rgba(87, 255, 146, 0.8)'
                    }}>
              </span>
              <span>🌿 Die beste Grow-Tagebuch Plattform</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block" style={{color: 'var(--text-main)'}}>
                Smart Indoor Growing
              </span>
              <span className="block mt-2" style={{color: 'var(--accent)'}}>
                mit homegrowbook
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg leading-relaxed" style={{color: 'var(--text-muted)'}}>
              Ein vollautomatisiertes Grow-System auf Basis von <strong style={{color: 'var(--text-main)'}}>Raspberry Pi</strong>,{' '}
              <strong style={{color: 'var(--text-main)'}}>Home Assistant</strong>, Sensoren & Dokumentation.
              Alles offen, transparent und für alle Grower nutzbar.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/register" className="btn-accent">
                <span>Kostenlos starten</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/runs" className="btn-ghost">
                <span>Tagebücher entdecken</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Badge Pills */}
            <div className="flex flex-wrap gap-2.5 mt-3">
              <div className="pill">
                <strong>Raspberry&nbsp;Pi</strong> als Grow-Hub
              </div>
              <div className="pill">
                Automationen mit Home&nbsp;Assistant
              </div>
              <div className="pill">
                Sensoren, VPD, Licht &amp; Klima
              </div>
            </div>
          </section>

          {/* Right Column - Visual/Mockup */}
          <aside className="relative">
            <div className="card p-6">
              {/* Mock Header */}
              <div className="flex justify-between items-center mb-5 pb-4 border-b"
                   style={{borderColor: 'var(--border-subtle)'}}>
                <div className="flex items-center gap-2 text-sm font-semibold"
                     style={{color: 'var(--text-main)'}}>
                  <span className="w-2 h-2 rounded-full" style={{background: 'var(--accent)'}}></span>
                  <span>Live-Dashboard</span>
                </div>
                <span className="text-xs px-3 py-1 rounded-xl font-semibold"
                      style={{
                        background: 'rgba(87, 255, 146, 0.15)',
                        color: 'var(--accent)'
                      }}>
                  Open Setup
                </span>
              </div>

              {/* Mock Body */}
              <div className="space-y-5">
                <p className="text-sm leading-relaxed" style={{color: 'var(--text-muted)'}}>
                  <strong style={{color: 'var(--text-main)'}}>homegrowbook Grow-Hub</strong><br/>
                  Raspberry&nbsp;Pi + Home&nbsp;Assistant überwachen Klima, Licht
                  und Verbrauch. Alle Einstellungen, Sensoren und Grows werden
                  als offene Dokumentation veröffentlicht.
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                  <div className="metric-card">
                    <div className="text-xs font-medium uppercase tracking-wider"
                         style={{color: 'var(--text-muted)'}}>
                      Zelt · Klima
                    </div>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <strong className="text-2xl" style={{color: 'var(--accent)'}}>24.3°C</strong>
                      <span className="text-sm" style={{color: 'var(--text-muted)'}}>/ 58 % rF</span>
                    </div>
                  </div>
                  <div className="metric-card">
                    <div className="text-xs font-medium uppercase tracking-wider"
                         style={{color: 'var(--text-muted)'}}>
                      Leaf-VPD
                    </div>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <strong className="text-2xl" style={{color: 'var(--accent)'}}>1.25</strong>
                      <span className="text-sm" style={{color: 'var(--text-muted)'}}>kPa · optimal</span>
                    </div>
                  </div>
                  <div className="metric-card sm:col-span-2 lg:col-span-1 xl:col-span-2">
                    <div className="text-xs font-medium uppercase tracking-wider"
                         style={{color: 'var(--text-muted)'}}>
                      Status
                    </div>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <strong className="text-2xl" style={{color: 'var(--accent)'}}>Autonom</strong>
                      <span className="text-sm" style={{color: 'var(--text-muted)'}}>Bewässerung & Logging</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{color: 'var(--text-main)'}}>
            Alles was du brauchst
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{color: 'var(--text-muted)'}}>
            Professionelle Tools für jeden Grower – vom Anfänger bis zum Profi
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="feature-card group">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3"
                 style={{background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'}}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{color: 'var(--text-main)'}}>Grow-Tagebuch</h3>
            <p className="leading-relaxed font-medium" style={{color: 'var(--text-muted)'}}>
              Dokumentiere jeden Tag deines Grows mit detaillierten Einträgen, Fotos und Messungen. Behalte den Überblick über alle wichtigen Entwicklungen.
            </p>
          </div>
          
          <div className="feature-card group">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3"
                 style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{color: 'var(--text-main)'}}>Messungen tracken</h3>
            <p className="leading-relaxed font-medium" style={{color: 'var(--text-muted)'}}>
              Verfolge VPD, EC, pH, PPFD, Temperatur und Luftfeuchtigkeit. Optimiere deine Umgebung für maximale Erträge mit präzisen Daten.
            </p>
          </div>
          
          <div className="feature-card group">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3"
                 style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'}}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{color: 'var(--text-main)'}}>Community</h3>
            <p className="leading-relaxed font-medium" style={{color: 'var(--text-muted)'}}>
              Tausche dich mit tausenden Growern aus, hole dir Feedback und lerne von den Besten. Gemeinsam zu besseren Ernten.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="card p-8 md:p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: 'var(--text-main)'}}>
          Bereit durchzustarten?
        </h2>
        <p className="text-lg font-medium mb-6 max-w-2xl mx-auto" style={{color: 'var(--text-muted)'}}>
          Erstelle dein kostenloses Konto und beginne noch heute, deinen ersten Grow zu dokumentieren
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/auth/register" className="btn-accent text-base px-6 py-3">
            <span>Jetzt kostenlos registrieren</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link href="/runs" className="btn-ghost text-base px-6 py-3">
            <span>Oder Tagebücher ansehen</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

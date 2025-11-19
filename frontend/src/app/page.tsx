import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="hero-section relative overflow-hidden">
        <div className="hero-pattern absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-black text-primary-700 dark:text-primary-400 rounded-full text-sm font-bold mb-4 border dark:border-primary-500/40">
                🌿 Die beste Grow-Tagebuch Plattform
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-clip-text text-transparent">
                Deine Grows
              </span>
              <br />
              <span className="text-gray-800 dark:text-white font-black">
                Professionell dokumentieren
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed animate-fade-in-up animation-delay-200 font-semibold">
              Tracke jeden Fortschritt, teile deine Erfolge und lerne von tausenden Growern weltweit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
              <Link href="/auth/register" className="btn-primary-large group">
                <span>Kostenlos starten</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/runs" className="btn-secondary-large group">
                <span>Tagebücher entdecken</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400 animate-fade-in animation-delay-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Kostenlos</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Community-driven</span>
              </div>
            </div>
          </div>
        </div>
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white dark:fill-black"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-white">
            Alles was du brauchst
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-semibold">
            Professionelle Tools für jeden Grower – vom Anfänger bis zum Profi
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="feature-card group">
            <div className="feature-icon bg-gradient-to-br from-blue-500 to-blue-600">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-gray-800 dark:text-white">Grow-Tagebuch</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
              Dokumentiere jeden Tag deines Grows mit detaillierten Einträgen, Fotos und Messungen. Behalte den Überblick über alle wichtigen Entwicklungen.
            </p>
            <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
              <span>Mehr erfahren</span>
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <div className="feature-card group">
            <div className="feature-icon bg-gradient-to-br from-green-500 to-green-600">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-gray-800 dark:text-white">Messungen tracken</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Verfolge VPD, EC, pH, PPFD, Temperatur und Luftfeuchtigkeit. Optimiere deine Umgebung für maximale Erträge mit präzisen Daten.
            </p>
            <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
              <span>Mehr erfahren</span>
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <div className="feature-card group">
            <div className="feature-icon bg-gradient-to-br from-purple-500 to-purple-600">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-gray-800 dark:text-white">Community</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Tausche dich mit tausenden Growern aus, hole dir Feedback und lerne von den Besten. Gemeinsam zu besseren Ernten.
            </p>
            <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
              <span>Mehr erfahren</span>
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-black rounded-full mb-4 border dark:border-primary-500/40">
              <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-2">Foto-Upload</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Unbegrenzte Fotos hochladen</p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-black rounded-full mb-4 border dark:border-primary-500/40">
              <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-2">Kommentare</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Feedback von der Community</p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-black rounded-full mb-4 border dark:border-primary-500/40">
              <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-2">Likes & Follows</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Vernetze dich mit Growern</p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-black rounded-full mb-4 border dark:border-primary-500/40">
              <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-2">Trending</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Entdecke beliebte Grows</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section relative overflow-hidden">
        <div className="stats-pattern absolute inset-0 opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white dark:text-primary-400 mb-4">
              Join unserer wachsenden Community
            </h2>
            <p className="text-xl text-white/90 dark:text-gray-300 font-semibold">
              Tausende Grower vertrauen bereits auf homegrowbook
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="stat-card">
              <div className="text-5xl md:text-6xl font-black text-white dark:text-primary-400 mb-2 stat-number">1000+</div>
              <div className="text-lg text-white/90 dark:text-gray-300 font-bold">Aktive Grower</div>
            </div>
            <div className="stat-card">
              <div className="text-5xl md:text-6xl font-black text-white dark:text-primary-400 mb-2 stat-number">5000+</div>
              <div className="text-lg text-white/90 dark:text-gray-300 font-bold">Grow Tagebücher</div>
            </div>
            <div className="stat-card">
              <div className="text-5xl md:text-6xl font-black text-white dark:text-primary-400 mb-2 stat-number">50000+</div>
              <div className="text-lg text-white/90 dark:text-gray-300 font-bold">Einträge</div>
            </div>
            <div className="stat-card">
              <div className="text-5xl md:text-6xl font-black text-white dark:text-primary-400 mb-2 stat-number">200+</div>
              <div className="text-lg text-white/90 dark:text-gray-300 font-bold">Sorten</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="cta-card max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-white">
              Bereit durchzustarten?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-semibold">
              Erstelle dein kostenloses Konto und beginne noch heute, deinen ersten Grow zu dokumentieren
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register" className="btn-primary-large">
                <span>Jetzt kostenlos registrieren</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/runs" className="text-gray-600 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-500 font-bold transition-colors flex items-center">
                <span>Oder Tagebücher ansehen</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

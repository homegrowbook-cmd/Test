import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Modern & Bold */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-950 dark:via-black dark:to-gray-900">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-grid-primary-100/50 dark:bg-grid-primary-950/50" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '48px 48px',
          opacity: 0.1
        }}></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-bold shadow-lg border-2 border-primary-200 dark:border-primary-800">
                <span className="text-xl">🌿</span>
                Professionelles Grow-Tagebuch
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-center mb-8 animate-fade-in-up">
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4">
                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-green-600 dark:from-primary-400 dark:via-primary-500 dark:to-green-400 bg-clip-text text-transparent">
                  HomeGrowBook
                </span>
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200">
                Dokumentiere deinen Grow wie ein Profi
              </span>
            </h1>

            {/* Description */}
            <p className="text-center text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Von der Keimung bis zur Ernte - Tracke jeden Fortschritt mit Fotos, Messungen und detaillierten Einträgen. 
              <strong className="text-primary-600 dark:text-primary-400"> Werde Teil der Community!</strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-400">
              <Link 
                href="/auth/register" 
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white text-lg font-black rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group"
              >
                <span>Jetzt kostenlos starten</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/runs" 
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 text-lg font-black rounded-2xl transition-all shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3 group"
              >
                <span>Tagebücher entdecken</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
            </div>

            {/* Features badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm animate-fade-in animation-delay-600">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 rounded-full backdrop-blur-sm">
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-gray-700 dark:text-gray-300">100% Kostenlos</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 rounded-full backdrop-blur-sm">
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-gray-700 dark:text-gray-300">Open Source</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 rounded-full backdrop-blur-sm">
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-bold text-gray-700 dark:text-gray-300">Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features - Bold Icons */}
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white">
            Alles für deinen perfekten Grow
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-semibold">
            Professionelle Tools, die jeden Grow dokumentieren und optimieren
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-2 group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-white">📔 Grow-Tagebuch</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-medium">
              Dokumentiere jeden einzelnen Tag mit Einträgen, Fotos und Notizen. Timeline-Ansicht für perfekte Übersicht.
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
              <span>Mehr erfahren</span>
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-2 group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-white">📊 Messungen</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-medium">
              VPD, EC, pH, PPFD, Temperatur & Luftfeuchtigkeit. Mit bunten Icons und Diagrammen für optimale Erträge.
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
              <span>Mehr erfahren</span>
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-2 group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-white">📸 Foto-Galerie</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-medium">
              Unbegrenzte Fotos hochladen. Vergleiche Wachstumsphasen mit horizontaler Galerie-Ansicht.
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
              <span>Mehr erfahren</span>
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-2 group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-white">💬 Community</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-medium">
              Tausche dich aus, hole Feedback und lerne von Profis. Kommentare, Likes und Follows.
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
              <span>Mehr erfahren</span>
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-2 group">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-white">🔥 Trending</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-medium">
              Entdecke die beliebtesten Grows, lerne von erfolgreichen Techniken und lass dich inspirieren.
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
              <span>Mehr erfahren</span>
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-2 group">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-white">🎯 Phasen-Tracking</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-medium">
              Von Keimling über Vegi bis zur Blüte. Automatische Phasen-Erkennung und Zeiterfassung.
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
              <span>Mehr erfahren</span>
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Bold & Colorful */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-green-600 dark:from-primary-900 dark:via-primary-800 dark:to-green-900">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
        
        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Werde Teil unserer Community
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-semibold max-w-2xl mx-auto">
              Tausende Grower dokumentieren bereits ihre Erfolge
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center transform hover:scale-110 transition-all">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3">1K+</div>
              <div className="text-lg md:text-xl text-white/90 font-bold">Aktive Grower</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-all">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3">5K+</div>
              <div className="text-lg md:text-xl text-white/90 font-bold">Tagebücher</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-all">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3">50K+</div>
              <div className="text-lg md:text-xl text-white/90 font-bold">Einträge</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-all">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3">200+</div>
              <div className="text-lg md:text-xl text-white/90 font-bold">Sorten</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-4xl p-12 lg:p-16 shadow-2xl border-2 border-primary-100 dark:border-primary-900">
          <div className="text-center">
            <div className="text-6xl mb-6">🌱</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white">
              Bereit für deinen ersten Grow?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-semibold">
              Erstelle jetzt dein kostenloses Konto und beginne, deinen Grow professionell zu dokumentieren
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/auth/register" 
                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white text-xl font-black rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span>Kostenlos registrieren</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/runs" 
                className="w-full sm:w-auto text-lg font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-colors flex items-center justify-center gap-2"
              >
                <span>Oder Tagebücher ansehen</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

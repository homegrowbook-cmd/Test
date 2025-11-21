'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white dark:bg-gray-950 shadow-sm border-b-2 border-primary-500/20 dark:border-primary-500/30 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-950/95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo - More prominent */}
          <Link href="/" className="flex items-center gap-3 text-2xl md:text-3xl font-black text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-all hover:scale-105">
            <span className="text-3xl md:text-4xl">🌿</span>
            <span className="hidden sm:inline bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
              HomeGrowBook
            </span>
            <span className="sm:hidden bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
              HGB
            </span>
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link href="/runs" className="px-4 py-2 font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all">
              🔍 Entdecken
            </Link>
            <Link href="/runs/trending" className="px-4 py-2 font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all">
              🔥 Trending
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/runs/new" 
                  className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden lg:inline">Neues Tagebuch</span>
                  <span className="lg:hidden">Neu</span>
                </Link>
                <Link 
                  href={`/users/${user.username}`} 
                  className="px-4 py-2 font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profil
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 font-bold text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className="px-4 py-2 font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Registrieren
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button - Enhanced */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation - Enhanced */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t dark:border-primary-500/20 mt-2 pt-4">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/runs" 
                className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                🔍 Entdecken
              </Link>
              <Link 
                href="/runs/trending" 
                className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                🔥 Trending
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/runs/new" 
                    className="px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-2 justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Neues Tagebuch
                  </Link>
                  <Link 
                    href={`/users/${user.username}`} 
                    className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profil
                  </Link>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="px-4 py-3 font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-xl transition-all text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl transition-all shadow-md text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrieren
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

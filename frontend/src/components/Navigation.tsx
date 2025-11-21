'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white/95 dark:bg-black/95 backdrop-blur-sm shadow-soft border-b border-gray-200 dark:border-primary-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-all duration-300 transform hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="homegrowbook logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <span>homegrowbook</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/runs" className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 relative group">
              <span>Explore</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/runs/trending" className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 relative group">
              <span>Trending</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            {user ? (
              <>
                <Link href="/runs/new" className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 relative group">
                  <span>New Diary</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-200 group-hover:w-full"></span>
                </Link>
                <Link href={`/users/${user.username}`} className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 relative group">
                  <span>Profile</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-200 group-hover:w-full"></span>
                </Link>
                <button
                  onClick={logout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 relative group">
                  <span>Login</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-200 group-hover:w-full"></span>
                </Link>
                <Link href="/auth/register" className="btn-primary transform hover:scale-105 transition-transform duration-200">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800 mt-2 pt-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link href="/runs" className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                Explore
              </Link>
              <Link href="/runs/trending" className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                Trending
              </Link>
              
              {user ? (
                <>
                  <Link href="/runs/new" className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                    New Diary
                  </Link>
                  <Link href={`/users/${user.username}`} className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="btn-secondary text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-700 dark:text-gray-200 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                    Login
                  </Link>
                  <Link href="/auth/register" className="btn-primary text-center">
                    Sign Up
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

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white dark:bg-black shadow-lg border-b border-gray-200 dark:border-neon-green/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-neon-green hover:text-neon-lime transition-colors">
            🌿 homegrowbook
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/runs" className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
              Explore
            </Link>
            <Link href="/runs/trending" className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
              Trending
            </Link>
            
            {user ? (
              <>
                <Link href="/runs/new" className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
                  New Diary
                </Link>
                <Link href={`/users/${user.username}`} className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
                  Profile
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
                <Link href="/auth/login" className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
                  Login
                </Link>
                <Link href="/auth/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 dark:text-neon-green"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/runs" className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
                Explore
              </Link>
              <Link href="/runs/trending" className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
                Trending
              </Link>
              
              {user ? (
                <>
                  <Link href="/runs/new" className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
                    New Diary
                  </Link>
                  <Link href={`/users/${user.username}`} className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
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
                  <Link href="/auth/login" className="font-bold hover:text-neon-green dark:hover:text-neon-green transition-colors">
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

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-[1040px] px-4">
      <div className="flex justify-between items-center gap-4 px-3.5 py-2.5 rounded-lg backdrop-blur-nav border transition-all"
           style={{
             background: 'rgba(6, 9, 12, 0.96)',
             borderColor: 'var(--border-subtle)',
             boxShadow: 'var(--shadow-nav)'
           }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="homegrowbook logo" 
            width={32} 
            height={32}
            className="rounded-lg flex-shrink-0"
            priority
          />
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-base font-semibold tracking-tight" style={{color: 'var(--text-main)'}}>
              homegrowbook
            </span>
            <span className="text-[0.7rem] uppercase tracking-widest" style={{color: 'var(--text-muted)'}}>
              Smart Indoor Growing
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/runs" className="btn-ghost">
            Explore
          </Link>
          <Link href="/runs/trending" className="btn-ghost">
            Trending
          </Link>
          
          {user ? (
            <>
              <Link href="/runs/new" className="btn-ghost">
                New Diary
              </Link>
              <Link href={`/users/${user.username}`} className="btn-ghost">
                Profile
              </Link>
              <button
                onClick={logout}
                className="btn-ghost"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-ghost">
                Login
              </Link>
              <Link href="/auth/register" className="btn-accent">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          style={{color: 'var(--text-main)'}}
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
        <div className="md:hidden mt-2 p-4 rounded-lg backdrop-blur-nav border animate-fade-in"
             style={{
               background: 'rgba(6, 9, 12, 0.96)',
               borderColor: 'var(--border-subtle)',
               boxShadow: 'var(--shadow-nav)'
             }}>
          <div className="flex flex-col gap-2">
            <Link href="/runs" className="btn-ghost justify-start">
              Explore
            </Link>
            <Link href="/runs/trending" className="btn-ghost justify-start">
              Trending
            </Link>
            
            {user ? (
              <>
                <Link href="/runs/new" className="btn-ghost justify-start">
                  New Diary
                </Link>
                <Link href={`/users/${user.username}`} className="btn-ghost justify-start">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="btn-ghost justify-start"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn-ghost justify-start">
                  Login
                </Link>
                <Link href="/auth/register" className="btn-accent justify-start">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

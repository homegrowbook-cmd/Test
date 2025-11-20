'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginDemo } = useAuthStore();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(emailOrUsername, password);
      router.push('/runs');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (username: string) => {
    loginDemo(username);
    router.push('/runs');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="card max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Login to homegrowbook</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email or Username
            </label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-primary-600 hover:underline">
            Sign up
          </Link>
        </p>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">
            🎭 Try Demo Mode
          </h2>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
            Explore the UI without backend connectivity
          </p>
          <div className="space-y-2">
            <button
              onClick={() => handleDemoLogin('alice_grower')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm"
            >
              👩‍🌾 Login as Alice (Grower)
            </button>
            <button
              onClick={() => handleDemoLogin('bob_cultivator')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm"
            >
              👨‍🌾 Login as Bob (Cultivator)
            </button>
            <button
              onClick={() => handleDemoLogin('charlie_green')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm"
            >
              🌿 Login as Charlie (Green)
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-3">
            Demo mode uses mock data and doesn&apos;t require a backend server
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { User, Run } from '@/types';
import { useAuthStore } from '@/store/authStore';

export default function UserProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { user: currentUser } = useAuthStore();

  const [user, setUser] = useState<User | null>(null);
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (username) {
      fetchUserProfile();
      fetchUserRuns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${username}`);
      setUser(response.data);
      setError('');

      if (currentUser && currentUser.id !== response.data.id) {
        checkFollowStatus(response.data.id);
      }
    } catch (err: any) {
      console.error('Failed to fetch user:', err);
      setError(err.response?.data?.message || 'Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRuns = async () => {
    try {
      const response = await api.get(`/users/${username}/runs`);
      setRuns(response.data.runs || response.data);
    } catch (err) {
      console.error('Failed to fetch user runs:', err);
    }
  };

  const checkFollowStatus = async (userId: string) => {
    try {
      const response = await api.get(`/follows/check/${userId}`);
      setIsFollowing(response.data.isFollowing);
    } catch (err) {
      console.error('Failed to check follow status:', err);
    }
  };

  const handleFollow = async () => {
    if (!currentUser || !user) {
      return;
    }

    try {
      if (isFollowing) {
        await api.delete(`/follows/${user.id}`);
        setIsFollowing(false);
      } else {
        await api.post(`/follows/${user.id}`);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Failed to toggle follow:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'User not found'}
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="card mb-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-primary-200 dark:bg-primary-800 rounded-full flex items-center justify-center text-4xl">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              '👤'
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">{user.username}</h1>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>

              {!isOwnProfile && currentUser && (
                <button
                  onClick={handleFollow}
                  className={isFollowing ? 'btn-secondary' : 'btn-primary'}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}

              {isOwnProfile && (
                <Link href="/settings" className="btn-secondary">
                  Edit Profile
                </Link>
              )}
            </div>

            {user.bio && (
              <p className="text-gray-700 dark:text-gray-300 mb-4">{user.bio}</p>
            )}

            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600"
                >
                  🌐 Website
                </a>
              )}
              {user.instagram && (
                <a
                  href={`https://instagram.com/${user.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600"
                >
                  📷 Instagram
                </a>
              )}
              {user.twitter && (
                <a
                  href={`https://twitter.com/${user.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600"
                >
                  🐦 Twitter
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User's Runs */}
      <div>
        <h2 className="text-3xl font-bold mb-6">
          {isOwnProfile ? 'My Diaries' : `${user.username}'s Diaries`}
        </h2>

        {runs.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isOwnProfile ? "You haven't created any diaries yet." : 'No diaries yet.'}
            </p>
            {isOwnProfile && (
              <Link href="/runs/new" className="btn-primary">
                Create Your First Diary
              </Link>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {runs.map((run) => (
              <Link key={run.id} href={`/runs/${run.id}`}>
                <div className="card hover:shadow-xl transition-shadow cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold line-clamp-2">{run.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPhaseColor(run.phase)}`}>
                      {run.phase}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <strong>Strain:</strong> {run.strainName}
                    </div>
                    {run.strainType && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {run.strainType}
                      </div>
                    )}
                  </div>

                  {run.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {run.description}
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{new Date(run.createdAt).toLocaleDateString()}</span>
                      <div className="flex gap-3">
                        <span>❤️ {run._count?.likes || 0}</span>
                        <span>💬 {run._count?.comments || 0}</span>
                        <span>📝 {run._count?.entries || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getPhaseColor(phase: string) {
  switch (phase) {
    case 'SEEDLING':
      return 'bg-yellow-200 text-yellow-800';
    case 'VEGETATIVE':
      return 'bg-green-200 text-green-800';
    case 'FLOWERING':
      return 'bg-purple-200 text-purple-800';
    case 'DRYING':
      return 'bg-orange-200 text-orange-800';
    case 'CURING':
      return 'bg-blue-200 text-blue-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}

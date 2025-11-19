'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Run, Entry } from '@/types';
import { useAuthStore } from '@/store/authStore';

export default function RunDetailClient() {
  const router = useRouter();
  const params = useParams();
  const runId = params?.id as string;
  const { user } = useAuthStore();

  const [run, setRun] = useState<Run | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (runId) {
      fetchRunDetails();
      fetchEntries();
      if (user) {
        checkLikeStatus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, user]);

  const fetchRunDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/runs/${runId}`);
      setRun(response.data);
      setError('');
    } catch (err: any) {
      console.error('Failed to fetch run:', err);
      setError(err.response?.data?.message || 'Failed to load run details');
    } finally {
      setLoading(false);
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await api.get(`/runs/${runId}/entries`);
      setEntries(response.data.entries || response.data);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
    }
  };

  const checkLikeStatus = async () => {
    try {
      const response = await api.get(`/likes/runs/${runId}/check`);
      setIsLiked(response.data.isLiked);
    } catch (err) {
      console.error('Failed to check like status:', err);
    }
  };

  const handleLike = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    try {
      if (isLiked) {
        await api.delete(`/likes/runs/${runId}`);
        setIsLiked(false);
        if (run && run._count) {
          setRun({
            ...run,
            _count: { 
              entries: run._count.entries || 0,
              comments: run._count.comments || 0,
              likes: (run._count.likes || 1) - 1 
            },
          });
        }
      } else {
        await api.post(`/likes/runs/${runId}`);
        setIsLiked(true);
        if (run && run._count) {
          setRun({
            ...run,
            _count: { 
              entries: run._count.entries || 0,
              comments: run._count.comments || 0,
              likes: (run._count.likes || 0) + 1 
            },
          });
        }
      }
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this run?')) {
      return;
    }

    try {
      await api.delete(`/runs/${runId}`);
      router.push('/runs');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete run');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !run) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Run not found'}
        </div>
        <div className="mt-4">
          <Link href="/runs" className="btn-primary">
            Back to Runs
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === run.userId;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{run.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <Link
                href={`/users/${run.user?.username}`}
                className="hover:text-primary-600"
              >
                👤 {run.user?.username || 'Unknown'}
              </Link>
              <span className={`px-3 py-1 rounded-full text-sm ${getPhaseColor(run.phase)}`}>
                {run.phase}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {isOwner && (
              <>
                <Link href={`/runs/${run.id}/edit`} className="btn-secondary">
                  Edit
                </Link>
                <button onClick={handleDelete} className="btn-secondary text-red-600">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 ${isLiked ? 'text-red-600' : ''}`}
          >
            ❤️ {run._count?.likes || 0}
          </button>
          <span>💬 {run._count?.comments || 0} Comments</span>
          <span>📝 {run._count?.entries || 0} Entries</span>
        </div>
      </div>

      {/* Details Card */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Grow Details</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Strain</label>
            <p className="font-semibold">{run.strainName}</p>
          </div>

          {run.strainType && (
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Type</label>
              <p className="font-semibold">{run.strainType}</p>
            </div>
          )}

          {run.lightType && (
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Light</label>
              <p className="font-semibold">
                {run.lightType} {run.lightWatts && `(${run.lightWatts}W)`}
              </p>
            </div>
          )}

          {run.medium && (
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Medium</label>
              <p className="font-semibold">{run.medium}</p>
            </div>
          )}

          {run.nutrients && (
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Nutrients</label>
              <p className="font-semibold">{run.nutrients}</p>
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Started</label>
            <p className="font-semibold">
              {new Date(run.startDate).toLocaleDateString()}
            </p>
          </div>

          {run.endDate && (
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Ended</label>
              <p className="font-semibold">
                {new Date(run.endDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {run.description && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {run.description}
            </p>
          </div>
        )}
      </div>

      {/* Entries Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Entries</h2>
          {isOwner && (
            <Link href={`/runs/${run.id}/entries/new`} className="btn-primary">
              + New Entry
            </Link>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No entries yet. Start documenting your grow!
            </p>
            {isOwner && (
              <Link href={`/runs/${run.id}/entries/new`} className="btn-primary">
                Create First Entry
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Link key={entry.id} href={`/runs/${run.id}/entries/${entry.id}`}>
                <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{entry.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Day {entry.dayNumber} • Week {entry.weekNumber}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {entry.content && (
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
                      {entry.content}
                    </p>
                  )}

                  {/* Measurements */}
                  {(entry.temperature || entry.humidity || entry.ph || entry.ec) && (
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      {entry.temperature && <span>🌡️ {entry.temperature}°C</span>}
                      {entry.humidity && <span>💧 {entry.humidity}%</span>}
                      {entry.ph && <span>pH {entry.ph}</span>}
                      {entry.ec && <span>EC {entry.ec}</span>}
                    </div>
                  )}
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
      return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'VEGETATIVE':
      return 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'FLOWERING':
      return 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'DRYING':
      return 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'CURING':
      return 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default:
      return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
}

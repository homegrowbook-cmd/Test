'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Run } from '@/types';

export default function TrendingRunsPage() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingRuns();
  }, []);

  const fetchTrendingRuns = async () => {
    try {
      setLoading(true);
      const response = await api.get('/runs/trending', {
        params: { limit: 20 },
      });
      setRuns(response.data.runs || response.data);
    } catch (error) {
      console.error('Failed to fetch trending runs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🔥 Trending Grow Diaries</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Most popular diaries right now
        </p>
      </div>

      {runs.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No trending runs at the moment.
          </p>
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
                    <span>👤 {run.user?.username || 'Unknown'}</span>
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

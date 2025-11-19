'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Run } from '@/types';

export default function RunsPage() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRuns();
  }, [page]);

  const fetchRuns = async () => {
    try {
      setLoading(true);
      const response = await api.get('/runs', {
        params: { page, limit: 12 },
      });
      setRuns(response.data.runs);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch runs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && page === 1) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Explore Grow Diaries</h1>
        <Link href="/runs/new" className="btn-primary">
          + New Diary
        </Link>
      </div>

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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="btn-secondary disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="btn-secondary disabled:opacity-50"
          >
            Next
          </button>
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

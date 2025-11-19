'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Entry, Run } from '@/types';
import { useAuthStore } from '@/store/authStore';

export default function EntryDetailClient() {
  const router = useRouter();
  const params = useParams();
  const runId = params?.id as string;
  const entryId = params?.entryId as string;
  const { user } = useAuthStore();

  const [entry, setEntry] = useState<Entry | null>(null);
  const [run, setRun] = useState<Run | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (runId && entryId) {
      fetchEntryDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, entryId]);

  const fetchEntryDetails = async () => {
    try {
      setLoading(true);
      const [entryResponse, runResponse] = await Promise.all([
        api.get(`/runs/${runId}/entries/${entryId}`),
        api.get(`/runs/${runId}`),
      ]);
      setEntry(entryResponse.data);
      setRun(runResponse.data);
      setError('');
    } catch (err: any) {
      console.error('Failed to fetch entry:', err);
      setError(err.response?.data?.message || 'Failed to load entry details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      await api.delete(`/runs/${runId}/entries/${entryId}`);
      router.push(`/runs/${runId}`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete entry');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Entry not found'}
        </div>
        <div className="mt-4">
          <Link href={`/runs/${runId}`} className="btn-primary">
            Back to Run
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === entry.userId;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/runs" className="hover:text-primary-600">
          Runs
        </Link>
        {' / '}
        <Link href={`/runs/${runId}`} className="hover:text-primary-600">
          {run?.title || 'Run'}
        </Link>
        {' / '}
        <span className="text-gray-900 dark:text-white">Entry</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{entry.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <span>Day {entry.dayNumber}</span>
              <span>•</span>
              <span>Week {entry.weekNumber}</span>
              <span>•</span>
              <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {isOwner && (
            <div className="flex gap-2">
              <Link href={`/runs/${runId}/entries/${entryId}/edit`} className="btn-secondary">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn-secondary text-red-600">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Images */}
      {entry.images && entry.images.length > 0 && (
        <div className="mb-8 grid md:grid-cols-2 gap-4">
          {entry.images.map((image, idx) => (
            <div key={idx} className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Entry image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      {entry.content && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">Update</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{entry.content}</p>
          </div>
        </div>
      )}

      {/* Measurements */}
      {(entry.temperature || entry.humidity || entry.vpd || entry.ec || entry.ph || entry.ppfd) && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">Measurements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {entry.temperature !== null && entry.temperature !== undefined && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Temperature</label>
                <p className="text-2xl font-bold">🌡️ {entry.temperature}°C</p>
              </div>
            )}

            {entry.humidity !== null && entry.humidity !== undefined && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Humidity</label>
                <p className="text-2xl font-bold">💧 {entry.humidity}%</p>
              </div>
            )}

            {entry.vpd !== null && entry.vpd !== undefined && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">VPD</label>
                <p className="text-2xl font-bold">{entry.vpd} kPa</p>
              </div>
            )}

            {entry.ph !== null && entry.ph !== undefined && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">pH</label>
                <p className="text-2xl font-bold">{entry.ph}</p>
              </div>
            )}

            {entry.ec !== null && entry.ec !== undefined && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">EC</label>
                <p className="text-2xl font-bold">{entry.ec} mS/cm</p>
              </div>
            )}

            {entry.ppfd !== null && entry.ppfd !== undefined && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">PPFD</label>
                <p className="text-2xl font-bold">☀️ {entry.ppfd} µmol/m²/s</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href={`/runs/${runId}`} className="btn-secondary">
          ← Back to Run
        </Link>
      </div>
    </div>
  );
}

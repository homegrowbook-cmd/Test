'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Entry, Run } from '@/types';
import EntryForm from '@/components/entries/EntryForm';

export default function EditEntryClient() {
  const router = useRouter();
  const params = useParams();
  const runId = params?.id as string;
  const entryId = params?.entryId as string;
  const { user, isHydrated } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [entry, setEntry] = useState<Entry | null>(null);
  const [run, setRun] = useState<Run | null>(null);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/auth/login');
    }
    if (runId && entryId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, user, runId, entryId]);

  const fetchData = async () => {
    try {
      setFetchLoading(true);
      const [entryResponse, runResponse] = await Promise.all([
        api.get(`/runs/${runId}/entries/${entryId}`),
        api.get(`/runs/${runId}`),
      ]);
      setEntry(entryResponse.data);
      setRun(runResponse.data);
      
      // Check if current user is the owner
      if (user && entryResponse.data.userId !== user.id) {
        setError('You do not have permission to edit this entry');
      }
    } catch (err: any) {
      console.error('Failed to fetch data:', err);
      setError(err.response?.data?.message || 'Failed to load entry details');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    setError('');
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        content: formData.content || undefined,
        dayNumber: parseInt(formData.dayNumber.toString()),
        weekNumber: parseInt(formData.weekNumber.toString()),
        temperature: formData.temperature ? parseFloat(formData.temperature) : undefined,
        humidity: formData.humidity ? parseFloat(formData.humidity) : undefined,
        vpd: formData.vpd ? parseFloat(formData.vpd) : undefined,
        ec: formData.ec ? parseFloat(formData.ec) : undefined,
        ph: formData.ph ? parseFloat(formData.ph) : undefined,
        ppfd: formData.ppfd ? parseInt(formData.ppfd) : undefined,
        images: formData.images,
      };

      await api.put(`/runs/${runId}/entries/${entryId}`, payload);
      router.push(`/runs/${runId}/entries/${entryId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update entry. Please try again.');
      throw err; // Let the form handle the error state
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/runs/${runId}/entries/${entryId}`);
  };

  if (!isHydrated || fetchLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (error || !entry) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Entry not found'}
        </div>
        <div className="flex gap-4">
          <Link href={`/runs/${runId}`} className="btn-secondary">
            Back to Run
          </Link>
          {entry && (
            <Link href={`/runs/${runId}/entries/${entryId}`} className="btn-secondary">
              Back to Entry
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Prepare initial data for the form
  const initialData = {
    title: entry.title,
    content: entry.content || '',
    dayNumber: entry.dayNumber,
    weekNumber: entry.weekNumber,
    temperature: entry.temperature?.toString() || '',
    humidity: entry.humidity?.toString() || '',
    vpd: entry.vpd?.toString() || '',
    ec: entry.ec?.toString() || '',
    ph: entry.ph?.toString() || '',
    ppfd: entry.ppfd?.toString() || '',
    images: entry.images || [],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
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
        <Link href={`/runs/${runId}/entries/${entryId}`} className="hover:text-primary-600">
          Entry
        </Link>
        {' / '}
        <span className="text-gray-900 dark:text-white">Edit</span>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Edit Entry</h1>
        {run && (
          <p className="text-gray-600 dark:text-gray-400">
            For grow diary: <span className="font-semibold">{run.title}</span>
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <EntryForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save Changes"
        loading={loading}
      />
    </div>
  );
}

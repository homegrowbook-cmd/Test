'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import RunForm from '@/components/runs/RunForm';
import { Run } from '@/types';

export default function EditRunClient() {
  const router = useRouter();
  const params = useParams();
  const runId = params?.id as string;
  const { user, isHydrated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [run, setRun] = useState<Run | null>(null);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/auth/login');
    }
    if (runId && user) {
      fetchRunDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, user, runId, router]);

  const fetchRunDetails = async () => {
    try {
      setFetchLoading(true);
      const response = await api.get(`/runs/${runId}`);
      setRun(response.data);
      
      // Check if user is the owner
      if (response.data.userId !== user?.id) {
        setError('You do not have permission to edit this run.');
      }
    } catch (err: any) {
      console.error('Failed to fetch run:', err);
      setError(err.response?.data?.message || 'Failed to load run details');
    } finally {
      setFetchLoading(false);
    }
  };

  if (!isHydrated || !user || fetchLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !run) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Run not found'}
        </div>
        <button onClick={() => router.back()} className="btn-secondary">
          Go Back
        </button>
      </div>
    );
  }

  const handleSubmit = async (formData: any) => {
    setError('');
    setLoading(true);

    try {
      const { startDate, ...rest } = formData;
      const payload = {
        ...rest,
        lightWatts: formData.lightWatts ? parseFloat(formData.lightWatts) : undefined,
      };

      await api.put(`/runs/${runId}`, payload);
      router.push(`/runs/${runId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update run. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/runs/${runId}`);
  };

  const initialData = {
    title: run.title,
    description: run.description || '',
    strainName: run.strainName,
    strainType: run.strainType || '',
    lightType: run.lightType || '',
    lightWatts: run.lightWatts?.toString() || '',
    medium: run.medium || '',
    nutrients: run.nutrients || '',
    phase: run.phase,
    startDate: run.startDate ? new Date(run.startDate).toISOString().split('T')[0] : '',
    isPublic: run.isPublic,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Edit Grow Diary</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <RunForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Update Grow Diary"
        loading={loading}
      />
    </div>
  );
}

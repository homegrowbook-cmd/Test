'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import RunForm from '@/components/runs/RunForm';

export default function NewRunPage() {
  const router = useRouter();
  const { user, isHydrated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/auth/login');
    }
  }, [isHydrated, user, router]);

  if (!isHydrated || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
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

      const response = await api.post('/runs', payload);
      router.push(`/runs/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create run. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Create New Grow Diary</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <RunForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}

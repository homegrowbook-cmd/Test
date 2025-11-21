'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import harvestApi, { HarvestData } from '@/lib/harvestApi';
import { Harvest, Run } from '@/types';
import api from '@/lib/api';
import HarvestForm from '@/components/harvest/HarvestForm';
import HarvestDisplay from '@/components/harvest/HarvestDisplay';

export default function HarvestClient() {
  const router = useRouter();
  const params = useParams();
  const runId = params?.id as string;
  const { user, isHydrated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [harvest, setHarvest] = useState<Harvest | null>(null);
  const [run, setRun] = useState<Run | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/auth/login');
    }
    if (runId && isHydrated) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, user, runId, router]);

  const fetchData = async () => {
    try {
      setFetchLoading(true);
      
      // Fetch run details
      const runResponse = await api.get(`/runs/${runId}`);
      setRun(runResponse.data);

      // Fetch harvest data if it exists
      const harvestData = await harvestApi.getByRunId(runId);
      setHarvest(harvestData);
      
      // If no harvest data exists, go to edit mode
      if (!harvestData) {
        setIsEditing(true);
      }
    } catch (err: any) {
      console.error('Failed to fetch data:', err);
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData: HarvestData) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (harvest) {
        // Update existing harvest
        const updated = await harvestApi.update(runId, formData);
        setHarvest(updated);
        setSuccess('Harvest data updated successfully!');
      } else {
        // Create new harvest
        const created = await harvestApi.create(runId, formData);
        setHarvest(created);
        setSuccess('Harvest data created successfully!');
      }
      setIsEditing(false);
    } catch (err: any) {
      console.error('Failed to save harvest:', err);
      setError(err.response?.data?.message || 'Failed to save harvest data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this harvest data? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await harvestApi.delete(runId);
      setHarvest(null);
      setIsEditing(true);
      setSuccess('Harvest data deleted successfully!');
    } catch (err: any) {
      console.error('Failed to delete harvest:', err);
      setError(err.response?.data?.message || 'Failed to delete harvest data');
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated || fetchLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error && !run) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
        <button onClick={() => router.back()} className="px-4 py-2 border border-gray-300 rounded-md">
          Go Back
        </button>
      </div>
    );
  }

  const canEdit = !!(user && run && user.id === run.userId);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <button
          onClick={() => router.push(`/runs/${runId}`)}
          className="text-green-600 hover:text-green-700 text-sm"
        >
          ← Back to Run Details
        </button>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? (harvest ? 'Edit Harvest Data' : 'Add Harvest Data') : 'Harvest Data'}
        </h1>
        {run && (
          <p className="text-gray-600 mt-2">
            For: <span className="font-semibold">{run.title}</span> ({run.strainName})
          </p>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      {/* Content */}
      {isEditing ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <HarvestForm
            initialData={harvest ? {
              harvestDate: harvest.harvestDate,
              wetWeight: harvest.wetWeight?.toString(),
              trimMethod: harvest.trimMethod,
              harvestNotes: harvest.harvestNotes,
              dryingStartDate: harvest.dryingStartDate,
              dryingEndDate: harvest.dryingEndDate,
              dryingTemp: harvest.dryingTemp?.toString(),
              dryingHumidity: harvest.dryingHumidity?.toString(),
              dryWeight: harvest.dryWeight?.toString(),
              dryingNotes: harvest.dryingNotes,
              curingStartDate: harvest.curingStartDate,
              curingMethod: harvest.curingMethod,
              jarCount: harvest.jarCount?.toString(),
              burpingSchedule: harvest.burpingSchedule,
              curingHumidity: harvest.curingHumidity?.toString(),
              curingNotes: harvest.curingNotes,
              finalWeight: harvest.finalWeight?.toString(),
              qualityRating: harvest.qualityRating?.toString(),
              qualityNotes: harvest.qualityNotes,
            } : undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              if (harvest) {
                setIsEditing(false);
              } else {
                router.push(`/runs/${runId}`);
              }
            }}
            submitLabel={harvest ? 'Update Harvest Data' : 'Create Harvest Data'}
            loading={loading}
          />
        </div>
      ) : harvest ? (
        <HarvestDisplay
          harvest={harvest}
          onEdit={canEdit ? () => setIsEditing(true) : undefined}
          onDelete={canEdit ? handleDelete : undefined}
          canEdit={canEdit}
        />
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">No harvest data available for this run.</p>
          {canEdit && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Harvest Data
            </button>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Run, Entry } from '@/types';
import { useAuthStore } from '@/store/authStore';
import PhaseIndicator from '@/components/runs/PhaseIndicator';
import PhaseTransition from '@/components/runs/PhaseTransition';
import EntryTimeline from '@/components/entries/EntryTimeline';

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
      
      // Fallback to mock data for demo mode
      const mockRuns: Record<string, Run> = {
        '1': {
          id: '1',
          userId: 'mock-user-1',
          title: 'First Indoor Grow - Blue Dream',
          description: 'My first attempt at growing Blue Dream indoors. Using a 2x2 tent with LED lighting. Excited to document this journey!',
          strainName: 'Blue Dream',
          strainType: 'Sativa Dominant Hybrid',
          phase: 'vegetative',
          isPublic: true,
          startDate: '2024-10-01T00:00:00Z',
          lightType: 'LED',
          lightWatts: 300,
          medium: 'Soil',
          nutrients: 'Fox Farm Trio',
          createdAt: '2024-10-01T00:00:00Z',
          updatedAt: '2024-11-15T00:00:00Z',
          user: {
            id: 'mock-user-1',
            username: 'GreenThumb420',
            email: 'greenthumb@example.com',
            createdAt: '2024-09-01T00:00:00Z',
            updatedAt: '2024-11-15T00:00:00Z',
          },
          _count: {
            entries: 12,
            comments: 8,
            likes: 24,
          },
        },
        '2': {
          id: '2',
          userId: 'mock-user-2',
          title: 'Organic Outdoor Garden - Multiple Strains',
          description: 'Growing several strains organically in my backyard. Using compost tea and natural pest control methods.',
          strainName: 'Mixed (OG Kush, Northern Lights, Girl Scout Cookies)',
          strainType: 'Mixed',
          phase: 'flowering',
          isPublic: true,
          startDate: '2024-05-15T00:00:00Z',
          lightType: 'Natural Sunlight',
          medium: 'Outdoor Soil',
          nutrients: 'Organic Compost Tea',
          createdAt: '2024-05-15T00:00:00Z',
          updatedAt: '2024-11-15T00:00:00Z',
          user: {
            id: 'mock-user-2',
            username: 'OrganicGrower',
            email: 'organic@example.com',
            createdAt: '2024-05-01T00:00:00Z',
            updatedAt: '2024-11-15T00:00:00Z',
          },
          _count: {
            entries: 45,
            comments: 34,
            likes: 89,
          },
        },
        '3': {
          id: '3',
          userId: 'mock-user-3',
          title: 'Hydroponic Setup - Gorilla Glue #4',
          description: 'Testing out a DWC hydroponic system for the first time with GG4. Closely monitoring EC and pH levels daily.',
          strainName: 'Gorilla Glue #4',
          strainType: 'Hybrid',
          phase: 'flowering',
          isPublic: true,
          startDate: '2024-08-20T00:00:00Z',
          lightType: 'LED',
          lightWatts: 600,
          medium: 'Hydro (DWC)',
          nutrients: 'General Hydroponics Flora Series',
          createdAt: '2024-08-20T00:00:00Z',
          updatedAt: '2024-11-15T00:00:00Z',
          user: {
            id: 'mock-user-3',
            username: 'HydroMaster',
            email: 'hydro@example.com',
            createdAt: '2024-08-01T00:00:00Z',
            updatedAt: '2024-11-15T00:00:00Z',
          },
          _count: {
            entries: 28,
            comments: 19,
            likes: 56,
          },
        },
      };

      const mockRun = mockRuns[runId];
      if (mockRun) {
        setRun(mockRun);
        setError('');
      } else {
        setError(err.response?.data?.message || 'Failed to load run details');
      }
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
      
      // Fallback to mock entries for demo mode
      const mockEntries: Entry[] = [
        {
          id: `entry-${runId}-1`,
          runId: runId,
          dayNumber: 7,
          weekNumber: 1,
          title: 'Week 1 - Seedling Progress',
          content: 'Seedlings are looking healthy! First true leaves are showing.',
          temperature: 24,
          humidity: 65,
          vpd: 0.8,
          createdAt: '2024-10-08T00:00:00Z',
          updatedAt: '2024-10-08T00:00:00Z',
          images: [],
        },
        {
          id: `entry-${runId}-2`,
          runId: runId,
          dayNumber: 14,
          weekNumber: 2,
          title: 'Week 2 - Vegetative Growth Begins',
          content: 'Plants are growing rapidly now. Starting light feeding.',
          temperature: 25,
          humidity: 60,
          vpd: 1.0,
          ph: 6.2,
          ec: 0.8,
          createdAt: '2024-10-15T00:00:00Z',
          updatedAt: '2024-10-15T00:00:00Z',
          images: [],
        },
        {
          id: `entry-${runId}-3`,
          runId: runId,
          dayNumber: 21,
          weekNumber: 3,
          title: 'Week 3 - Bushy Growth',
          content: 'Plants are getting bushy! Time for some LST training.',
          temperature: 26,
          humidity: 58,
          vpd: 1.1,
          ph: 6.3,
          ec: 1.2,
          ppfd: 400,
          createdAt: '2024-10-22T00:00:00Z',
          updatedAt: '2024-10-22T00:00:00Z',
          images: [],
        },
      ];
      
      setEntries(mockEntries);
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

  const handlePhaseChange = async (newPhase: string, note?: string) => {
    try {
      await api.put(`/runs/${runId}`, { phase: newPhase });
      // Refresh run data
      await fetchRunDetails();
      
      // Optionally create an entry to document the phase change
      if (note) {
        try {
          await api.post(`/runs/${runId}/entries`, {
            title: `Phase Change: ${newPhase}`,
            content: note,
            dayNumber: entries.length > 0 ? Math.max(...entries.map(e => e.dayNumber)) + 1 : 1,
            weekNumber: entries.length > 0 ? Math.max(...entries.map(e => e.weekNumber)) : 1,
          });
          await fetchEntries();
        } catch (entryErr) {
          console.error('Failed to create phase change entry:', entryErr);
        }
      }
    } catch (err: any) {
      throw err; // Let the component handle the error
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
              <PhaseIndicator phase={run.phase} />
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

      {/* Phase Transition - Only for owner */}
      {isOwner && (
        <div className="mb-8">
          <PhaseTransition
            currentPhase={run.phase}
            onPhaseChange={handlePhaseChange}
          />
        </div>
      )}

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

        {entries.length === 0 && isOwner ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No entries yet. Start documenting your grow!
            </p>
            <Link href={`/runs/${run.id}/entries/new`} className="btn-primary">
              Create First Entry
            </Link>
          </div>
        ) : (
          <EntryTimeline entries={entries} runId={run.id} />
        )}
      </div>
    </div>
  );
}

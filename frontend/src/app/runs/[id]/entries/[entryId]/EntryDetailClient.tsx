'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Entry, Run } from '@/types';
import { useAuthStore } from '@/store/authStore';
import VPDStatus from '@/components/entries/VPDStatus';

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
      
      // Fallback to mock data for demo mode
      const mockRuns: Record<string, Run> = {
        '1': {
          id: '1',
          userId: 'mock-user-1',
          title: 'First Indoor Grow - Blue Dream',
          description: 'My first attempt at growing Blue Dream indoors. Using a 2x2 tent with LED lighting. Excited to document this journey!',
          strainName: 'Blue Dream',
          strainType: 'Sativa Dominant Hybrid',
          phase: 'VEGETATIVE',
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
            role: 'USER',
            createdAt: '2024-09-01T00:00:00Z',
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
          phase: 'FLOWERING',
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
            role: 'USER',
            createdAt: '2024-05-01T00:00:00Z',
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
          phase: 'FLOWERING',
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
            role: 'USER',
            createdAt: '2024-08-01T00:00:00Z',
          },
          _count: {
            entries: 28,
            comments: 19,
            likes: 56,
          },
        },
      };

      // Mock entries data for demo mode
      const mockEntriesMap: Record<string, Entry> = {
        'entry-1-1': {
          id: 'entry-1-1',
          runId: '1',
          userId: 'mock-user-1',
          dayNumber: 7,
          weekNumber: 1,
          title: 'Week 1 - Seedling Progress',
          content: 'Seedlings are looking healthy! First true leaves are showing. The environment is stable and the plants are responding well to the light schedule.',
          temperature: 24,
          humidity: 65,
          vpd: 0.8,
          createdAt: '2024-10-08T00:00:00Z',
          updatedAt: '2024-10-08T00:00:00Z',
          images: [],
        },
        'entry-1-2': {
          id: 'entry-1-2',
          runId: '1',
          userId: 'mock-user-1',
          dayNumber: 14,
          weekNumber: 2,
          title: 'Week 2 - Vegetative Growth Begins',
          content: 'Plants are growing rapidly now. Starting light feeding with quarter-strength nutrients. The stems are thickening nicely and new growth is vigorous.',
          temperature: 25,
          humidity: 60,
          vpd: 1.0,
          ph: 6.2,
          ec: 0.8,
          createdAt: '2024-10-15T00:00:00Z',
          updatedAt: '2024-10-15T00:00:00Z',
          images: [],
        },
        'entry-1-3': {
          id: 'entry-1-3',
          runId: '1',
          userId: 'mock-user-1',
          dayNumber: 21,
          weekNumber: 3,
          title: 'Week 3 - Bushy Growth',
          content: 'Plants are getting bushy! Time for some LST training. Started bending the main stem to encourage lateral growth. The canopy is developing evenly.',
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
        'entry-2-1': {
          id: 'entry-2-1',
          runId: '2',
          userId: 'mock-user-2',
          dayNumber: 30,
          weekNumber: 4,
          title: 'Flowering Stage Begins',
          content: 'First pistils appearing! The plants have transitioned to flowering beautifully. Applied compost tea and adjusted watering schedule.',
          temperature: 23,
          humidity: 55,
          vpd: 1.2,
          ph: 6.5,
          createdAt: '2024-06-14T00:00:00Z',
          updatedAt: '2024-06-14T00:00:00Z',
          images: [],
        },
        'entry-3-1': {
          id: 'entry-3-1',
          runId: '3',
          userId: 'mock-user-3',
          dayNumber: 35,
          weekNumber: 5,
          title: 'Week 5 - Dense Buds Forming',
          content: 'The buds are swelling nicely! EC is at 1.8 and the plants are feeding heavy. Reservoir temps are stable at 68°F.',
          temperature: 25,
          humidity: 50,
          vpd: 1.4,
          ph: 5.8,
          ec: 1.8,
          ppfd: 650,
          createdAt: '2024-09-24T00:00:00Z',
          updatedAt: '2024-09-24T00:00:00Z',
          images: [],
        },
      };

      const mockRun = mockRuns[runId];
      const mockEntry = mockEntriesMap[entryId];

      if (mockRun && mockEntry) {
        setRun(mockRun);
        setEntry(mockEntry);
        setError('');
      } else {
        setError(err.response?.data?.message || 'Failed to load entry details');
      }
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
                <VPDStatus vpd={entry.vpd} phase={run?.phase} showRecommendation={false} />
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

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Run } from '@/types';
import RunList from '@/components/runs/RunList';

// Mock data for demo purposes when API is not available
const mockRuns: Run[] = [
  {
    id: '1',
    title: 'First Indoor Grow - Blue Dream',
    description: 'My first attempt at growing Blue Dream indoors. Using a 2x2 tent with LED lighting. Excited to document this journey!',
    strainName: 'Blue Dream',
    strainType: 'Sativa Dominant Hybrid',
    isPublic: true,
    lightType: 'LED',
    lightWatts: 240,
    medium: 'Soil',
    nutrients: 'General Hydroponics',
    phase: 'VEGETATIVE',
    startDate: '2025-10-15T00:00:00Z',
    userId: '1',
    user: { id: '1', email: 'grower1@example.com', username: 'GreenThumb420', role: 'user', createdAt: '2025-10-01T00:00:00Z' },
    createdAt: '2025-10-15T00:00:00Z',
    updatedAt: '2025-11-19T00:00:00Z',
    _count: { entries: 12, likes: 24, comments: 8 }
  },
  {
    id: '2',
    title: 'Organic Outdoor Garden - Multiple Strains',
    description: 'Growing several strains organically in my backyard. Using compost tea and natural pest control methods.',
    strainName: 'Mixed (OG Kush, Northern Lights, Girl Scout Cookies)',
    strainType: 'Mixed',
    isPublic: true,
    lightType: 'Natural Sunlight',
    medium: 'Living Soil',
    nutrients: 'Organic Compost Tea',
    phase: 'FLOWERING',
    startDate: '2025-05-01T00:00:00Z',
    userId: '2',
    user: { id: '2', email: 'grower2@example.com', username: 'OrganicGrower', role: 'user', createdAt: '2025-04-15T00:00:00Z' },
    createdAt: '2025-05-01T00:00:00Z',
    updatedAt: '2025-11-19T00:00:00Z',
    _count: { entries: 45, likes: 89, comments: 34 }
  },
  {
    id: '3',
    title: 'Hydroponic Setup - Gorilla Glue #4',
    description: 'Testing out a DWC hydroponic system for the first time with GG4. Closely monitoring EC and pH levels daily.',
    strainName: 'Gorilla Glue #4',
    strainType: 'Hybrid',
    isPublic: true,
    lightType: 'LED',
    lightWatts: 480,
    medium: 'Hydroponic DWC',
    nutrients: 'Advanced Nutrients',
    phase: 'FLOWERING',
    startDate: '2025-09-01T00:00:00Z',
    userId: '3',
    user: { id: '3', email: 'grower3@example.com', username: 'HydroMaster', role: 'user', createdAt: '2025-08-01T00:00:00Z' },
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2025-11-19T00:00:00Z',
    _count: { entries: 28, likes: 56, comments: 19 }
  },
  {
    id: '4',
    title: 'Seedling Stage - Purple Haze',
    description: 'Just started germinating Purple Haze seeds. This strain has been on my wish list for years!',
    strainName: 'Purple Haze',
    strainType: 'Sativa',
    isPublic: true,
    lightType: 'CFL',
    lightWatts: 150,
    medium: 'Coco Coir',
    nutrients: 'Canna Coco',
    phase: 'SEEDLING',
    startDate: '2025-11-10T00:00:00Z',
    userId: '4',
    user: { id: '4', email: 'grower4@example.com', username: 'NewbiePro', role: 'user', createdAt: '2025-11-01T00:00:00Z' },
    createdAt: '2025-11-10T00:00:00Z',
    updatedAt: '2025-11-19T00:00:00Z',
    _count: { entries: 3, likes: 12, comments: 5 }
  },
  {
    id: '5',
    title: 'Drying & Curing - White Widow Harvest',
    description: 'Just harvested my White Widow plants. Now in the drying phase. Can\'t wait to cure these beautiful buds!',
    strainName: 'White Widow',
    strainType: 'Hybrid',
    isPublic: true,
    lightType: 'HPS',
    lightWatts: 600,
    medium: 'Soil',
    nutrients: 'Fox Farm Trio',
    phase: 'DRYING',
    startDate: '2025-06-15T00:00:00Z',
    endDate: '2025-11-10T00:00:00Z',
    userId: '5',
    user: { id: '5', email: 'grower5@example.com', username: 'VeteranGrower', role: 'user', createdAt: '2025-01-01T00:00:00Z' },
    createdAt: '2025-06-15T00:00:00Z',
    updatedAt: '2025-11-19T00:00:00Z',
    _count: { entries: 52, likes: 145, comments: 67 }
  },
  {
    id: '6',
    title: 'Micro Grow - Auto Northern Lights',
    description: 'Growing in a small PC case setup. Autoflower strain perfect for this micro environment.',
    strainName: 'Auto Northern Lights',
    strainType: 'Indica Auto',
    isPublic: true,
    lightType: 'LED',
    lightWatts: 65,
    medium: 'Coco Perlite Mix',
    nutrients: 'BioBizz',
    phase: 'FLOWERING',
    startDate: '2025-10-01T00:00:00Z',
    userId: '6',
    user: { id: '6', email: 'grower6@example.com', username: 'MicroGrower', role: 'user', createdAt: '2025-09-15T00:00:00Z' },
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-11-19T00:00:00Z',
    _count: { entries: 18, likes: 34, comments: 15 }
  }
];

export default function RunsPage() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchRuns = async () => {
    try {
      setLoading(true);
      const response = await api.get('/runs', {
        params: { page, limit: 12 },
      });
      setRuns(response.data.runs);
      setTotalPages(response.data.pagination.totalPages);
      setUsingMockData(false);
    } catch (error) {
      console.error('Failed to fetch runs:', error);
      // Use mock data as fallback for demo purposes
      setRuns(mockRuns);
      setTotalPages(1);
      setUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {usingMockData && (
        <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            <strong>Demo Mode:</strong> Showing example diaries. Connect to a backend API to see real data.
          </p>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Explore Grow Diaries</h1>
        <Link href="/runs/new" className="btn-primary">
          + New Diary
        </Link>
      </div>

      <RunList runs={runs} loading={loading && page === 1} />

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

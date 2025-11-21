'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Run, Entry, Harvest } from '@/types';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, differenceInDays } from 'date-fns';

export default function StatisticsClient() {
  const params = useParams();
  const router = useRouter();
  const runId = params.id as string;

  const [run, setRun] = useState<Run | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [harvest, setHarvest] = useState<Harvest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [runRes, entriesRes] = await Promise.all([
        api.get(`/runs/${runId}`),
        api.get(`/runs/${runId}/entries`),
      ]);

      setRun(runRes.data);
      setEntries(entriesRes.data);

      // Fetch harvest data if available
      if (runRes.data.harvest) {
        setHarvest(runRes.data.harvest);
      }

      setError('');
    } catch (err) {
      console.error('Failed to fetch data:', err);
      
      // Fallback to mock data for demo mode
      const mockRuns: Record<string, { run: Run; entries: Entry[] }> = {
        '1': {
          run: {
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
            lightWatts: 240,
            medium: 'Soil',
            nutrients: 'General Hydroponics',
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
          entries: [
            {
              id: 'entry-1-1',
              runId: '1',
              userId: 'mock-user-1',
              title: 'Week 1 - Seedling Progress',
              content: 'Seedlings are looking healthy! First true leaves are showing.',
              dayNumber: 7,
              weekNumber: 1,
              temperature: 24,
              humidity: 65,
              vpd: 1.1,
              createdAt: '2024-10-08T00:00:00Z',
              updatedAt: '2024-10-08T00:00:00Z',
              images: [],
            },
            {
              id: 'entry-1-2',
              runId: '1',
              userId: 'mock-user-1',
              title: 'Week 2 - Vegetative Growth Begins',
              content: 'Plants are growing rapidly now. Starting light feeding.',
              dayNumber: 14,
              weekNumber: 2,
              temperature: 25,
              humidity: 60,
              vpd: 1.2,
              ph: 6.2,
              ec: 0.8,
              createdAt: '2024-10-15T00:00:00Z',
              updatedAt: '2024-10-15T00:00:00Z',
              images: [],
            },
            {
              id: 'entry-1-3',
              runId: '1',
              userId: 'mock-user-1',
              title: 'Week 3 - Bushy Growth',
              content: 'Plants are getting bushy! Time for some LST training.',
              dayNumber: 21,
              weekNumber: 3,
              temperature: 26,
              humidity: 58,
              vpd: 1.3,
              ph: 6.3,
              ec: 1.2,
              ppfd: 450,
              createdAt: '2024-10-22T00:00:00Z',
              updatedAt: '2024-10-22T00:00:00Z',
              images: [],
            },
            {
              id: 'entry-1-4',
              runId: '1',
              userId: 'mock-user-1',
              title: 'Week 4 - LST Results',
              content: 'LST is working great. Multiple cola sites developing.',
              dayNumber: 28,
              weekNumber: 4,
              temperature: 26,
              humidity: 57,
              vpd: 1.35,
              ph: 6.4,
              ec: 1.4,
              ppfd: 500,
              createdAt: '2024-10-29T00:00:00Z',
              updatedAt: '2024-10-29T00:00:00Z',
              images: [],
            },
            {
              id: 'entry-1-5',
              runId: '1',
              userId: 'mock-user-1',
              title: 'Week 5 - Vigorous Growth',
              content: 'Plants are responding well to nutrients. Very vigorous growth.',
              dayNumber: 35,
              weekNumber: 5,
              temperature: 25,
              humidity: 56,
              vpd: 1.3,
              ph: 6.2,
              ec: 1.6,
              ppfd: 550,
              createdAt: '2024-11-05T00:00:00Z',
              updatedAt: '2024-11-05T00:00:00Z',
              images: [],
            },
          ],
        },
      };

      const mockData = mockRuns[runId];
      if (mockData) {
        setRun(mockData.run);
        setEntries(mockData.entries);
        setError('');
      } else {
        setError('Run not found');
      }
    } finally {
      setLoading(false);
    }
  };

  // Prepare measurement data for charts
  const getMeasurementData = () => {
    return entries
      .sort((a, b) => a.dayNumber - b.dayNumber)
      .map((entry) => ({
        day: entry.dayNumber,
        temperature: entry.temperature,
        humidity: entry.humidity,
        vpd: entry.vpd,
        ph: entry.ph,
        ec: entry.ec,
        ppfd: entry.ppfd,
      }));
  };

  // Calculate phase durations
  const getPhaseDurations = () => {
    if (!run) return [];

    const startDate = new Date(run.startDate);
    const endDate = run.endDate ? new Date(run.endDate) : new Date();
    const totalDays = differenceInDays(endDate, startDate);

    // Group entries by their creation date to estimate phase durations
    const phases = [
      { phase: 'Seedling', duration: 0, color: '#10b981' },
      { phase: 'Vegetative', duration: 0, color: '#3b82f6' },
      { phase: 'Flowering', duration: 0, color: '#a855f7' },
      { phase: 'Drying', duration: 0, color: '#f59e0b' },
      { phase: 'Curing', duration: 0, color: '#ef4444' },
    ];

    // Simple estimation: divide by total entries if no phase tracking
    // In a real implementation, you'd track phase changes in the database
    const phaseIndex = ['SEEDLING', 'VEGETATIVE', 'FLOWERING', 'DRYING', 'CURING'].indexOf(
      run.phase
    );
    
    // Estimate based on current phase
    if (phaseIndex >= 0) {
      phases[0].duration = Math.min(totalDays, 14); // Seedling typically ~2 weeks
      phases[1].duration = Math.min(totalDays - phases[0].duration, 28); // Veg ~4 weeks
      phases[2].duration = Math.min(totalDays - phases[0].duration - phases[1].duration, 56); // Flower ~8 weeks
      
      if (phaseIndex >= 3) {
        phases[3].duration = 7; // Drying ~1 week
      }
      if (phaseIndex >= 4) {
        phases[4].duration = totalDays - phases[0].duration - phases[1].duration - phases[2].duration - phases[3].duration;
      }
    }

    return phases.filter((p) => p.duration > 0);
  };

  // Calculate statistics
  const getStatistics = () => {
    if (!entries.length) {
      return {
        totalEntries: 0,
        totalDays: 0,
        avgTemperature: 0,
        avgHumidity: 0,
        avgVpd: 0,
        avgPh: 0,
        avgEc: 0,
      };
    }

    const entriesWithTemp = entries.filter((e) => e.temperature);
    const entriesWithHumidity = entries.filter((e) => e.humidity);
    const entriesWithVpd = entries.filter((e) => e.vpd);
    const entriesWithPh = entries.filter((e) => e.ph);
    const entriesWithEc = entries.filter((e) => e.ec);

    return {
      totalEntries: entries.length,
      totalDays: run
        ? differenceInDays(
            run.endDate ? new Date(run.endDate) : new Date(),
            new Date(run.startDate)
          )
        : 0,
      avgTemperature: entriesWithTemp.length
        ? (
            entriesWithTemp.reduce((sum, e) => sum + (e.temperature || 0), 0) /
            entriesWithTemp.length
          ).toFixed(1)
        : 0,
      avgHumidity: entriesWithHumidity.length
        ? (
            entriesWithHumidity.reduce((sum, e) => sum + (e.humidity || 0), 0) /
            entriesWithHumidity.length
          ).toFixed(1)
        : 0,
      avgVpd: entriesWithVpd.length
        ? (entriesWithVpd.reduce((sum, e) => sum + (e.vpd || 0), 0) / entriesWithVpd.length).toFixed(
            2
          )
        : 0,
      avgPh: entriesWithPh.length
        ? (entriesWithPh.reduce((sum, e) => sum + (e.ph || 0), 0) / entriesWithPh.length).toFixed(1)
        : 0,
      avgEc: entriesWithEc.length
        ? (entriesWithEc.reduce((sum, e) => sum + (e.ec || 0), 0) / entriesWithEc.length).toFixed(1)
        : 0,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!run) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Run not found</div>
      </div>
    );
  }

  const measurementData = getMeasurementData();
  const phaseDurations = getPhaseDurations();
  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(`/runs/${runId}`)}
            className="text-green-500 hover:text-green-400 mb-4 flex items-center gap-2"
          >
            ← Back to Run
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Statistics & Analytics</h1>
          <p className="text-gray-400">{run.title}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Days</h3>
            <p className="text-3xl font-bold text-white">{stats.totalDays}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Entries</h3>
            <p className="text-3xl font-bold text-white">{stats.totalEntries}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Current Phase</h3>
            <p className="text-2xl font-bold text-green-500">{run.phase}</p>
          </div>
          {harvest && harvest.finalWeight && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm mb-2">Final Yield</h3>
              <p className="text-3xl font-bold text-white">{harvest.finalWeight}g</p>
            </div>
          )}
        </div>

        {/* Average Measurements */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Average Measurements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Temperature</p>
              <p className="text-2xl font-bold text-orange-500">{stats.avgTemperature}°C</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Humidity</p>
              <p className="text-2xl font-bold text-blue-500">{stats.avgHumidity}%</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">VPD</p>
              <p className="text-2xl font-bold text-purple-500">{stats.avgVpd} kPa</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">pH</p>
              <p className="text-2xl font-bold text-green-500">{stats.avgPh}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">EC</p>
              <p className="text-2xl font-bold text-yellow-500">{stats.avgEc} mS/cm</p>
            </div>
          </div>
        </div>

        {/* Harvest Metrics */}
        {harvest && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Harvest Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {harvest.wetWeight && (
                <div>
                  <p className="text-gray-400 text-sm">Wet Weight</p>
                  <p className="text-2xl font-bold text-white">{harvest.wetWeight}g</p>
                </div>
              )}
              {harvest.dryWeight && (
                <div>
                  <p className="text-gray-400 text-sm">Dry Weight</p>
                  <p className="text-2xl font-bold text-white">{harvest.dryWeight}g</p>
                </div>
              )}
              {harvest.yieldPerWatt && (
                <div>
                  <p className="text-gray-400 text-sm">Yield per Watt</p>
                  <p className="text-2xl font-bold text-green-500">{harvest.yieldPerWatt.toFixed(2)} g/W</p>
                </div>
              )}
              {harvest.yieldPerDay && (
                <div>
                  <p className="text-gray-400 text-sm">Yield per Day</p>
                  <p className="text-2xl font-bold text-green-500">{harvest.yieldPerDay.toFixed(2)} g/day</p>
                </div>
              )}
              {harvest.qualityRating && (
                <div>
                  <p className="text-gray-400 text-sm">Quality Rating</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {'⭐'.repeat(harvest.qualityRating)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Phase Duration Chart */}
        {phaseDurations.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Phase Duration (Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={phaseDurations}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="phase" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="duration" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Temperature & Humidity Chart */}
        {measurementData.some((d) => d.temperature || d.humidity) && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Temperature & Humidity Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={measurementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#f97316"
                  name="Temperature (°C)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  name="Humidity (%)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* VPD Chart */}
        {measurementData.some((d) => d.vpd) && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">VPD Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={measurementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="vpd"
                  stroke="#a855f7"
                  name="VPD (kPa)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* pH & EC Chart */}
        {measurementData.some((d) => d.ph || d.ec) && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">pH & EC Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={measurementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ph"
                  stroke="#10b981"
                  name="pH"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="ec"
                  stroke="#eab308"
                  name="EC (mS/cm)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* PPFD Chart */}
        {measurementData.some((d) => d.ppfd) && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">PPFD Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={measurementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ppfd"
                  stroke="#f59e0b"
                  name="PPFD (µmol/m²/s)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* No data message */}
        {entries.length === 0 && (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg mb-4">No entries found for this run.</p>
            <button
              onClick={() => router.push(`/runs/${runId}/entries/new`)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              Create First Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Run } from '@/types';

export default function NewEntryClient() {
  const router = useRouter();
  const params = useParams();
  const runId = params?.id as string;
  const { user, isHydrated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [run, setRun] = useState<Run | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    dayNumber: 1,
    weekNumber: 1,
    temperature: '',
    humidity: '',
    vpd: '',
    ec: '',
    ph: '',
    ppfd: '',
    images: [] as string[],
  });

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/auth/login');
    }
    if (runId) {
      fetchRunDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, user, runId, router]);

  const fetchRunDetails = async () => {
    try {
      const response = await api.get(`/runs/${runId}`);
      setRun(response.data);
    } catch (err) {
      console.error('Failed to fetch run:', err);
      setError('Failed to load run details');
    }
  };

  if (!isHydrated || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      const response = await api.post(`/runs/${runId}/entries`, payload);
      router.push(`/runs/${runId}/entries/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Entry</h1>
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

      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Basic Information */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Entry Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            required
            placeholder="e.g., First signs of flowering!"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description / Notes</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="input"
            rows={6}
            placeholder="Document your observations, what you did today, any changes you noticed..."
          />
        </div>

        {/* Day and Week */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Day Number <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="dayNumber"
              value={formData.dayNumber}
              onChange={handleChange}
              className="input"
              required
              min="1"
              placeholder="e.g., 1"
            />
            <p className="text-sm text-gray-500 mt-1">Days since germination/start</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Week Number <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="weekNumber"
              value={formData.weekNumber}
              onChange={handleChange}
              className="input"
              required
              min="1"
              placeholder="e.g., 1"
            />
            <p className="text-sm text-gray-500 mt-1">Week of the current phase</p>
          </div>
        </div>

        {/* Environmental Measurements */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Environmental Measurements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                className="input"
                step="0.1"
                placeholder="e.g., 24.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Humidity (%)
              </label>
              <input
                type="number"
                name="humidity"
                value={formData.humidity}
                onChange={handleChange}
                className="input"
                step="0.1"
                min="0"
                max="100"
                placeholder="e.g., 65"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                VPD (kPa)
              </label>
              <input
                type="number"
                name="vpd"
                value={formData.vpd}
                onChange={handleChange}
                className="input"
                step="0.01"
                placeholder="e.g., 1.2"
              />
              <p className="text-sm text-gray-500 mt-1">Vapor Pressure Deficit</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                PPFD (µmol/m²/s)
              </label>
              <input
                type="number"
                name="ppfd"
                value={formData.ppfd}
                onChange={handleChange}
                className="input"
                min="0"
                placeholder="e.g., 600"
              />
              <p className="text-sm text-gray-500 mt-1">Photosynthetic Photon Flux Density</p>
            </div>
          </div>
        </div>

        {/* Nutrient Measurements */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Nutrient Measurements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                pH
              </label>
              <input
                type="number"
                name="ph"
                value={formData.ph}
                onChange={handleChange}
                className="input"
                step="0.1"
                min="0"
                max="14"
                placeholder="e.g., 6.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                EC (mS/cm)
              </label>
              <input
                type="number"
                name="ec"
                value={formData.ec}
                onChange={handleChange}
                className="input"
                step="0.1"
                placeholder="e.g., 1.8"
              />
              <p className="text-sm text-gray-500 mt-1">Electrical Conductivity</p>
            </div>
          </div>
        </div>

        {/* Image Upload Placeholder */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Photos</h3>
          <p className="text-sm text-gray-500 mb-4">
            Photo upload feature coming soon. For now, you can add image URLs manually if needed.
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? 'Creating Entry...' : 'Create Entry'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';

export default function NewRunPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    strainName: '',
    strainType: '',
    lightType: '',
    lightWatts: '',
    medium: '',
    nutrients: '',
    phase: 'SEEDLING',
    startDate: new Date().toISOString().split('T')[0],
    isPublic: true,
  });

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Create New Grow Diary</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            required
            placeholder="e.g., First Indoor Grow - Blue Dream"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input"
            rows={4}
            placeholder="Tell us about your grow setup and goals..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Strain Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="strainName"
              value={formData.strainName}
              onChange={handleChange}
              className="input"
              required
              placeholder="e.g., Blue Dream"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Strain Type</label>
            <input
              type="text"
              name="strainType"
              value={formData.strainType}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Sativa Dominant Hybrid"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Light Type</label>
            <input
              type="text"
              name="lightType"
              value={formData.lightType}
              onChange={handleChange}
              className="input"
              placeholder="e.g., LED, HPS, CFL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Light Watts</label>
            <input
              type="number"
              name="lightWatts"
              value={formData.lightWatts}
              onChange={handleChange}
              className="input"
              placeholder="e.g., 240"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Growing Medium</label>
            <input
              type="text"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Soil, Hydro, Coco"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nutrients</label>
            <input
              type="text"
              name="nutrients"
              value={formData.nutrients}
              onChange={handleChange}
              className="input"
              placeholder="e.g., General Hydroponics"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Phase <span className="text-red-600">*</span>
            </label>
            <select
              name="phase"
              value={formData.phase}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="SEEDLING">Seedling</option>
              <option value="VEGETATIVE">Vegetative</option>
              <option value="FLOWERING">Flowering</option>
              <option value="DRYING">Drying</option>
              <option value="CURING">Curing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Start Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="mr-2"
            id="isPublic"
          />
          <label htmlFor="isPublic" className="text-sm">
            Make this diary public (visible to everyone)
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? 'Creating...' : 'Create Grow Diary'}
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

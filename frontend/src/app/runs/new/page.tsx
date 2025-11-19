'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';

export default function NewRunPage() {
  const router = useRouter();
  const { user, isHydrated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    strainName: '',
    strainType: '',
    breeder: '',
    seedbank: '',
    genetics: '',
    lightType: '',
    lightWatts: '',
    lightSchedule: '',
    medium: '',
    nutrients: '',
    containerSize: '',
    wateringSchedule: '',
    phase: 'SEEDLING',
    startDate: new Date().toISOString().split('T')[0],
    isPublic: true,
  });

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
      const { startDate, breeder, seedbank, genetics, lightSchedule, containerSize, wateringSchedule, ...rest } = formData;
      const payload = {
        ...rest,
        lightWatts: formData.lightWatts ? parseFloat(formData.lightWatts) : undefined,
        // Store additional fields in description for now
        description: formData.description + 
          (breeder ? `\n\n**Breeder:** ${breeder}` : '') +
          (seedbank ? `\n**Seedbank:** ${seedbank}` : '') +
          (genetics ? `\n**Genetics:** ${genetics}` : '') +
          (lightSchedule ? `\n**Light Schedule:** ${lightSchedule}` : '') +
          (containerSize ? `\n**Container Size:** ${containerSize}` : '') +
          (wateringSchedule ? `\n**Watering Schedule:** ${wateringSchedule}` : ''),
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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          🌱 Create Your Grow Diary
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Document your growing journey with detailed information
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold">Basic Information</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Diary Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input text-lg"
                required
                placeholder="e.g., My First Indoor Grow - Blue Dream Auto"
              />
              <p className="text-sm text-gray-500 mt-1">Give your grow diary a memorable name</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input"
                rows={4}
                placeholder="Tell us about your grow setup, goals, and what you're hoping to achieve..."
              />
              <p className="text-sm text-gray-500 mt-1">Share your goals and expectations</p>
            </div>
          </div>
        </div>

        {/* Strain Information Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <h2 className="text-2xl font-bold">Strain Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Strain Name <span className="text-red-500">*</span>
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
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Strain Type
              </label>
              <select
                name="strainType"
                value={formData.strainType}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select type...</option>
                <option value="Indica">Indica</option>
                <option value="Sativa">Sativa</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Indica Dominant">Indica Dominant</option>
                <option value="Sativa Dominant">Sativa Dominant</option>
                <option value="Autoflower">Autoflower</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Breeder
              </label>
              <input
                type="text"
                name="breeder"
                value={formData.breeder}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Barney's Farm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Seedbank
              </label>
              <input
                type="text"
                name="seedbank"
                value={formData.seedbank}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Seedsman"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Genetics
              </label>
              <input
                type="text"
                name="genetics"
                value={formData.genetics}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Blueberry × Haze"
              />
              <p className="text-sm text-gray-500 mt-1">Parent strains or genetic lineage</p>
            </div>
          </div>
        </div>

        {/* Lighting Setup Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <h2 className="text-2xl font-bold">Lighting Setup</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Light Type
              </label>
              <select
                name="lightType"
                value={formData.lightType}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select type...</option>
                <option value="LED">LED</option>
                <option value="HPS">HPS (High Pressure Sodium)</option>
                <option value="MH">MH (Metal Halide)</option>
                <option value="CFL">CFL (Compact Fluorescent)</option>
                <option value="CMH/LEC">CMH/LEC</option>
                <option value="T5">T5 Fluorescent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Light Watts
              </label>
              <input
                type="number"
                name="lightWatts"
                value={formData.lightWatts}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 240"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Light Schedule
              </label>
              <input
                type="text"
                name="lightSchedule"
                value={formData.lightSchedule}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 18/6, 20/4, 12/12"
              />
              <p className="text-sm text-gray-500 mt-1">Hours on/off</p>
            </div>
          </div>
        </div>

        {/* Growing Medium & Nutrients Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌾</span>
            </div>
            <h2 className="text-2xl font-bold">Growing Medium & Nutrients</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Growing Medium
              </label>
              <select
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select medium...</option>
                <option value="Soil">Soil</option>
                <option value="Coco Coir">Coco Coir</option>
                <option value="Hydro">Hydroponic</option>
                <option value="Soil/Coco Mix">Soil/Coco Mix</option>
                <option value="Perlite/Vermiculite">Perlite/Vermiculite</option>
                <option value="DWC">DWC (Deep Water Culture)</option>
                <option value="Aeroponics">Aeroponics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Container Size
              </label>
              <input
                type="text"
                name="containerSize"
                value={formData.containerSize}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 5 gallon, 20L"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Nutrients
              </label>
              <input
                type="text"
                name="nutrients"
                value={formData.nutrients}
                onChange={handleChange}
                className="input"
                placeholder="e.g., General Hydroponics Flora Series"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Watering Schedule
              </label>
              <input
                type="text"
                name="wateringSchedule"
                value={formData.wateringSchedule}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Every 2-3 days"
              />
            </div>
          </div>
        </div>

        {/* Phase & Timeline Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <h2 className="text-2xl font-bold">Phase & Timeline</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Current Phase <span className="text-red-500">*</span>
              </label>
              <select
                name="phase"
                value={formData.phase}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="SEEDLING">🌱 Seedling</option>
                <option value="VEGETATIVE">🌿 Vegetative</option>
                <option value="FLOWERING">🌸 Flowering</option>
                <option value="DRYING">🍂 Drying</option>
                <option value="CURING">🏺 Curing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input"
                required
              />
              <p className="text-sm text-gray-500 mt-1">When did you start this grow?</p>
            </div>
          </div>
        </div>

        {/* Privacy & Visibility Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold">Privacy Settings</h2>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              id="isPublic"
            />
            <div>
              <label htmlFor="isPublic" className="font-semibold cursor-pointer">
                Make this diary public
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                When public, other users can view, like, and comment on your grow diary. 
                You can change this setting later.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 text-lg py-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Your Diary...
              </span>
            ) : (
              '🚀 Create Grow Diary'
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary px-8"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

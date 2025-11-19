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
    lightType: '',
    lightWatts: '',
    medium: '',
    nutrients: '',
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
        <div className="text-center">Lädt...</div>
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
      const { startDate, ...rest } = formData;
      const payload = {
        ...rest,
        lightWatts: formData.lightWatts ? parseFloat(formData.lightWatts) : undefined,
      };

      const response = await api.post('/runs', payload);
      router.push(`/run/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Fehler beim Erstellen des Tagebuchs. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Neues Grow-Tagebuch erstellen</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Titel <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            required
            placeholder="z.B. Erster Indoor Grow - Blue Dream"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Beschreibung</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input"
            rows={4}
            placeholder="Erzähle uns von deinem Grow-Setup und deinen Zielen..."
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
              placeholder="z.B. Blue Dream"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Strain Typ</label>
            <input
              type="text"
              name="strainType"
              value={formData.strainType}
              onChange={handleChange}
              className="input"
              placeholder="z.B. Sativa Dominant Hybrid"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Lichttyp</label>
            <input
              type="text"
              name="lightType"
              value={formData.lightType}
              onChange={handleChange}
              className="input"
              placeholder="z.B. LED, HPS, CFL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Lichtstärke (Watt)</label>
            <input
              type="number"
              name="lightWatts"
              value={formData.lightWatts}
              onChange={handleChange}
              className="input"
              placeholder="z.B. 240"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Anbaumedium</label>
            <input
              type="text"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              className="input"
              placeholder="z.B. Erde, Hydro, Coco"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nährstoffe</label>
            <input
              type="text"
              name="nutrients"
              value={formData.nutrients}
              onChange={handleChange}
              className="input"
              placeholder="z.B. General Hydroponics"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Aktuelle Phase <span className="text-red-600">*</span>
            </label>
            <select
              name="phase"
              value={formData.phase}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="SEEDLING">Sämling</option>
              <option value="VEGETATIVE">Vegetativ</option>
              <option value="FLOWERING">Blüte</option>
              <option value="DRYING">Trocknung</option>
              <option value="CURING">Aushärtung</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Startdatum <span className="text-red-600">*</span>
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
            Dieses Tagebuch öffentlich machen (für alle sichtbar)
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? 'Wird erstellt...' : 'Grow-Tagebuch erstellen'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}

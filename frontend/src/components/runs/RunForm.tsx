import { useState } from 'react';

interface RunFormData {
  title: string;
  description: string;
  strainName: string;
  strainType: string;
  lightType: string;
  lightWatts: string;
  medium: string;
  nutrients: string;
  phase: string;
  startDate: string;
  isPublic: boolean;
}

interface RunFormProps {
  initialData?: Partial<RunFormData>;
  onSubmit: (data: RunFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  loading?: boolean;
}

export default function RunForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Create Grow Diary',
  loading = false,
}: RunFormProps) {
  const [formData, setFormData] = useState<RunFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    strainName: initialData?.strainName || '',
    strainType: initialData?.strainType || '',
    lightType: initialData?.lightType || '',
    lightWatts: initialData?.lightWatts || '',
    medium: initialData?.medium || '',
    nutrients: initialData?.nutrients || '',
    phase: initialData?.phase || 'SEEDLING',
    startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
    isPublic: initialData?.isPublic ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
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
          {loading ? 'Saving...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

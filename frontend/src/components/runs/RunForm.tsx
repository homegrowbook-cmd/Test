import { useState } from 'react';

interface RunFormData {
  title: string;
  description: string;
  strainName: string;
  strainType: string;
  breeder: string;
  seedbank: string;
  genetics: string;
  lightType: string;
  lightWatts: string;
  lightSchedule: string;
  medium: string;
  nutrients: string;
  containerSize: string;
  wateringSchedule: string;
  phase: string;
  startDate: string;
  isPublic: boolean;
}

interface RunFormSubmitData {
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
  onSubmit: (data: RunFormSubmitData) => Promise<void>;
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
    breeder: '',
    seedbank: '',
    genetics: '',
    lightType: initialData?.lightType || '',
    lightWatts: initialData?.lightWatts || '',
    lightSchedule: '',
    medium: initialData?.medium || '',
    nutrients: initialData?.nutrients || '',
    containerSize: '',
    wateringSchedule: '',
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
    
    // Build enhanced description with metadata
    const { breeder, seedbank, genetics, lightSchedule, containerSize, wateringSchedule, description, ...baseData } = formData;
    
    let enhancedDescription = description;
    if (breeder) enhancedDescription += `\n\n**Breeder:** ${breeder}`;
    if (seedbank) enhancedDescription += `\n**Seedbank:** ${seedbank}`;
    if (genetics) enhancedDescription += `\n**Genetics/Lineage:** ${genetics}`;
    if (lightSchedule) enhancedDescription += `\n**Light Schedule:** ${lightSchedule}`;
    if (containerSize) enhancedDescription += `\n**Container Size:** ${containerSize}`;
    if (wateringSchedule) enhancedDescription += `\n**Watering Schedule:** ${wateringSchedule}`;
    
    const submitData: RunFormSubmitData = {
      ...baseData,
      description: enhancedDescription,
    };
    
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 📝 Basic Information Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl">
            📝
          </div>
          <h3 className="text-xl font-semibold">Basic Information</h3>
        </div>
        
        <div className="space-y-4">
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
        </div>
      </div>

      {/* 🌿 Strain Details Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center text-xl">
            🌿
          </div>
          <h3 className="text-xl font-semibold">Strain Details</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
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
              <select
                name="strainType"
                value={formData.strainType}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select strain type...</option>
                <option value="Indica">Indica</option>
                <option value="Sativa">Sativa</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Autoflower">Autoflower</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Breeder</label>
              <input
                type="text"
                name="breeder"
                value={formData.breeder}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Dutch Passion"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Seedbank</label>
              <input
                type="text"
                name="seedbank"
                value={formData.seedbank}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Seedsman"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Genetics / Lineage</label>
            <input
              type="text"
              name="genetics"
              value={formData.genetics}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Blueberry x Haze"
            />
          </div>
        </div>
      </div>

      {/* 💡 Lighting Setup Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-xl">
            💡
          </div>
          <h3 className="text-xl font-semibold">Lighting Setup</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Light Type</label>
              <select
                name="lightType"
                value={formData.lightType}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select light type...</option>
                <option value="LED">LED</option>
                <option value="HPS">HPS</option>
                <option value="MH">MH</option>
                <option value="CFL">CFL</option>
                <option value="CMH">CMH</option>
                <option value="T5">T5</option>
              </select>
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

          <div>
            <label className="block text-sm font-medium mb-2">Light Schedule</label>
            <select
              name="lightSchedule"
              value={formData.lightSchedule}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select schedule...</option>
              <option value="18/6">18/6 (Vegetative)</option>
              <option value="20/4">20/4 (Vegetative)</option>
              <option value="24/0">24/0 (Vegetative)</option>
              <option value="12/12">12/12 (Flowering)</option>
              <option value="Auto">Auto (Autoflower)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🌾 Growing Medium Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-xl">
            🌾
          </div>
          <h3 className="text-xl font-semibold">Growing Medium & Setup</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Growing Medium</label>
              <select
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select medium...</option>
                <option value="Soil">Soil</option>
                <option value="Coco">Coco</option>
                <option value="Hydro">Hydro</option>
                <option value="DWC">DWC</option>
                <option value="Aeroponics">Aeroponics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Container Size</label>
              <input
                type="text"
                name="containerSize"
                value={formData.containerSize}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 5 gallon, 20L"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium mb-2">Watering Schedule</label>
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
      </div>

      {/* 📅 Timeline Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-xl">
            📅
          </div>
          <h3 className="text-xl font-semibold">Timeline</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
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
                <option value="SEEDLING">🌱 Seedling</option>
                <option value="VEGETATIVE">🌿 Vegetative</option>
                <option value="FLOWERING">🌸 Flowering</option>
                <option value="DRYING">🍂 Drying</option>
                <option value="CURING">🏺 Curing</option>
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
        </div>
      </div>

      {/* 🔒 Privacy Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
            🔒
          </div>
          <h3 className="text-xl font-semibold">Privacy</h3>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="mr-3 h-4 w-4"
            id="isPublic"
          />
          <label htmlFor="isPublic" className="text-sm">
            Make this diary public (visible to everyone)
          </label>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="card">
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              submitLabel
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

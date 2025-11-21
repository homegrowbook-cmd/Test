import { useState } from 'react';

interface HarvestFormData {
  harvestDate: string;
  wetWeight: string;
  trimMethod: string;
  harvestNotes: string;
  dryingStartDate: string;
  dryingEndDate: string;
  dryingTemp: string;
  dryingHumidity: string;
  dryWeight: string;
  dryingNotes: string;
  curingStartDate: string;
  curingMethod: string;
  jarCount: string;
  burpingSchedule: string;
  curingHumidity: string;
  curingNotes: string;
  finalWeight: string;
  qualityRating: string;
  qualityNotes: string;
}

interface HarvestFormProps {
  initialData?: Partial<HarvestFormData>;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  loading?: boolean;
}

export default function HarvestForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Save Harvest Data',
  loading = false,
}: HarvestFormProps) {
  const [formData, setFormData] = useState<HarvestFormData>({
    harvestDate: initialData?.harvestDate || new Date().toISOString().split('T')[0],
    wetWeight: initialData?.wetWeight || '',
    trimMethod: initialData?.trimMethod || '',
    harvestNotes: initialData?.harvestNotes || '',
    dryingStartDate: initialData?.dryingStartDate || '',
    dryingEndDate: initialData?.dryingEndDate || '',
    dryingTemp: initialData?.dryingTemp || '',
    dryingHumidity: initialData?.dryingHumidity || '',
    dryWeight: initialData?.dryWeight || '',
    dryingNotes: initialData?.dryingNotes || '',
    curingStartDate: initialData?.curingStartDate || '',
    curingMethod: initialData?.curingMethod || '',
    jarCount: initialData?.jarCount || '',
    burpingSchedule: initialData?.burpingSchedule || '',
    curingHumidity: initialData?.curingHumidity || '',
    curingNotes: initialData?.curingNotes || '',
    finalWeight: initialData?.finalWeight || '',
    qualityRating: initialData?.qualityRating || '',
    qualityNotes: initialData?.qualityNotes || '',
  });

  const [activeTab, setActiveTab] = useState<'harvest' | 'drying' | 'curing' | 'results'>('harvest');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert empty strings to undefined and numbers to proper types
    const submitData: any = {
      harvestDate: formData.harvestDate,
    };

    if (formData.wetWeight) submitData.wetWeight = parseFloat(formData.wetWeight);
    if (formData.trimMethod) submitData.trimMethod = formData.trimMethod;
    if (formData.harvestNotes) submitData.harvestNotes = formData.harvestNotes;
    if (formData.dryingStartDate) submitData.dryingStartDate = formData.dryingStartDate;
    if (formData.dryingEndDate) submitData.dryingEndDate = formData.dryingEndDate;
    if (formData.dryingTemp) submitData.dryingTemp = parseFloat(formData.dryingTemp);
    if (formData.dryingHumidity) submitData.dryingHumidity = parseFloat(formData.dryingHumidity);
    if (formData.dryWeight) submitData.dryWeight = parseFloat(formData.dryWeight);
    if (formData.dryingNotes) submitData.dryingNotes = formData.dryingNotes;
    if (formData.curingStartDate) submitData.curingStartDate = formData.curingStartDate;
    if (formData.curingMethod) submitData.curingMethod = formData.curingMethod;
    if (formData.jarCount) submitData.jarCount = parseInt(formData.jarCount);
    if (formData.burpingSchedule) submitData.burpingSchedule = formData.burpingSchedule;
    if (formData.curingHumidity) submitData.curingHumidity = parseFloat(formData.curingHumidity);
    if (formData.curingNotes) submitData.curingNotes = formData.curingNotes;
    if (formData.finalWeight) submitData.finalWeight = parseFloat(formData.finalWeight);
    if (formData.qualityRating) submitData.qualityRating = parseInt(formData.qualityRating);
    if (formData.qualityNotes) submitData.qualityNotes = formData.qualityNotes;

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            type="button"
            onClick={() => setActiveTab('harvest')}
            className={`${
              activeTab === 'harvest'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            🌿 Harvest
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('drying')}
            className={`${
              activeTab === 'drying'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            💨 Drying
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('curing')}
            className={`${
              activeTab === 'curing'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            🏺 Curing
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('results')}
            className={`${
              activeTab === 'results'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            📊 Results
          </button>
        </nav>
      </div>

      {/* Harvest Tab */}
      {activeTab === 'harvest' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">
              Harvest Date *
            </label>
            <input
              type="date"
              id="harvestDate"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="wetWeight" className="block text-sm font-medium text-gray-700">
              Wet Weight (grams)
            </label>
            <input
              type="number"
              id="wetWeight"
              name="wetWeight"
              value={formData.wetWeight}
              onChange={handleChange}
              step="0.1"
              min="0"
              placeholder="e.g., 500"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="trimMethod" className="block text-sm font-medium text-gray-700">
              Trim Method
            </label>
            <select
              id="trimMethod"
              name="trimMethod"
              value={formData.trimMethod}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">Select trim method</option>
              <option value="wet">Wet Trim</option>
              <option value="dry">Dry Trim</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label htmlFor="harvestNotes" className="block text-sm font-medium text-gray-700">
              Harvest Notes
            </label>
            <textarea
              id="harvestNotes"
              name="harvestNotes"
              value={formData.harvestNotes}
              onChange={handleChange}
              rows={4}
              placeholder="Share details about the harvest process, conditions, observations..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
      )}

      {/* Drying Tab */}
      {activeTab === 'drying' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dryingStartDate" className="block text-sm font-medium text-gray-700">
                Drying Start Date
              </label>
              <input
                type="date"
                id="dryingStartDate"
                name="dryingStartDate"
                value={formData.dryingStartDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="dryingEndDate" className="block text-sm font-medium text-gray-700">
                Drying End Date
              </label>
              <input
                type="date"
                id="dryingEndDate"
                name="dryingEndDate"
                value={formData.dryingEndDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dryingTemp" className="block text-sm font-medium text-gray-700">
                Temperature (°C)
              </label>
              <input
                type="number"
                id="dryingTemp"
                name="dryingTemp"
                value={formData.dryingTemp}
                onChange={handleChange}
                step="0.1"
                placeholder="e.g., 18-21"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="dryingHumidity" className="block text-sm font-medium text-gray-700">
                Humidity (%)
              </label>
              <input
                type="number"
                id="dryingHumidity"
                name="dryingHumidity"
                value={formData.dryingHumidity}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="100"
                placeholder="e.g., 50-60"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dryWeight" className="block text-sm font-medium text-gray-700">
              Dry Weight (grams)
            </label>
            <input
              type="number"
              id="dryWeight"
              name="dryWeight"
              value={formData.dryWeight}
              onChange={handleChange}
              step="0.1"
              min="0"
              placeholder="e.g., 100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="dryingNotes" className="block text-sm font-medium text-gray-700">
              Drying Notes
            </label>
            <textarea
              id="dryingNotes"
              name="dryingNotes"
              value={formData.dryingNotes}
              onChange={handleChange}
              rows={4}
              placeholder="Notes about the drying process, conditions, duration..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
      )}

      {/* Curing Tab */}
      {activeTab === 'curing' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="curingStartDate" className="block text-sm font-medium text-gray-700">
              Curing Start Date
            </label>
            <input
              type="date"
              id="curingStartDate"
              name="curingStartDate"
              value={formData.curingStartDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="curingMethod" className="block text-sm font-medium text-gray-700">
              Curing Method
            </label>
            <select
              id="curingMethod"
              name="curingMethod"
              value={formData.curingMethod}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">Select curing method</option>
              <option value="jar">Glass Jars</option>
              <option value="grove_bags">Grove Bags</option>
              <option value="turkey_bags">Turkey Bags</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="jarCount" className="block text-sm font-medium text-gray-700">
              Number of Containers
            </label>
            <input
              type="number"
              id="jarCount"
              name="jarCount"
              value={formData.jarCount}
              onChange={handleChange}
              min="0"
              placeholder="e.g., 3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="burpingSchedule" className="block text-sm font-medium text-gray-700">
              Burping Schedule
            </label>
            <input
              type="text"
              id="burpingSchedule"
              name="burpingSchedule"
              value={formData.burpingSchedule}
              onChange={handleChange}
              placeholder="e.g., Daily for 2 weeks, then weekly"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="curingHumidity" className="block text-sm font-medium text-gray-700">
              Target Humidity (%)
            </label>
            <input
              type="number"
              id="curingHumidity"
              name="curingHumidity"
              value={formData.curingHumidity}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 58-62"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="curingNotes" className="block text-sm font-medium text-gray-700">
              Curing Notes
            </label>
            <textarea
              id="curingNotes"
              name="curingNotes"
              value={formData.curingNotes}
              onChange={handleChange}
              rows={4}
              placeholder="Notes about the curing process, smell development, etc..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="finalWeight" className="block text-sm font-medium text-gray-700">
              Final Weight (grams)
            </label>
            <input
              type="number"
              id="finalWeight"
              name="finalWeight"
              value={formData.finalWeight}
              onChange={handleChange}
              step="0.1"
              min="0"
              placeholder="e.g., 95"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            <p className="mt-1 text-sm text-gray-500">Final cured weight ready for consumption</p>
          </div>

          <div>
            <label htmlFor="qualityRating" className="block text-sm font-medium text-gray-700">
              Quality Rating
            </label>
            <select
              id="qualityRating"
              name="qualityRating"
              value={formData.qualityRating}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">Select rating</option>
              <option value="1">⭐ 1 - Poor</option>
              <option value="2">⭐⭐ 2 - Fair</option>
              <option value="3">⭐⭐⭐ 3 - Good</option>
              <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
            </select>
          </div>

          <div>
            <label htmlFor="qualityNotes" className="block text-sm font-medium text-gray-700">
              Quality Notes
            </label>
            <textarea
              id="qualityNotes"
              name="qualityNotes"
              value={formData.qualityNotes}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the smell, taste, effects, appearance, etc..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-700 mb-2">📊 Calculated Metrics</h4>
            <p className="text-sm text-gray-600">
              Yield per watt and yield per day will be automatically calculated based on your grow data.
            </p>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

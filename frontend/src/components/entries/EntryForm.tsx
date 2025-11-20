import { useState, useEffect } from 'react';
import MeasurementInput from './MeasurementInput';
import { calculateVPD } from '@/utils/vpdCalculator';

interface EntryFormData {
  title: string;
  content: string;
  dayNumber: number;
  weekNumber: number;
  temperature: string;
  humidity: string;
  vpd: string;
  ec: string;
  ph: string;
  ppfd: string;
  images: string[];
}

interface EntryFormProps {
  initialData?: Partial<EntryFormData>;
  onSubmit: (data: EntryFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  loading?: boolean;
}

export default function EntryForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Create Entry',
  loading = false,
}: EntryFormProps) {
  const [formData, setFormData] = useState<EntryFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    dayNumber: initialData?.dayNumber || 1,
    weekNumber: initialData?.weekNumber || 1,
    temperature: initialData?.temperature || '',
    humidity: initialData?.humidity || '',
    vpd: initialData?.vpd || '',
    ec: initialData?.ec || '',
    ph: initialData?.ph || '',
    ppfd: initialData?.ppfd || '',
    images: initialData?.images || [],
  });
  const [autoCalculateVPD, setAutoCalculateVPD] = useState(true);

  // Auto-calculate VPD when temperature or humidity changes
  useEffect(() => {
    if (autoCalculateVPD && formData.temperature && formData.humidity) {
      const temp = parseFloat(formData.temperature);
      const humidity = parseFloat(formData.humidity);
      
      if (!isNaN(temp) && !isNaN(humidity)) {
        const calculatedVPD = calculateVPD(temp, humidity);
        if (calculatedVPD !== null) {
          setFormData((prev) => ({
            ...prev,
            vpd: calculatedVPD.toString(),
          }));
        }
      }
    }
  }, [formData.temperature, formData.humidity, autoCalculateVPD]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      {/* Basic Info Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
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
              placeholder="e.g., Looking healthy - first topping"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="input"
              rows={4}
              placeholder="Describe what you did today and any observations..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <MeasurementInput
              label="Day Number"
              name="dayNumber"
              value={formData.dayNumber.toString()}
              onChange={(e) => setFormData(prev => ({ ...prev, dayNumber: parseInt(e.target.value) || 1 }))}
              required
              min="1"
              placeholder="1"
            />

            <MeasurementInput
              label="Week Number"
              name="weekNumber"
              value={formData.weekNumber.toString()}
              onChange={(e) => setFormData(prev => ({ ...prev, weekNumber: parseInt(e.target.value) || 1 }))}
              required
              min="1"
              placeholder="1"
            />
          </div>
        </div>
      </div>

      {/* Environmental Measurements */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Environmental Measurements</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <MeasurementInput
            label="Temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            unit="°C"
            step="0.1"
            placeholder="24.5"
            help="Optimal range: 20-28°C"
          />

          <MeasurementInput
            label="Humidity"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            unit="%"
            step="0.1"
            min="0"
            max="100"
            placeholder="60"
            help="Optimal range: 40-70%"
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">
                VPD <span className="text-gray-500 dark:text-gray-400 text-xs">(kPa)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={autoCalculateVPD}
                  onChange={(e) => setAutoCalculateVPD(e.target.checked)}
                  className="rounded"
                />
                Auto-calculate
              </label>
            </div>
            <input
              type="number"
              name="vpd"
              value={formData.vpd}
              onChange={handleChange}
              className="input"
              step="0.01"
              placeholder="1.2"
              disabled={autoCalculateVPD}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {autoCalculateVPD 
                ? 'Automatically calculated from temperature and humidity' 
                : 'Optimal range: 0.8-1.5 kPa'}
            </p>
          </div>

          <MeasurementInput
            label="PPFD"
            name="ppfd"
            value={formData.ppfd}
            onChange={handleChange}
            unit="µmol/m²/s"
            placeholder="400"
            help="Photon flux density"
          />
        </div>
      </div>

      {/* Nutrient Measurements */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Nutrient Measurements</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <MeasurementInput
            label="pH"
            name="ph"
            value={formData.ph}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="14"
            placeholder="6.0"
            help="Optimal range: 5.5-6.5 (hydro) or 6.0-7.0 (soil)"
          />

          <MeasurementInput
            label="EC"
            name="ec"
            value={formData.ec}
            onChange={handleChange}
            unit="mS/cm"
            step="0.1"
            placeholder="1.5"
            help="Electrical conductivity - nutrient strength"
          />
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
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

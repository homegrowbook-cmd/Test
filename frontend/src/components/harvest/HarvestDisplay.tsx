interface HarvestData {
  id: string;
  harvestDate: string;
  wetWeight?: number;
  trimMethod?: string;
  harvestNotes?: string;
  dryingStartDate?: string;
  dryingEndDate?: string;
  dryingTemp?: number;
  dryingHumidity?: number;
  dryWeight?: number;
  dryingNotes?: string;
  curingStartDate?: string;
  curingMethod?: string;
  jarCount?: number;
  burpingSchedule?: string;
  curingHumidity?: number;
  curingNotes?: string;
  finalWeight?: number;
  qualityRating?: number;
  qualityNotes?: string;
  yieldPerWatt?: number;
  yieldPerDay?: number;
}

interface HarvestDisplayProps {
  harvest: HarvestData;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
}

export default function HarvestDisplay({ harvest, onEdit, onDelete, canEdit = false }: HarvestDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">🌿 Harvest Data</h2>
        {canEdit && (
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {/* Harvest Information */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🌿 Harvest</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Harvest Date</dt>
            <dd className="mt-1 text-sm text-gray-900">{formatDate(harvest.harvestDate)}</dd>
          </div>
          {harvest.wetWeight && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Wet Weight</dt>
              <dd className="mt-1 text-sm text-gray-900">{harvest.wetWeight}g</dd>
            </div>
          )}
          {harvest.trimMethod && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Trim Method</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">{harvest.trimMethod.replace('_', ' ')}</dd>
            </div>
          )}
        </dl>
        {harvest.harvestNotes && (
          <div className="mt-4">
            <dt className="text-sm font-medium text-gray-500">Notes</dt>
            <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{harvest.harvestNotes}</dd>
          </div>
        )}
      </div>

      {/* Drying Information */}
      {(harvest.dryingStartDate || harvest.dryWeight) && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💨 Drying</h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {harvest.dryingStartDate && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(harvest.dryingStartDate)}</dd>
              </div>
            )}
            {harvest.dryingEndDate && (
              <div>
                <dt className="text-sm font-medium text-gray-500">End Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(harvest.dryingEndDate)}</dd>
              </div>
            )}
            {harvest.dryingTemp && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Temperature</dt>
                <dd className="mt-1 text-sm text-gray-900">{harvest.dryingTemp}°C</dd>
              </div>
            )}
            {harvest.dryingHumidity && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Humidity</dt>
                <dd className="mt-1 text-sm text-gray-900">{harvest.dryingHumidity}%</dd>
              </div>
            )}
            {harvest.dryWeight && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Dry Weight</dt>
                <dd className="mt-1 text-sm text-gray-900 font-semibold">{harvest.dryWeight}g</dd>
              </div>
            )}
          </dl>
          {harvest.dryingNotes && (
            <div className="mt-4">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{harvest.dryingNotes}</dd>
            </div>
          )}
        </div>
      )}

      {/* Curing Information */}
      {(harvest.curingStartDate || harvest.curingMethod) && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">🏺 Curing</h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {harvest.curingStartDate && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(harvest.curingStartDate)}</dd>
              </div>
            )}
            {harvest.curingMethod && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Method</dt>
                <dd className="mt-1 text-sm text-gray-900 capitalize">{harvest.curingMethod.replace('_', ' ')}</dd>
              </div>
            )}
            {harvest.jarCount && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Containers</dt>
                <dd className="mt-1 text-sm text-gray-900">{harvest.jarCount}</dd>
              </div>
            )}
            {harvest.curingHumidity && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Target Humidity</dt>
                <dd className="mt-1 text-sm text-gray-900">{harvest.curingHumidity}%</dd>
              </div>
            )}
            {harvest.burpingSchedule && (
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Burping Schedule</dt>
                <dd className="mt-1 text-sm text-gray-900">{harvest.burpingSchedule}</dd>
              </div>
            )}
          </dl>
          {harvest.curingNotes && (
            <div className="mt-4">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{harvest.curingNotes}</dd>
            </div>
          )}
        </div>
      )}

      {/* Final Results */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Final Results</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {harvest.finalWeight && (
            <div className="bg-green-50 rounded-lg p-4">
              <dt className="text-sm font-medium text-green-700">Final Weight</dt>
              <dd className="mt-1 text-2xl font-bold text-green-900">{harvest.finalWeight}g</dd>
            </div>
          )}
          {harvest.yieldPerWatt && (
            <div className="bg-blue-50 rounded-lg p-4">
              <dt className="text-sm font-medium text-blue-700">Yield per Watt</dt>
              <dd className="mt-1 text-2xl font-bold text-blue-900">{harvest.yieldPerWatt}g/W</dd>
            </div>
          )}
          {harvest.yieldPerDay && (
            <div className="bg-purple-50 rounded-lg p-4">
              <dt className="text-sm font-medium text-purple-700">Yield per Day</dt>
              <dd className="mt-1 text-2xl font-bold text-purple-900">{harvest.yieldPerDay}g/day</dd>
            </div>
          )}
        </div>

        {harvest.qualityRating && (
          <div className="mt-4">
            <dt className="text-sm font-medium text-gray-500">Quality Rating</dt>
            <dd className="mt-1 text-xl">{renderStars(harvest.qualityRating)}</dd>
          </div>
        )}

        {harvest.qualityNotes && (
          <div className="mt-4">
            <dt className="text-sm font-medium text-gray-500">Quality Notes</dt>
            <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{harvest.qualityNotes}</dd>
          </div>
        )}
      </div>
    </div>
  );
}

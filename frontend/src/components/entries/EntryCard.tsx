import Link from 'next/link';
import { Entry } from '@/types';

interface EntryCardProps {
  entry: Entry;
  runId: string;
}

export default function EntryCard({ entry, runId }: EntryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Link href={`/runs/${runId}/entries/${entry.id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">{entry.title}</h3>
            <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
              <span>Day {entry.dayNumber}</span>
              <span>•</span>
              <span>Week {entry.weekNumber}</span>
              <span>•</span>
              <span>{formatDate(entry.createdAt)}</span>
            </div>
          </div>
        </div>

        {entry.content && (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
            {entry.content}
          </p>
        )}

        {/* Measurements Summary */}
        {(entry.temperature || entry.humidity || entry.ph || entry.ec) && (
          <div className="flex flex-wrap gap-2 text-xs">
            {entry.temperature && (
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded">
                🌡️ {entry.temperature}°C
              </span>
            )}
            {entry.humidity && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                💧 {entry.humidity}%
              </span>
            )}
            {entry.ph && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                pH {entry.ph}
              </span>
            )}
            {entry.ec && (
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded">
                EC {entry.ec}
              </span>
            )}
          </div>
        )}

        {/* Images Count */}
        {entry.images && entry.images.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              📸 {entry.images.length} {entry.images.length === 1 ? 'image' : 'images'}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

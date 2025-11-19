import { Entry } from '@/types';
import EntryCard from './EntryCard';

interface EntryTimelineProps {
  entries: Entry[];
  runId: string;
  loading?: boolean;
  emptyMessage?: string;
}

export default function EntryTimeline({ 
  entries, 
  runId, 
  loading = false, 
  emptyMessage = 'No entries yet. Create your first entry to start documenting your grow!' 
}: EntryTimelineProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading entries...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 card">
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Timeline</h2>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} runId={runId} />
      ))}
    </div>
  );
}

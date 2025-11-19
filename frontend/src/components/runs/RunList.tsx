import { Run } from '@/types';
import RunCard from './RunCard';

interface RunListProps {
  runs: Run[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function RunList({ runs, loading = false, emptyMessage = 'No grow diaries found.' }: RunListProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading grow diaries...</p>
      </div>
    );
  }

  if (runs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {runs.map((run) => (
        <RunCard key={run.id} run={run} />
      ))}
    </div>
  );
}

import Link from 'next/link';
import { Run } from '@/types';
import PhaseIndicator from './PhaseIndicator';

interface RunCardProps {
  run: Run;
}

export default function RunCard({ run }: RunCardProps) {
  return (
    <Link href={`/runs/${run.id}`}>
      <div className="card hover:shadow-xl transition-shadow cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold line-clamp-2">{run.title}</h3>
          <PhaseIndicator phase={run.phase} />
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            <strong>Strain:</strong> {run.strainName}
          </div>
          {run.strainType && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {run.strainType}
            </div>
          )}
        </div>

        {run.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {run.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>👤 {run.user?.username || 'Unknown'}</span>
            <div className="flex gap-3">
              <span>❤️ {run._count?.likes || 0}</span>
              <span>💬 {run._count?.comments || 0}</span>
              <span>📝 {run._count?.entries || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { getVPDStatus } from '@/utils/vpdCalculator';

interface VPDStatusProps {
  vpd: number | null | undefined;
  phase?: 'SEEDLING' | 'VEGETATIVE' | 'FLOWERING' | 'DRYING' | 'CURING';
  showRecommendation?: boolean;
}

export default function VPDStatus({ vpd, phase = 'VEGETATIVE', showRecommendation = false }: VPDStatusProps) {
  if (vpd === null || vpd === undefined) {
    return null;
  }

  const status = getVPDStatus(vpd, phase);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{vpd} kPa</span>
        <span className={`text-sm font-medium px-2 py-0.5 rounded ${
          status.status === 'optimal' ? 'bg-green-100 dark:bg-green-900' :
          status.status === 'acceptable' ? 'bg-yellow-100 dark:bg-yellow-900' :
          status.status === 'low' ? 'bg-orange-100 dark:bg-orange-900' :
          'bg-red-100 dark:bg-red-900'
        } ${status.color}`}>
          {status.label}
        </span>
      </div>
      {showRecommendation && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {status.recommendation}
        </p>
      )}
    </div>
  );
}

interface PhaseIndicatorProps {
  phase: string;
  className?: string;
}

export default function PhaseIndicator({ phase, className = '' }: PhaseIndicatorProps) {
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'SEEDLING':
        return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'VEGETATIVE':
        return 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'FLOWERING':
        return 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'DRYING':
        return 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'CURING':
        return 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getPhaseLabel = (phase: string) => {
    return phase.charAt(0) + phase.slice(1).toLowerCase();
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPhaseColor(phase)} ${className}`}>
      {getPhaseLabel(phase)}
    </span>
  );
}

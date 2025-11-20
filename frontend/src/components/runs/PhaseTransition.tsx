import { useState } from 'react';

interface PhaseTransitionProps {
  currentPhase: 'SEEDLING' | 'VEGETATIVE' | 'FLOWERING' | 'DRYING' | 'CURING';
  onPhaseChange: (newPhase: string, note?: string) => Promise<void>;
  disabled?: boolean;
}

const PHASES = [
  { value: 'SEEDLING', label: 'Seedling', icon: '🌱', description: 'Initial growth stage' },
  { value: 'VEGETATIVE', label: 'Vegetative', icon: '🌿', description: 'Vegetative growth' },
  { value: 'FLOWERING', label: 'Flowering', icon: '🌸', description: 'Flowering stage' },
  { value: 'DRYING', label: 'Drying', icon: '🍂', description: 'Post-harvest drying' },
  { value: 'CURING', label: 'Curing', icon: '🫙', description: 'Curing for quality' },
];

export default function PhaseTransition({ currentPhase, onPhaseChange, disabled = false }: PhaseTransitionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentPhaseIndex = PHASES.findIndex(p => p.value === currentPhase);
  const nextPhase = currentPhaseIndex < PHASES.length - 1 ? PHASES[currentPhaseIndex + 1] : null;

  const handleQuickTransition = async () => {
    if (!nextPhase) return;
    
    setLoading(true);
    setError('');
    try {
      await onPhaseChange(nextPhase.value, `Transitioned to ${nextPhase.label}`);
      setIsOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update phase');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomTransition = async () => {
    if (!selectedPhase) {
      setError('Please select a phase');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await onPhaseChange(selectedPhase, note || undefined);
      setIsOpen(false);
      setSelectedPhase('');
      setNote('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update phase');
    } finally {
      setLoading(false);
    }
  };

  const currentPhaseData = PHASES.find(p => p.value === currentPhase);

  if (!isOpen) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Growth Phase</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentPhaseData?.description}
            </p>
          </div>
          <div className="text-4xl">{currentPhaseData?.icon}</div>
        </div>

        <div className="flex gap-3">
          {nextPhase && (
            <button
              onClick={handleQuickTransition}
              disabled={disabled || loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Updating...' : `Move to ${nextPhase.label} ${nextPhase.icon}`}
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            disabled={disabled}
            className="btn-secondary"
          >
            Change Phase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Change Growth Phase</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Phase Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select New Phase <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2">
            {PHASES.map((phase) => (
              <button
                key={phase.value}
                type="button"
                onClick={() => setSelectedPhase(phase.value)}
                disabled={phase.value === currentPhase}
                className={`
                  p-3 rounded-lg border-2 text-left transition-colors
                  ${phase.value === currentPhase 
                    ? 'border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 cursor-not-allowed opacity-60' 
                    : selectedPhase === phase.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{phase.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{phase.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {phase.description}
                    </div>
                  </div>
                  {phase.value === currentPhase && (
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Transition Note */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Transition Note (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="input"
            rows={3}
            placeholder="Add a note about why you're transitioning to this phase..."
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            This note will help you remember key decisions and timing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleCustomTransition}
            disabled={loading || !selectedPhase}
            className="btn-primary flex-1"
          >
            {loading ? 'Updating...' : 'Update Phase'}
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              setSelectedPhase('');
              setNote('');
              setError('');
            }}
            disabled={loading}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

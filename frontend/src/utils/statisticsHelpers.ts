import { Entry } from '@/types';

/**
 * Calculate average value for a specific measurement field
 */
export const calculateAverage = (
  entries: Entry[],
  field: keyof Pick<Entry, 'temperature' | 'humidity' | 'vpd' | 'ph' | 'ec'>,
  decimalPlaces: number = 1
): number => {
  const entriesWithField = entries.filter((e) => e[field] !== null && e[field] !== undefined);
  
  if (entriesWithField.length === 0) {
    return 0;
  }

  const sum = entriesWithField.reduce((acc, e) => acc + (e[field] as number), 0);
  const average = sum / entriesWithField.length;
  
  return Number(average.toFixed(decimalPlaces));
};

/**
 * Get count of entries with a specific measurement
 */
export const getEntriesWithMeasurement = (
  entries: Entry[],
  field: keyof Pick<Entry, 'temperature' | 'humidity' | 'vpd' | 'ph' | 'ec' | 'ppfd'>
): Entry[] => {
  return entries.filter((e) => e[field] !== null && e[field] !== undefined);
};

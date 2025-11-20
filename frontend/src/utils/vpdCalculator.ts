/**
 * VPD (Vapor Pressure Deficit) Calculator
 * 
 * VPD is the difference between the amount of moisture in the air and 
 * how much moisture the air can hold when saturated.
 * 
 * Formula:
 * VPD = SVP × (1 - RH/100)
 * Where SVP is the Saturated Vapor Pressure at leaf temperature
 * 
 * For simplification, we use air temperature as leaf temperature is typically 1-2°C lower
 */

/**
 * Calculate Saturated Vapor Pressure (SVP) using the Magnus formula
 * @param tempCelsius Temperature in Celsius
 * @returns SVP in kPa
 */
function calculateSVP(tempCelsius: number): number {
  const a = 0.61121; // kPa
  const b = 17.67;
  const c = 243.5; // °C
  
  return a * Math.exp((b * tempCelsius) / (c + tempCelsius));
}

/**
 * Calculate VPD from temperature and humidity
 * @param tempCelsius Temperature in Celsius
 * @param relativeHumidity Relative humidity in percentage (0-100)
 * @returns VPD in kPa, rounded to 2 decimal places
 */
export function calculateVPD(tempCelsius: number, relativeHumidity: number): number | null {
  // Validate inputs
  if (
    tempCelsius === null || 
    tempCelsius === undefined || 
    relativeHumidity === null || 
    relativeHumidity === undefined ||
    isNaN(tempCelsius) || 
    isNaN(relativeHumidity)
  ) {
    return null;
  }

  // Validate ranges
  if (tempCelsius < -50 || tempCelsius > 100) {
    return null; // Invalid temperature range
  }

  if (relativeHumidity < 0 || relativeHumidity > 100) {
    return null; // Invalid humidity range
  }

  const svp = calculateSVP(tempCelsius);
  const vpd = svp * (1 - relativeHumidity / 100);
  
  return Math.round(vpd * 100) / 100; // Round to 2 decimal places
}

/**
 * Get VPD status and recommendation based on grow phase
 * @param vpd VPD value in kPa
 * @param phase Growth phase
 * @returns Status object with color, label, and recommendation
 */
export function getVPDStatus(
  vpd: number,
  phase: 'SEEDLING' | 'VEGETATIVE' | 'FLOWERING' | 'DRYING' | 'CURING'
): {
  status: 'optimal' | 'acceptable' | 'low' | 'high';
  color: string;
  label: string;
  recommendation: string;
} {
  let optimalMin: number;
  let optimalMax: number;
  let acceptableMin: number;
  let acceptableMax: number;

  // Define optimal and acceptable ranges for each phase
  switch (phase) {
    case 'SEEDLING':
      optimalMin = 0.4;
      optimalMax = 0.8;
      acceptableMin = 0.3;
      acceptableMax = 1.0;
      break;
    case 'VEGETATIVE':
      optimalMin = 0.8;
      optimalMax = 1.2;
      acceptableMin = 0.6;
      acceptableMax = 1.4;
      break;
    case 'FLOWERING':
      optimalMin = 1.0;
      optimalMax = 1.5;
      acceptableMin = 0.8;
      acceptableMax = 1.6;
      break;
    default:
      // For drying/curing or unknown phases
      optimalMin = 0.8;
      optimalMax = 1.5;
      acceptableMin = 0.6;
      acceptableMax = 1.8;
  }

  if (vpd >= optimalMin && vpd <= optimalMax) {
    return {
      status: 'optimal',
      color: 'text-green-600 dark:text-green-400',
      label: 'Optimal',
      recommendation: 'VPD is in the optimal range for this phase.',
    };
  }

  if (vpd >= acceptableMin && vpd <= acceptableMax) {
    return {
      status: 'acceptable',
      color: 'text-yellow-600 dark:text-yellow-400',
      label: 'Acceptable',
      recommendation: vpd < optimalMin 
        ? 'VPD is slightly low. Consider increasing temperature or decreasing humidity.'
        : 'VPD is slightly high. Consider decreasing temperature or increasing humidity.',
    };
  }

  if (vpd < acceptableMin) {
    return {
      status: 'low',
      color: 'text-orange-600 dark:text-orange-400',
      label: 'Too Low',
      recommendation: 'VPD is too low. Increase temperature or decrease humidity to improve transpiration.',
    };
  }

  return {
    status: 'high',
    color: 'text-red-600 dark:text-red-400',
    label: 'Too High',
    recommendation: 'VPD is too high. Decrease temperature or increase humidity to prevent plant stress.',
  };
}

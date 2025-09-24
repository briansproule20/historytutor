interface CurrencyOptions {
  style?: 'currency' | 'decimal' | 'percent' | 'unit' | 'credits';
  currency?: string;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const formatCurrency = (
  value: number,
  options?: CurrencyOptions
): string => {
  // For credits, display as credits instead of currency
  if (options?.style === 'credits' || value < 1) {
    if (value < 0.01 && value > 0) {
      return '< 0.01 credits';
    }
    
    return `${value.toFixed(3)} credits`;
  }
  
  // Default currency formatting
  if (value < 0.01 && value > 0) {
    return '< $0.01';
  }

  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
};

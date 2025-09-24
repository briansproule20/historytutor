export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions
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

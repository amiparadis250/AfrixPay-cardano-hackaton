export const AFRICAN_CURRENCIES = {
  RWF: { name: 'Rwandan Franc', country: 'Rwanda', rateToUSD: 0.00081 },
  KES: { name: 'Kenyan Shilling', country: 'Kenya', rateToUSD: 0.0077 },
  NGN: { name: 'Nigerian Naira', country: 'Nigeria', rateToUSD: 0.0013 },
  GHS: { name: 'Ghanaian Cedi', country: 'Ghana', rateToUSD: 0.083 },
  UGX: { name: 'Ugandan Shilling', country: 'Uganda', rateToUSD: 0.00027 },
  TZS: { name: 'Tanzanian Shilling', country: 'Tanzania', rateToUSD: 0.00042 },
  ZAR: { name: 'South African Rand', country: 'South Africa', rateToUSD: 0.055 },
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): { convertedAmount: number; exchangeRate: number } {
  const fromRate = AFRICAN_CURRENCIES[fromCurrency as keyof typeof AFRICAN_CURRENCIES]?.rateToUSD || 1
  const toRate = AFRICAN_CURRENCIES[toCurrency as keyof typeof AFRICAN_CURRENCIES]?.rateToUSD || 1
  
  const exchangeRate = fromRate / toRate
  const convertedAmount = amount * exchangeRate
  
  return { convertedAmount, exchangeRate }
}

export function calculateFee(amount: number): number {
  return Math.max(amount * 0.02, 1) // 2% fee with minimum of 1 unit
}
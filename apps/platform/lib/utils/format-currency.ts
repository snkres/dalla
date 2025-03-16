export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatNumberWithCommas = (value: number | string): string => {
  // Convert input to string and handle empty/null cases
  if (value === null || value === undefined || value === '') return '0'

  // Convert to string and remove any existing commas or non-numeric chars except decimal point
  const numStr = value.toString().replace(/,/g, '')

  // Split into integer and decimal parts
  const parts = numStr.split('.')

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Rejoin with decimal part if it exists
  return parts.join('.')
}

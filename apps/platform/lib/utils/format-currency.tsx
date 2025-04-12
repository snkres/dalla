import React from 'react'
import { Riyal } from '@dalla/design-system'

/**
 * Formats a number as currency and returns a JSX element with the Riyal icon
 * This simplifies consistent currency display throughout the application
 *
 * @param amount The amount to format
 * @param iconSize The size class for the icon (defaults to "h-4 w-4")
 * @returns JSX element with Riyal icon and formatted amount
 */
export const formatCurrency = (
  amount: number,
  iconSize: string = 'h-4 w-4',
  iconColor: string = 'currentColor',
): React.ReactElement => {
  // Format number with decimal formatting
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)

  return (
    <span className="flex items-center gap-1">
      <Riyal className={iconSize} color={iconColor} />
      <span>{formatted}</span>
    </span>
  )
}

/**
 * Formats a number as currency string without the Riyal icon
 * Use this when you need just the formatted number as a string
 */
export const formatCurrencyValue = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

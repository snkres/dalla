'use client'

import React from 'react'
import { LIST_ITEM_DELIMITER } from './list-input'

interface ListDisplayProps {
  value: string
  emptyText?: string
  className?: string
  itemClassName?: string
}

export function ListDisplay({
  value,
  emptyText = 'No items to display',
  className = '',
  itemClassName = '',
}: ListDisplayProps) {
  const items = value
    ? value.split(LIST_ITEM_DELIMITER).filter((item) => item.trim() !== '')
    : []

  if (items.length === 0) {
    return <p className="text-sm text-gray-500">{emptyText}</p>
  }

  return (
    <ul className={`list-disc space-y-1 pl-5 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className={`text-sm ${itemClassName}`}>
          {item}
        </li>
      ))}
    </ul>
  )
}

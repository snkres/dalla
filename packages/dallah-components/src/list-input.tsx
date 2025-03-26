'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@dallah/design-system'
import { Button } from '@dallah/design-system'
import { PlusCircle, X, Pencil, Save } from 'lucide-react'

export const LIST_ITEM_DELIMITER = '%DALLA%'

interface ListInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  addItemText?: string
  maxItems?: number
  className?: string
}

export function ListInput({
  value = '',
  onChange,
  placeholder = 'Add an item',
  label = 'Items',
  addItemText = 'Add Item',
  maxItems = 10,
  className = '',
}: ListInputProps) {
  // Parse the initial items from the delimited string
  const parseItems = (str: string): string[] => {
    if (!str) return []
    return str.split(LIST_ITEM_DELIMITER).filter((item) => item.trim() !== '')
  }

  const [items, setItems] = useState<string[]>(parseItems(value))
  const [currentItem, setCurrentItem] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isInternalChange = useRef(false)
  const prevValueRef = useRef(value)

  // Initialize items when value changes from outside
  useEffect(() => {
    // Only update items from props if the value changed externally (not due to our onChange)
    if (value !== prevValueRef.current && !isInternalChange.current) {
      setItems(parseItems(value))
    }

    // Reset the flag after each render
    isInternalChange.current = false
    prevValueRef.current = value
  }, [value])

  // Update parent when items change
  const updateParentValue = () => {
    const newValue = items.join(LIST_ITEM_DELIMITER)

    // Only call onChange if the value actually changed
    if (newValue !== value) {
      isInternalChange.current = true
      prevValueRef.current = newValue
      onChange(newValue)
    }
  }

  // Handle adding a new item
  const handleAddItem = () => {
    if (!currentItem.trim()) return

    if (editingIndex !== null) {
      // Update existing item
      const newItems = [...items]
      newItems[editingIndex] = currentItem
      setItems(newItems)
      setEditingIndex(null)
    } else {
      // Add new item
      setItems((prevItems) => [...prevItems, currentItem])
    }

    setCurrentItem('')
    inputRef.current?.focus()
  }

  // Handle removing an item
  const handleRemoveItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)

    // If we were editing this item, reset
    if (editingIndex === index) {
      setEditingIndex(null)
      setCurrentItem('')
    }
  }

  // Handle editing an item
  const handleEditItem = (index: number) => {
    setCurrentItem(items[index])
    setEditingIndex(index)
    inputRef.current?.focus()
  }

  // Handle keyboard events for adding items with Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentItem.trim()) {
      e.preventDefault()
      handleAddItem()
    }
  }

  // Update parent whenever items array changes
  useEffect(() => {
    updateParentValue()
  }, [items])

  const isMaxItemsReached = items.length >= maxItems && editingIndex === null

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={currentItem}
            onChange={(e) => setCurrentItem(e.target.value)}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            disabled={isMaxItemsReached}
            className="flex-grow"
          />
          <Button
            size="sm"
            onClick={handleAddItem}
            disabled={!currentItem.trim() || isMaxItemsReached}
            className="shrink-0"
            type="button"
          >
            {editingIndex !== null ? (
              <Save className="mr-1 h-4 w-4" />
            ) : (
              <PlusCircle className="mr-1 h-4 w-4" />
            )}
            {editingIndex !== null ? 'Save' : addItemText}
          </Button>
        </div>

        {isMaxItemsReached && (
          <p className="text-xs text-amber-600">
            Maximum of {maxItems} items reached. Edit or remove items.
          </p>
        )}
      </div>

      {items.length > 0 && (
        <div className="space-y-2 rounded-md border border-gray-200 p-3">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-2 rounded-md bg-gray-50 p-2 text-sm"
              >
                <span className="flex-grow">{item}</span>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEditItem(index)}
                    className="h-7 w-7 text-gray-500 hover:text-gray-700"
                    type="button"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveItem(index)}
                    className="h-7 w-7 text-gray-500 hover:text-red-500"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

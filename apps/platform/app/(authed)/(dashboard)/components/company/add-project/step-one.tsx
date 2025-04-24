import React from 'react'
import { Input } from '@dalla/design-system'
import { Textarea } from '@dalla/design-system'
import { Briefcase, AlertCircle, Plus, X, Edit2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@dalla/utils'
import { useTranslation } from '@hooks/use-translation'
import { ListInput, LIST_ITEM_DELIMITER } from '@dalla/components/listInput'

interface StepOneProps {
  formData: {
    title: string
    jobTitle: string
    description: string
    scope: string
    deliverables: string
  }
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

export function StepOne({ formData, handleInputChange }: StepOneProps) {
  const translations = useTranslation()
  const t = translations.dashboard.companyComponents.addProject
  const [newScopeItem, setNewScopeItem] = React.useState('')
  const [newDeliverableItem, setNewDeliverableItem] = React.useState('')
  const [editingScopeIndex, setEditingScopeIndex] = React.useState<
    number | null
  >(null)
  const [editingDeliverableIndex, setEditingDeliverableIndex] = React.useState<
    number | null
  >(null)

  // Parse scope items from delimited string
  const scopeItems = formData.scope
    ? formData.scope.split(LIST_ITEM_DELIMITER).filter(Boolean)
    : []

  // Parse deliverable items from delimited string
  const deliverableItems = formData.deliverables
    ? formData.deliverables.split(LIST_ITEM_DELIMITER).filter(Boolean)
    : []

  // Handle scope changes
  const handleScopeChange = (value: string) => {
    const event = {
      target: {
        id: 'scope',
        value,
      },
    } as React.ChangeEvent<HTMLTextAreaElement>
    handleInputChange(event)
  }

  // Handle deliverables changes
  const handleDeliverablesChange = (value: string) => {
    const event = {
      target: {
        id: 'deliverables',
        value,
      },
    } as React.ChangeEvent<HTMLTextAreaElement>
    handleInputChange(event)
  }

  // Custom functions for scope items
  const addScopeItem = () => {
    if (!newScopeItem.trim()) return

    if (editingScopeIndex !== null) {
      const newItems = [...scopeItems]
      newItems[editingScopeIndex] = newScopeItem
      handleScopeChange(newItems.join(LIST_ITEM_DELIMITER))
      setEditingScopeIndex(null)
    } else {
      handleScopeChange([...scopeItems, newScopeItem].join(LIST_ITEM_DELIMITER))
    }

    setNewScopeItem('')
  }

  const removeScopeItem = (index: number) => {
    const newItems = [...scopeItems]
    newItems.splice(index, 1)
    handleScopeChange(newItems.join(LIST_ITEM_DELIMITER))

    if (editingScopeIndex === index) {
      setEditingScopeIndex(null)
      setNewScopeItem('')
    }
  }

  const editScopeItem = (index: number) => {
    setNewScopeItem(scopeItems[index])
    setEditingScopeIndex(index)
  }

  // Custom functions for deliverable items
  const addDeliverableItem = () => {
    if (!newDeliverableItem.trim()) return

    if (editingDeliverableIndex !== null) {
      const newItems = [...deliverableItems]
      newItems[editingDeliverableIndex] = newDeliverableItem
      handleDeliverablesChange(newItems.join(LIST_ITEM_DELIMITER))
      setEditingDeliverableIndex(null)
    } else {
      handleDeliverablesChange(
        [...deliverableItems, newDeliverableItem].join(LIST_ITEM_DELIMITER),
      )
    }

    setNewDeliverableItem('')
  }

  const removeDeliverableItem = (index: number) => {
    const newItems = [...deliverableItems]
    newItems.splice(index, 1)
    handleDeliverablesChange(newItems.join(LIST_ITEM_DELIMITER))

    if (editingDeliverableIndex === index) {
      setEditingDeliverableIndex(null)
      setNewDeliverableItem('')
    }
  }

  const editDeliverableItem = (index: number) => {
    setNewDeliverableItem(deliverableItems[index])
    setEditingDeliverableIndex(index)
  }

  // Handle keyboard events
  const handleScopeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addScopeItem()
    }
  }

  const handleDeliverableKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addDeliverableItem()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mx-auto max-w-3xl space-y-6"
    >
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#63B7B7]"></div>
        <div className="p-6">
          <div className="mb-6 flex items-center gap-1 rounded-lg bg-[#BEDDF1]/10 p-4">
            <AlertCircle className="mr-2 h-5 w-5 text-[#63B7B7]" />
            <p className="text-sm text-gray-700">{t.requiredFieldsInfo}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {t.projectTitleLabel}
              </label>
              <Input
                id="title"
                placeholder={t.projectTitlePlaceholder}
                value={formData.title}
                onChange={handleInputChange}
                className={cn('w-full')}
              />
              {!formData.title && (
                <p className="mt-1 text-xs text-amber-600">
                  {t.requiredFieldMessage || 'This field is required'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="jobTitle"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {t.jobTitleLabel}
              </label>
              <div className="relative">
                <Input
                  id="jobTitle"
                  placeholder={t.jobTitlePlaceholder}
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className={cn('w-full')}
                />
                {!formData.jobTitle && (
                  <p className="mt-1 text-xs text-amber-600">
                    {t.requiredFieldMessage || 'This field is required'}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {t.descriptionLabel}
            </label>
            <Textarea
              id="description"
              placeholder={t.descriptionPlaceholder}
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={cn('w-full resize-none')}
            />
            {!formData.description && (
              <p className="mt-1 text-xs text-amber-600">
                {t.requiredFieldMessage || 'This field is required'}
              </p>
            )}
          </div>

          {/* Enhanced Scope Input */}
          <div className="mt-6">
            <label
              htmlFor="scope"
              className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700"
            >
              <span>{t.scopeLabel}</span>
              <div className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                {t.optionalFieldLabel || 'Optional'}
              </div>
            </label>
            <div className="rounded-md border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder={t.scopePlaceholder}
                  value={newScopeItem}
                  onChange={(e) => setNewScopeItem(e.target.value)}
                  onKeyDown={handleScopeKeyDown}
                  className="flex-grow"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addScopeItem}
                  disabled={!newScopeItem.trim()}
                  className={cn(
                    'flex h-10 items-center gap-1 rounded-md px-3 text-sm transition-colors',
                    newScopeItem.trim()
                      ? 'bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90'
                      : 'cursor-not-allowed bg-gray-100 text-gray-400',
                  )}
                >
                  {editingScopeIndex !== null ? (
                    <>{t.saveItemButton || 'Save'}</>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      {t.addItemButton || 'Add'}
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {scopeItems.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="mt-3 overflow-hidden"
                  >
                    <ul className="space-y-2">
                      {scopeItems.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className={cn(
                            'flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 p-3',
                            editingScopeIndex === index
                              ? 'border-[#63B7B7]/30 bg-[#63B7B7]/5'
                              : '',
                          )}
                        >
                          <div className="flex items-start gap-2">
                            <span className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-[#63B7B7]"></span>
                            <span className="text-sm text-gray-700">
                              {item}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => editScopeItem(index)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-[#63B7B7]"
                              aria-label={t.editItemAriaLabel || 'Edit item'}
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeScopeItem(index)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500"
                              aria-label={
                                t.removeItemAriaLabel || 'Remove item'
                              }
                            >
                              <X className="h-3.5 w-3.5" />
                            </motion.button>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {t.scopeHelpText ||
                'Add multiple items to specify the scope of your project'}
            </p>
          </div>

          {/* Enhanced Deliverables Input */}
          <div className="mt-6">
            <label
              htmlFor="deliverables"
              className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700"
            >
              <span>{t.deliverablesLabel}</span>
              <div className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                {t.optionalFieldLabel || 'Optional'}
              </div>
            </label>
            <div className="rounded-md border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder={t.deliverablesPlaceholder}
                  value={newDeliverableItem}
                  onChange={(e) => setNewDeliverableItem(e.target.value)}
                  onKeyDown={handleDeliverableKeyDown}
                  className="flex-grow"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addDeliverableItem}
                  disabled={!newDeliverableItem.trim()}
                  className={cn(
                    'flex h-10 items-center gap-1 rounded-md px-3 text-sm transition-colors',
                    newDeliverableItem.trim()
                      ? 'bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90'
                      : 'cursor-not-allowed bg-gray-100 text-gray-400',
                  )}
                >
                  {editingDeliverableIndex !== null ? (
                    <>{t.saveItemButton || 'Save'}</>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      {t.addItemButton || 'Add'}
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {deliverableItems.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="mt-3 overflow-hidden"
                  >
                    <ul className="space-y-2">
                      {deliverableItems.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className={cn(
                            'flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 p-3',
                            editingDeliverableIndex === index
                              ? 'border-[#63B7B7]/30 bg-[#63B7B7]/5'
                              : '',
                          )}
                        >
                          <div className="flex items-start gap-2">
                            <span className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-[#63B7B7]"></span>
                            <span className="text-sm text-gray-700">
                              {item}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => editDeliverableItem(index)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-[#63B7B7]"
                              aria-label={t.editItemAriaLabel || 'Edit item'}
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeDeliverableItem(index)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500"
                              aria-label={
                                t.removeItemAriaLabel || 'Remove item'
                              }
                            >
                              <X className="h-3.5 w-3.5" />
                            </motion.button>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {t.deliverablesHelpText ||
                'List key deliverables expected from the project'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

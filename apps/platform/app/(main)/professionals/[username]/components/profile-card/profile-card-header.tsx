'use client'

import { Button } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { Briefcase, Eye, EyeOff, Edit, X, Check, Loader2 } from 'lucide-react'

interface ProfileCardHeaderProps {
  isOwner: boolean
  isEditing: boolean
  isPublicView: boolean
  isSaving: boolean
  hasChanges: boolean
  onTogglePublicView?: () => void
  handleEdit: () => void
  handleCancel: () => void
  handleSave: () => void
}

export function ProfileCardHeader({
  isOwner,
  isEditing,
  isPublicView,
  isSaving,
  hasChanges,
  onTogglePublicView,
  handleEdit,
  handleCancel,
  handleSave,
}: ProfileCardHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 p-4">
      <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
        <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
        Professional Profile
      </h2>

      {isOwner &&
        (!isEditing ? (
          <div className="flex items-center gap-2">
            {onTogglePublicView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onTogglePublicView}
                className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
                title={
                  isPublicView
                    ? 'Switch to private view'
                    : 'Switch to public view'
                }
              >
                {isPublicView ? (
                  <EyeOff className="mr-1 !h-4 !w-4" />
                ) : (
                  <Eye className="mr-1 !h-4 !w-4" />
                )}
                {isPublicView ? 'Private' : 'Public'}
              </Button>
            )}
            {!isPublicView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
              >
                <Edit className="mr-1 !h-4 !w-4" />
                Edit
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
              className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-gray-600"
            >
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className={cn(
                'h-7 rounded-full px-3 text-xs',
                hasChanges
                  ? 'text-[#63B7B7] hover:bg-[#63B7B7]/10'
                  : 'cursor-not-allowed text-gray-400',
              )}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Check className="mr-1 h-3 w-3" />
                  Save
                </>
              )}
            </Button>
          </div>
        ))}
    </div>
  )
}

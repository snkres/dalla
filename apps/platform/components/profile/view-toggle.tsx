"use client"

import { useRouter } from "next/navigation"
import { Switch } from "@dallah/design-system"

interface ViewToggleProps {
  isPublicView: boolean
  profileId: string
  profileType: "pro" | "company"
}

export default function ViewToggle({ isPublicView, profileId, profileType }: ViewToggleProps) {
  const router = useRouter()

  const handleToggle = (checked: boolean) => {
    const newView = checked ? "public" : "edit"
    router.push(`/${profileType}/${profileId}?view=${newView}`, { scroll: false })
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch id="public-view" checked={isPublicView} onCheckedChange={handleToggle} />
      <label htmlFor="public-view">{isPublicView ? "Public View" : "Edit Mode"}</label>
    </div>
  )
}


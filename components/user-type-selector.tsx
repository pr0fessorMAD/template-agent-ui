"use client"

import { Button } from "./ui/button"

interface UserTypeSelectorProps {
  onSelect: (type: "business" | "developer") => void
}

export function UserTypeSelector({ onSelect }: UserTypeSelectorProps) {
  return (
    <div className="flex gap-3 px-1">
      <Button
        onClick={() => onSelect("business")}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center py-6 h-auto"
      >
        <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="font-medium">Business User</span>
      </Button>
      <Button
        onClick={() => onSelect("developer")}
        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white flex flex-col items-center py-6 h-auto"
      >
        <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        <span className="font-medium">Developer</span>
      </Button>
    </div>
  )
}

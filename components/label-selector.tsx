"use client"

import { Button } from "./ui/button"

interface LabelSelectorProps {
  selectedLabels: string[]
  setSelectedLabels: (labels: string[]) => void
}

export function LabelSelector({ selectedLabels, setSelectedLabels }: LabelSelectorProps) {
  const allLabels = ["Customer_Name", "Loan_Type", "Loan_Amount", "Loan_Start_Date"]

  const toggleLabel = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label))
    } else {
      setSelectedLabels([...selectedLabels, label])
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
      <p className="text-sm font-medium text-gray-900 mb-3">Select Labels to Retry</p>
      <div className="grid grid-cols-2 gap-2">
        {allLabels.map((label) => (
          <Button
            key={label}
            onClick={() => toggleLabel(label)}
            variant={selectedLabels.includes(label) ? "default" : "outline"}
            className={`justify-start text-sm ${
              selectedLabels.includes(label)
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-white hover:bg-gray-50 text-gray-700"
            }`}
          >
            {selectedLabels.includes(label) && (
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}

"use client"

import { SampleCard } from "./sample-card"
import { CodeViewer } from "./code-viewer"
import { ConfidenceGrid } from "./confidence-grid"
import { Button } from "./ui/button"

interface OutputViewerProps {
  outputView: "samples" | "mappings" | "coded-template"
  generatedSamples: Array<{
    id: string
    name: string
    loanType: string
    loanAmount: string
    startDate: string
  }>
  variableMappings: Array<{
    variable: string
    mapping: string
    confidence: number
  }>
  template: string
  detectedLabels: string[]
  userType: "business" | "developer" | null
}

export function OutputViewer({
  outputView,
  generatedSamples,
  variableMappings,
  template,
  detectedLabels,
  userType
}: OutputViewerProps) {
  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Output Viewer</h2>
        <p className="text-sm text-gray-500 mt-1">
          {outputView === "samples" && "Preview and download generated email samples"}
          {outputView === "mappings" && "Review variable mappings and confidence scores"}
          {outputView === "coded-template" && "Preview the coded template with variable placeholders"}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {outputView === "samples" && generatedSamples.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Samples ({generatedSamples.length})</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {generatedSamples.map((sample) => (
                <SampleCard
                  key={sample.id}
                  name={sample.name}
                  loanType={sample.loanType}
                  loanAmount={sample.loanAmount}
                  startDate={sample.startDate}
                  status="ready"
                />
              ))}
            </div>
          </div>
        )}

        {outputView === "mappings" && variableMappings.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Variable Mappings</h3>
              <div className="text-sm text-gray-500">
                Confidence scores indicate mapping reliability
              </div>
            </div>
            <ConfidenceGrid mappings={variableMappings} />
          </div>
        )}

        {outputView === "coded-template" && template && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Coded Template</h3>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Template
              </Button>
            </div>
            <CodeViewer template={template} detectedLabels={detectedLabels} />
          </div>
        )}

        {generatedSamples.length === 0 && variableMappings.length === 0 && !template && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Output Yet</h3>
              <p className="text-gray-500">
                Start a conversation with the assistant to generate templates and samples.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { Button } from "./ui/button"

interface SampleCardProps {
  name: string
  loanType: string
  loanAmount: string
  startDate: string
  status: "ready" | "regenerating"
}

export function SampleCard({ name, loanType, loanAmount, startDate, status }: SampleCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Browser header */}
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        {status === "ready" && (
          <div className="ml-auto">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {status === "regenerating" && (
          <div className="ml-auto flex items-center gap-2">
            <svg className="animate-spin w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-xs text-yellow-600 font-medium">Regenerating...</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Important Updates</h3>
          {status === "ready" && (
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              // Placeholder for download functionality
              alert(`Downloading email for ${name}`)
            }}>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </Button>
          )}
        </div>

        {status === "regenerating" ? (
          <p className="text-gray-500 text-sm">Content being regenerated...</p>
        ) : (
          <>
            <p className="text-gray-700 text-sm mb-4">Dear {name},</p>
            <p className="text-gray-700 text-sm mb-4">
              We wanted to inform you about important updates to your loan policy.
            </p>
            <ol className="text-gray-700 text-sm space-y-1 mb-4 list-decimal list-inside">
              <li>Loan Type: {loanType}</li>
              <li>Loan Amount: {loanAmount}</li>
              <li>Start Date: {startDate}</li>
            </ol>
            <p className="text-gray-700 text-sm mb-2">Best regards,</p>
            <p className="text-gray-400 text-sm italic">
              {name.includes("Jane") ? "John from FinanceCo" : "Sarah from FinanceCo"}
            </p>
          </>
        )}
      </div>

      {status === "regenerating" && (
        <div className="px-6 pb-4">
          <div className="bg-blue-100 rounded-lg px-3 py-2 flex items-center gap-2">
            <svg className="animate-spin w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm text-blue-700">Analyzing Customer_Name mapping... 2/4 labels</span>
          </div>
        </div>
      )}
    </div>
  )
}

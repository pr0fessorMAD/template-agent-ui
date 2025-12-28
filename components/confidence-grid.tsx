interface ConfidenceGridProps {
  mappings: Array<{
    variable: string
    mapping: string
    confidence: number
  }>
}

export function ConfidenceGrid({ mappings }: ConfidenceGridProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Variable Mapping Confidence</h3>
      <div className="grid grid-cols-2 gap-4">
        {mappings.map((item) => {
          const color = item.confidence >= 90 ? "green" : item.confidence >= 80 ? "yellow" : "red"
          const bgColor = item.confidence >= 90 ? "bg-green-50" : item.confidence >= 80 ? "bg-yellow-50" : "bg-red-50"
          const borderColor = item.confidence >= 90 ? "border-green-200" : item.confidence >= 80 ? "border-yellow-200" : "border-red-200"
          const textColor = item.confidence >= 90 ? "text-green-600" : item.confidence >= 80 ? "text-yellow-600" : "text-red-600"

          return (
            <div key={item.variable} className={`${bgColor} ${borderColor} border-2 rounded-lg p-4`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{item.variable}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.mapping}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-lg font-bold ${textColor}`}>{item.confidence}%</span>
                  <svg className={`w-5 h-5 ${textColor}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

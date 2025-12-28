export function ConfidencePanel() {
  const mappings = [
    { variable: "Customer_Name", mapping: "MAIN_TABLE.CUSTOMER_NAME", confidence: 95, color: "bg-green-500" },
    { variable: "Loan_Type", mapping: "LOAN_TABLE.LOAN_TYPE", confidence: 92, color: "bg-green-500" },
    { variable: "Loan_Amount", mapping: "LOAN_TABLE.LOAN_AMOUNT", confidence: 88, color: "bg-yellow-500" },
    { variable: "Loan_Start_Date", mapping: "LOAN_TABLE.START_DATE", confidence: 85, color: "bg-yellow-500" },
  ]

  return (
    <div className="bg-gray-900 rounded-lg px-4 py-4">
      <p className="text-white font-medium text-sm mb-4">Variable Mapping Confidence</p>
      <div className="space-y-4">
        {mappings.map((item) => (
          <div key={item.variable}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">{item.variable}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${item.confidence >= 90 ? "text-green-400" : "text-yellow-400"}`}
                >
                  {item.confidence}%
                </span>
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full transition-all`}
                style={{ width: `${item.confidence}%` }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">{item.mapping}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

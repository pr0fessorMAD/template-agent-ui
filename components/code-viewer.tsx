interface CodeViewerProps {
  template: string
  detectedLabels: string[]
}

export function CodeViewer({ template, detectedLabels }: CodeViewerProps) {
  // Create a sample coded template based on the detected labels
  const generateCodedTemplate = () => {
    let codedTemplate = `Subject: Important Updates to Your Loan Policy

Dear {{MAIN_TABLE.CUSTOMER_NAME}},

We wanted to inform you about important updates to your loan policy.

`

    if (detectedLabels.includes("Loan_Type")) {
      codedTemplate += `1. Loan Type: {{LOAN_TABLE.LOAN_TYPE}}
`
    }
    if (detectedLabels.includes("Loan_Amount")) {
      codedTemplate += `2. Loan Amount: {{LOAN_TABLE.LOAN_AMOUNT}}
`
    }
    if (detectedLabels.includes("Loan_Start_Date")) {
      codedTemplate += `3. Start Date: {{LOAN_TABLE.START_DATE}}
`
    }

    codedTemplate += `
Best regards,
{{COMPANY_SIGNATURE}}`

    return codedTemplate
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Browser header */}
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-gray-400 text-xs">template.html</span>
        </div>
        <button className="text-gray-400 hover:text-white text-xs px-3 py-1 border border-gray-700 rounded" onClick={() => {
          // Placeholder for copy functionality
          navigator.clipboard.writeText(generateCodedTemplate())
          alert("Template code copied to clipboard!")
        }}>
          Copy Code
        </button>
      </div>

      {/* Code content */}
      <div className="bg-gray-950 p-6 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300">
          <code>
            {generateCodedTemplate().split('\n').map((line, index) => (
              <div key={index} className="leading-relaxed">
                {line || '\u00A0'}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

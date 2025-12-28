"use client"

import { useState, useEffect } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { OutputViewer } from "@/components/output-viewer"
import { TemplateInputModal } from "@/components/template-input-modal"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

export type Message = {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: Date
  buttons?: Array<{
    label: string
    action: string
    variant?: "default" | "outline" | "secondary"
  }>
  data?: any
}

export type FlowState =
  | "welcome"
  | "awaiting-template"
  | "processing-template"
  | "labels-detected"
  | "generating-samples"
  | "samples-ready"
  | "generating-coded-template"
  | "coded-template-ready"
  | "awaiting-mapping-decision"
  | "retrying-mapping"
  | "mapping-updated"
  | "awaiting-final-samples"

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userType, setUserType] = useState<"business" | "developer" | null>(null)
  const [flowState, setFlowState] = useState<FlowState>("welcome")
  const [template, setTemplate] = useState<string>("")
  const [schema, setSchema] = useState<string>("")
  const [detectedLabels, setDetectedLabels] = useState<string[]>([])
  const [variableMappings, setVariableMappings] = useState<Array<{
    variable: string
    mapping: string
    confidence: number
  }>>([])
  const [generatedSamples, setGeneratedSamples] = useState<Array<{
    id: string
    name: string
    loanType: string
    loanAmount: string
    startDate: string
  }>>([])
  const [outputView, setOutputView] = useState<"samples" | "mappings" | "coded-template">("samples")
  const [showTemplateModal, setShowTemplateModal] = useState(false)

  // Initialize messages on client side to avoid hydration mismatch
  useEffect(() => {
    setMessages([
      {
        id: "1",
        type: "bot",
        content: "Hi there! I'm your Template Assistant. What type of user are you?",
        timestamp: new Date(),
        buttons: [
          { label: "Business User", action: "select-business" },
          { label: "Developer", action: "select-developer" }
        ]
      }
    ])
  }, [])

  const handleTemplateSubmit = (userTemplate: string, userSchema: string) => {
    addMessage({
      type: "user",
      content: `Template: ${userTemplate}\nSchema: ${userSchema}`
    })
    setTemplate(userTemplate)
    setSchema(userSchema)
    setFlowState("processing-template")
    addMessage({
      type: "bot",
      content: "Processing your template and schema...",
      data: { processing: true }
    })
    // Simulate processing delay
    setTimeout(() => {
      // Extract labels from template using regex
      const labelRegex = /\{\{([^}]+)\}\}/g
      const labels: string[] = []
      let match
      while ((match = labelRegex.exec(userTemplate)) !== null) {
        labels.push(match[1].trim())
      }
      // Remove duplicates
      const uniqueLabels = [...new Set(labels)]
      setDetectedLabels(uniqueLabels)
      setFlowState("labels-detected")
      setMessages(prev => prev.filter(m => !m.data?.processing))
      addMessage({
        type: "bot",
        content: `I've detected the following labels from your template: ${uniqueLabels.join(", ")}`,
        buttons: userType === "business"
          ? [{ label: "Generate Final Samples", action: "generate-samples" }]
          : [
              { label: "Generate Final Samples", action: "generate-samples" },
              { label: "Generate Coded Template", action: "generate-coded-template" }
            ]
      })
    }, 2000)
  }

  const handleUserAction = (action: string, data?: any) => {
    switch (action) {
      case "select-business":
        setUserType("business")
        addMessage({
          type: "user",
          content: "I'm a Business User"
        })
        addMessage({
          type: "bot",
          content: "Great! As a business user, I can help you generate personalized email samples. Please provide your email template and data schema.",
          buttons: [
            { label: "Provide Template & Schema", action: "provide-template-schema" }
          ]
        })
        setFlowState("awaiting-template")
        break

      case "select-developer":
        setUserType("developer")
        addMessage({
          type: "user",
          content: "I'm a Developer"
        })
        addMessage({
          type: "bot",
          content: "Perfect! As a developer, I can help you create coded templates with variable mappings. Please provide your email template and data schema.",
          buttons: [
            { label: "Provide Template & Schema", action: "provide-template-schema" }
          ]
        })
        setFlowState("awaiting-template")
        break

      case "provide-template-schema":
        setShowTemplateModal(true)
        break

      case "generate-samples":
        addMessage({
          type: "user",
          content: "Generate Final Samples"
        })
        setFlowState("generating-samples")
        addMessage({
          type: "bot",
          content: "Generating sample emails...",
          data: { processing: true }
        })
        // Simulate sample generation
        setTimeout(() => {
          const samples = [
            {
              id: "1",
              name: "Jane Smith",
              loanType: "Mortgage",
              loanAmount: "$250,000",
              startDate: "January 15, 2022"
            },
            {
              id: "2",
              name: "Michael Johnson",
              loanType: "Auto Loan",
              loanAmount: "$15,500",
              startDate: "May 2nd, 2023"
            }
          ]
          setGeneratedSamples(samples)
          setOutputView("samples")
          setFlowState("samples-ready")
          setMessages(prev => prev.filter(m => !m.data?.processing))
          addMessage({
            type: "bot",
            content: "I've generated 2 sample emails. You can preview and download them from the right panel.",
            buttons: [
              { label: "Generate Again", action: "regenerate-samples" }
            ]
          })
        }, 2000)
        break

      case "generate-coded-template":
        addMessage({
          type: "user",
          content: "Generate Coded Template"
        })
        setFlowState("generating-coded-template")
        addMessage({
          type: "bot",
          content: "Generating coded template with variable mappings...",
          data: { processing: true }
        })
        // Simulate coded template generation
        setTimeout(() => {
          const mappings = [
            { variable: "Customer_Name", mapping: "MAIN_TABLE.CUSTOMER_NAME", confidence: 95 },
            { variable: "Loan_Type", mapping: "LOAN_TABLE.LOAN_TYPE", confidence: 92 },
            { variable: "Loan_Amount", mapping: "LOAN_TABLE.LOAN_AMOUNT", confidence: 88 },
            { variable: "Loan_Start_Date", mapping: "LOAN_TABLE.START_DATE", confidence: 85 }
          ]
          setVariableMappings(mappings)
          setOutputView("mappings")
          setFlowState("coded-template-ready")
          setMessages(prev => prev.filter(m => !m.data?.processing))
          addMessage({
            type: "bot",
            content: "Variable mapping completed! You can see the mappings and confidence scores on the right panel.",
            buttons: [
              { label: "Retry Mapping", action: "retry-mapping" },
              { label: "Proceed", action: "proceed-with-template" }
            ]
          })
          setFlowState("awaiting-mapping-decision")
        }, 2000)
        break

      case "retry-mapping":
        addMessage({
          type: "user",
          content: "Retry Mapping"
        })
        setFlowState("retrying-mapping")
        addMessage({
          type: "bot",
          content: "Retrying variable mapping with improved analysis...",
          data: { processing: true }
        })
        // Simulate retry with slightly different confidence
        setTimeout(() => {
          const newMappings = [
            { variable: "Customer_Name", mapping: "MAIN_TABLE.CUSTOMER_NAME", confidence: 97 },
            { variable: "Loan_Type", mapping: "LOAN_TABLE.LOAN_TYPE", confidence: 94 },
            { variable: "Loan_Amount", mapping: "LOAN_TABLE.LOAN_AMOUNT", confidence: 91 },
            { variable: "Loan_Start_Date", mapping: "LOAN_TABLE.START_DATE", confidence: 89 }
          ]
          setVariableMappings(newMappings)
          setMessages(prev => prev.filter(m => !m.data?.processing))
          addMessage({
            type: "bot",
            content: "Mapping updated! If you're satisfied, click Proceed. Otherwise, you can specify your desired variable mappings.",
            buttons: [
              { label: "Proceed", action: "proceed-with-template" },
              { label: "Enter Custom Mappings", action: "custom-mappings" }
            ]
          })
          setFlowState("mapping-updated")
        }, 2000)
        break

      case "proceed-with-template":
        addMessage({
          type: "user",
          content: "Proceed"
        })
        setOutputView("coded-template")
        addMessage({
          type: "bot",
          content: "Great! You can now preview the coded template on the right panel and download it if needed.",
          buttons: [
            { label: "Generate Final Samples", action: "generate-samples" }
          ]
        })
        setFlowState("awaiting-final-samples")
        break

      case "regenerate-samples":
        addMessage({
          type: "user",
          content: "Generate Again"
        })
        setFlowState("generating-samples")
        addMessage({
          type: "bot",
          content: "Regenerating sample emails with improvements...",
          data: { processing: true }
        })
        // Simulate sample regeneration with different data
        setTimeout(() => {
          const newSamples = [
            {
              id: "3",
              name: "Robert Davis",
              loanType: "Personal Loan",
              loanAmount: "$8,500",
              startDate: "February 10, 2023"
            },
            {
              id: "4",
              name: "Lisa Wilson",
              loanType: "Home Equity",
              loanAmount: "$45,000",
              startDate: "June 5, 2023"
            }
          ]
          setGeneratedSamples(newSamples)
          setOutputView("samples")
          setFlowState("samples-ready")
          setMessages(prev => prev.filter(m => !m.data?.processing))
          addMessage({
            type: "bot",
            content: "I've regenerated 2 new sample emails. You can preview and download them from the right panel.",
            buttons: [
              { label: "Generate Again", action: "regenerate-samples" }
            ]
          })
        }, 2000)
        break

      case "custom-mappings":
        addMessage({
          type: "user",
          content: "Enter Custom Mappings"
        })
        addMessage({
          type: "bot",
          content: "Please enter your desired variable mappings in the chat box below.",
          buttons: [
            { label: "Done", action: "mapping-confirmed" }
          ]
        })
        break

      case "custom-input":
        addMessage({
          type: "user",
          content: data.message
        })
        // For now, just acknowledge the custom input
        addMessage({
          type: "bot",
          content: "I've received your custom mappings. Let me process them...",
          data: { processing: true }
        })
        // Simulate processing custom mappings
        setTimeout(() => {
          setMessages(prev => prev.filter(m => !m.data?.processing))
          addMessage({
            type: "bot",
            content: "Custom mappings applied successfully! You can now proceed with the template.",
            buttons: [
              { label: "Proceed", action: "proceed-with-template" }
            ]
          })
          setFlowState("mapping-updated")
        }, 1500)
        break
    }
  }

  return (
    <div className="h-screen bg-gray-50">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={40} minSize={30} maxSize={60}>
          <ChatInterface
            messages={messages}
            onAction={handleUserAction}
            flowState={flowState}
          />
        </Panel>
        <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-300 active:bg-blue-400 transition-colors cursor-col-resize relative">
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400 transform -translate-x-1/2"></div>
        </PanelResizeHandle>
        <Panel defaultSize={60} minSize={40}>
          <OutputViewer
            outputView={outputView}
            generatedSamples={generatedSamples}
            variableMappings={variableMappings}
            template={template}
            detectedLabels={detectedLabels}
            userType={userType}
          />
        </Panel>
      </PanelGroup>
      <TemplateInputModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSubmit={handleTemplateSubmit}
      />
    </div>
  )
}

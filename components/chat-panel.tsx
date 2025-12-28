"use client"

import { Bot, User } from "lucide-react"
import { UserTypeSelector } from "./user-type-selector"
import { LabelSelector } from "./label-selector"
import { ConfidencePanel } from "./confidence-panel"
import { Button } from "./ui/button"

interface ChatPanelProps {
  userType: "business" | "developer" | null
  setUserType: (type: "business" | "developer") => void
  currentView: string
  setCurrentView: (view: any) => void
  selectedLabels: string[]
  setSelectedLabels: (labels: string[]) => void
}

export function ChatPanel({
  userType,
  setUserType,
  currentView,
  setCurrentView,
  selectedLabels,
  setSelectedLabels,
}: ChatPanelProps) {
  return (
    <div className="w-[380px] bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-white font-semibold text-lg">Template Intelligence System</h1>
        <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
          {userType === "business" ? "Business User" : userType === "developer" ? "Developer" : "Guest"}
        </span>
      </div>

      {/* Flow Title */}
      <div className="px-6 py-6 border-b border-gray-100 text-center">
        <h2 className="font-semibold text-gray-900 text-base mb-1">
          {currentView === "initial" && "Flow 1.a"}
          {currentView === "labels-detected" && "Flow 1.b"}
          {currentView === "coded-template" && "Flow 2.a"}
          {currentView === "confidence" && "Flow 2.b"}
        </h2>
        <p className="text-sm text-gray-500">
          {currentView === "initial" && userType === "business" && "Business User Satisfied & Downloads"}
          {currentView === "labels-detected" && "Business User Requests Retry for Specific Labels"}
          {currentView === "coded-template" && "Developer Requests Final Sample Template"}
          {currentView === "confidence" && "Developer Requests Coded Template with Confidence"}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Initial message */}
        <ChatMessage type="bot" content="Hi there! What type of user are you?" />

        {!userType && <UserTypeSelector onSelect={setUserType} />}

        {userType && (
          <>
            {currentView === "labels-detected" && (
              <>
                <ChatMessage type="bot" content="Samples generated! Please review them in the Output Viewer." success />
                <ChatMessage
                  type="user"
                  content="The Customer_Name and Loan_Amount don't look right. Can you retry these?"
                />
                <ChatMessage
                  type="bot"
                  content="Got it! I'll regenerate samples with corrected Customer_Name and Loan_Amount values."
                />
                <LabelSelector selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} />
                <Button
                  onClick={() => setCurrentView("generating")}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Retry Selected Labels
                </Button>
              </>
            )}

            {currentView === "coded-template" && (
              <>
                <ChatMessage type="bot" content="Labels detected successfully! What would you like me to generate?" />
                <div className="space-y-2">
                  <TemplateOption
                    title="Final Sample Template"
                    description="Generate persona-filled email samples"
                    icon="document"
                  />
                  <TemplateOption
                    title="Coded Template"
                    description="Generate template with variable mappings"
                    icon="code"
                    selected
                  />
                </div>
                <Button
                  onClick={() => setCurrentView("confidence")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Generate Final Samples
                </Button>
              </>
            )}

            {currentView === "confidence" && (
              <>
                <ChatMessage type="bot" content="What would you like me to generate?" />
                <div className="space-y-2">
                  <TemplateOption
                    title="Final Sample Template"
                    description="Generate persona-filled email samples"
                    icon="document"
                  />
                  <TemplateOption
                    title="Coded Template"
                    description="Generate template with variable mappings"
                    icon="code"
                    selected
                  />
                </div>
                <ConfidencePanel />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  Generate Coded Template
                </Button>
              </>
            )}

            {currentView === "initial" && userType === "business" && (
              <>
                <ChatMessage type="bot" content="Success! Here are the labels detected:" />
                <div className="flex flex-wrap gap-2 px-1">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Customer_Name
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Loan_Type
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Loan_Amount
                  </span>
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 text-sm rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Loan_Start_Date
                  </span>
                </div>
                <Button
                  onClick={() => setCurrentView("labels-detected")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Generate Final Samples
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function ChatMessage({ type, content, success }: { type: "bot" | "user"; content: string; success?: boolean }) {
  return (
    <div className="flex gap-3">
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          type === "bot" ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        {type === "bot" ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-gray-600" />}
      </div>
      <div
        className={`flex-1 px-4 py-3 rounded-lg ${
          type === "bot" ? "bg-white border border-gray-200" : "bg-blue-50 border border-blue-100"
        }`}
      >
        {success && (
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-green-600">Success</span>
          </div>
        )}
        <p className={`text-sm ${type === "bot" ? "text-gray-700" : "text-gray-800"}`}>{content}</p>
      </div>
    </div>
  )
}

function TemplateOption({ title, description, icon, selected }: any) {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 ${
        selected ? "bg-blue-50 border-blue-600" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
            selected ? "bg-blue-600" : "bg-gray-100"
          }`}
        >
          {icon === "document" ? (
            <svg
              className={`w-5 h-5 ${selected ? "text-white" : "text-gray-600"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          ) : (
            <svg
              className={`w-5 h-5 ${selected ? "text-white" : "text-gray-600"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-medium text-sm ${selected ? "text-blue-900" : "text-gray-900"}`}>{title}</h3>
            {selected && (
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}

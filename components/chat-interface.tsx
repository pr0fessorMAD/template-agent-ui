"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, User, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import type { Message, FlowState } from "@/app/page"

interface ChatInterfaceProps {
  messages: Message[]
  onAction: (action: string, data?: any) => void
  flowState: FlowState
  userType: "business" | "developer" | null
  completedActions: string[]
}

export function ChatInterface({ messages, onAction, flowState, userType, completedActions }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // For now, treat text input as custom action
      onAction("custom-input", { message: inputValue.trim() })
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-white font-semibold text-lg">Template Assistant</h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white text-xs">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-4 py-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === "bot" ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                {message.type === "bot" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`px-4 py-3 rounded-lg ${
                    message.type === "bot"
                      ? "bg-gray-100 border border-gray-200"
                      : "bg-blue-50 border border-blue-100"
                  }`}
                >
                  {message.data?.processing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span className="text-sm text-gray-600">{message.content}</span>
                    </div>
                  ) : (
                    <p className={`text-sm ${message.type === "bot" ? "text-gray-700" : "text-gray-800"}`}>
                      {message.content}
                    </p>
                  )}
                </div>
                {message.buttons && message.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.buttons.map((button, index) => {
                      const isUserTypeButton = button.action === "select-business" || button.action === "select-developer"
                      const isActionCompleted = completedActions.includes(button.action)
                      const isDisabled = isUserTypeButton && userType !== null || isActionCompleted

                      return (
                        <Button
                          key={index}
                          onClick={() => !isDisabled && onAction(button.action)}
                          variant={button.variant || "default"}
                          size="sm"
                          disabled={isDisabled}
                          className={`${
                            button.variant === "outline"
                              ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                              : isDisabled
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {button.label}
                        </Button>
                      )
                    })}
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-4 py-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={flowState === "processing-template" || flowState === "generating-samples" || flowState === "generating-coded-template" || flowState === "retrying-mapping"}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || flowState === "processing-template" || flowState === "generating-samples" || flowState === "generating-coded-template" || flowState === "retrying-mapping"}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Press Enter to send • Use buttons above for quick actions
        </div>
      </div>
    </div>
  )
}
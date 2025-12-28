"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"

interface TemplateInputModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (template: string, schema: string) => void
}

export function TemplateInputModal({ isOpen, onClose, onSubmit }: TemplateInputModalProps) {
  const [template, setTemplate] = useState("")
  const [schema, setSchema] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (template.trim() && schema.trim()) {
      onSubmit(template.trim(), schema.trim())
      setTemplate("")
      setSchema("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Provide Template and Schema</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template">Email Template</Label>
            <Textarea
              id="template"
              placeholder="Enter your email template with variables (e.g., Dear {{Customer_Name}}, ...)"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-sm text-gray-500">
              Use double curly braces for variables, e.g., {"{{Customer_Name}}"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="schema">Data Schema</Label>
            <Input
              id="schema"
              placeholder="Enter comma-separated field names (e.g., Customer_Name, Loan_Type, Loan_Amount)"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              List the available data fields separated by commas
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!template.trim() || !schema.trim()}>
              Process Template
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
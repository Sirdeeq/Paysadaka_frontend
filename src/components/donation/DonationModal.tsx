"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Dialog } from "@headlessui/react"
import { Loader2, UploadCloud, Check, AlertCircle, ChevronRight, ChurchIcon as Mosque } from "lucide-react"

export const DonationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  reference,
  amount,
  onUpload,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
  reference: string
  amount: number
  onUpload: (file: File) => void
}) => {
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [copied, setCopied] = useState(false)

  // Reset copied state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCopied(false)
    }
  }, [isOpen])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setReceiptFile(file)
      onUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReceiptFile(file)
      onUpload(file)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
          {/* Header with Islamic pattern */}
          <div className="bg-emerald-600 p-6 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1584286595398-a96c206e012d?q=80&w=800&auto=format")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "soft-light",
              }}
            ></div>
            <div className="relative flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Mosque className="h-6 w-6 text-white" />
              </div>
              <Dialog.Title className="text-xl font-bold text-white">Complete Your Donation</Dialog.Title>
            </div>
            <p className="text-emerald-50 mt-2 text-sm opacity-90">
              Transfer the amount and upload your receipt to complete your donation
            </p>
          </div>

          <div className="p-6">
            {/* Payment Information */}
            <div className="mb-6 bg-emerald-50 rounded-xl p-5 border border-emerald-100">
              <h3 className="font-medium text-emerald-800 mb-3 flex items-center">
                <span className="bg-emerald-100 p-1 rounded-full mr-2">
                  <ChevronRight className="h-4 w-4 text-emerald-600" />
                </span>
                Payment Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-medium text-gray-800">Moniepoint</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="font-medium text-gray-800">SADAQAH DIGITAL SERVICES LTD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Number:</span>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800 mr-2">5014667842</span>
                    <button
                      onClick={() => copyToClipboard("5014667842")}
                      className="text-emerald-600 hover:text-emerald-700 p-1 rounded-full hover:bg-emerald-50"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-800">₦{amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium text-gray-800">{reference}</span>
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Upload Payment Receipt</h3>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 ${
                  dragActive ? "border-emerald-500 bg-emerald-50" : "border-dashed border-emerald-200"
                } rounded-xl transition-all duration-200 overflow-hidden`}
              >
                <div
                  onClick={() => inputRef.current?.click()}
                  className="p-6 text-center cursor-pointer hover:bg-emerald-50 transition-colors"
                >
                  {receiptFile ? (
                    <div className="space-y-3">
                      <div className="relative mx-auto w-full max-w-[200px] aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(receiptFile) || "/placeholder.svg"}
                          alt="Receipt preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-xs py-1 px-2">
                          <Check className="inline-block w-3 h-3 mr-1" />
                          Receipt uploaded
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-emerald-700">{receiptFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(receiptFile.size / 1024).toFixed(1)} KB · Click to change
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 px-4">
                      <div className="bg-emerald-50 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <UploadCloud className="w-8 h-8 text-emerald-600" />
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (max. 5MB)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={inputRef}
                    onChange={handleBrowse}
                    aria-label="Upload receipt"
                  />
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mb-6 bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Important</p>
                <p>
                  Please include the reference number <span className="font-medium">{reference}</span> in your transfer
                  description to help us identify your donation.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {isLoading ? (
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                <Loader2 className="animate-spin w-5 h-5 text-emerald-600 mr-3" />
                <span className="text-gray-700">Processing your donation...</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={onConfirm}
                  disabled={!receiptFile}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  Confirm Donation
                  {receiptFile && <ChevronRight className="ml-2 h-5 w-5" />}
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-white text-gray-600 py-3 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Islamic Quote */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 italic">
                "Whoever builds a mosque for Allah, Allah will build for him a house in Paradise."
              </p>
              <p className="text-xs text-emerald-600 mt-1">- Sahih al-Bukhari</p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

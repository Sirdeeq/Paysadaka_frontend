"use client"

import type React from "react"
import { Dialog } from "@headlessui/react"
import {
  X,
  Building2,
  Mail,
  Phone,
  DollarSign,
  Check,
  Shield,
  BanknoteIcon as Bank,
  MapPin,
  AlertTriangle,
  Calendar,
  Users,
} from "lucide-react"
import type { Organization } from "../../types/donation"

interface MasjidDetailModalProps {
  isOpen: boolean
  onClose: () => void
  masjid: Organization
  onVerify: (masjidId: string) => void
  onBlock: (masjidId: string) => void
}

export const MasjidDetailModal: React.FC<MasjidDetailModalProps> = ({ isOpen, onClose, masjid, onVerify, onBlock }) => {
  if (!masjid) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="inline-block align-middle bg-white rounded-2xl text-left shadow-xl transform transition-all w-full max-w-2xl">
          {/* Header with Islamic pattern */}
          <div className="bg-emerald-600 p-6 relative overflow-hidden rounded-t-2xl">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1584286595398-a96c206e012d?q=80&w=800&auto=format")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "soft-light",
              }}
            ></div>
            <div className="relative flex justify-between items-start">
              <div>
                <Dialog.Title className="text-xl font-bold text-white flex items-center gap-2">
                  <Building2 className="h-6 w-6" />
                  {masjid.name}
                </Dialog.Title>
                <p className="text-emerald-50 text-sm mt-1 opacity-90">Masjid ID: {masjid._id || masjid.id}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Status banner */}
            <div
              className={`mb-6 p-3 rounded-lg flex items-center ${
                masjid.is_verified
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {masjid.is_verified ? (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  <span>This masjid has been verified and is active on PaySadaka.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>This masjid is awaiting verification. Review their details and verify if appropriate.</span>
                </>
              )}
            </div>

            {/* Masjid Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-emerald-800 border-b border-emerald-200 pb-2">
                  Masjid Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-emerald-600 mt-0.5 mr-2" />
                    <div>
                      <div className="font-medium text-gray-800">Address</div>
                      <div className="text-gray-600">{masjid.address || "Not provided"}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-emerald-600 mt-0.5 mr-2" />
                    <div>
                      <div className="font-medium text-gray-800">Email</div>
                      <div className="text-gray-600">{masjid.email || "Not provided"}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-emerald-600 mt-0.5 mr-2" />
                    <div>
                      <div className="font-medium text-gray-800">Phone Number</div>
                      <div className="text-gray-600">{masjid.phone_number || "Not provided"}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5 mr-2" />
                    <div>
                      <div className="font-medium text-gray-800">Current Balance</div>
                      <div className="text-gray-900 font-medium">
                        ₦{(masjid.masjid_balance || 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  {masjid.created_at && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-emerald-600 mt-0.5 mr-2" />
                      <div>
                        <div className="font-medium text-gray-800">Registration Date</div>
                        <div className="text-gray-600">
                          {new Date(masjid.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {masjid.donation_count && (
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-emerald-600 mt-0.5 mr-2" />
                      <div>
                        <div className="font-medium text-gray-800">Total Donations</div>
                        <div className="text-gray-600">{masjid.donation_count}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-emerald-800 border-b border-emerald-200 pb-2">
                  Bank Details
                </h3>

                {masjid.bank_details ? (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                    <div className="flex items-start">
                      <Bank className="h-5 w-5 text-emerald-600 mt-0.5 mr-2" />
                      <div>
                        <div className="font-medium text-gray-800">Bank Name</div>
                        <div className="text-gray-600">{masjid.bank_details.bank_name}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-5 w-5 text-emerald-600 mt-0.5 mr-2 flex items-center justify-center">
                        <span className="text-xs font-bold">#</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Account Number</div>
                        <div className="text-gray-900 font-mono">{masjid.bank_details.account_number}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-600 mt-0.5 mr-2" />
                      <div>
                        <div className="font-medium text-gray-800">Account Name</div>
                        <div className="text-gray-600">{masjid.bank_details.account_name}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No bank details provided</div>
                )}

                {masjid.logo?.url && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-2">Masjid Logo</h4>
                    <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                      <img
                        src={masjid.logo.url || "/placeholder.svg"}
                        alt={`${masjid.name} Logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=128&width=128"
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Islamic decoration */}
            <div className="my-6 flex justify-center">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-12 bg-emerald-200 rounded-full"></div>
                <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                <div className="h-0.5 w-12 bg-emerald-200 rounded-full"></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
              {!masjid.is_verified && (
                <button
                  onClick={() => onVerify(masjid._id)}
                  className="flex-1 sm:flex-none bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Shield className="h-5 w-5" />
                  <span>Verify Masjid</span>
                </button>
              )}

              <button
                onClick={() => onBlock(masjid._id)}
                className="flex-1 sm:flex-none bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <AlertTriangle className="h-5 w-5" />
                <span>Block Masjid</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 sm:flex-none bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

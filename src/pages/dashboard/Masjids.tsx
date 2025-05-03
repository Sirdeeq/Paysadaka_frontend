"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Eye, CheckCircle, XCircle, AlertCircle, Building2, MapPin, Phone, DollarSign } from "lucide-react"
import { blockMasjidByAdmin, fetchMasjids, verifyMasjidByAdmin } from "../../services/api"
import type { Organization } from "../../types/donation"
import { MasjidDetailModal } from "./MasjidDetailModal"
import { toast } from "react-hot-toast"

export const Masjids: React.FC = () => {
  const [masjids, setMasjids] = useState<Organization[]>([])
  const [filteredMasjids, setFilteredMasjids] = useState<Organization[]>([])
  const [selectedMasjid, setSelectedMasjid] = useState<Organization | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    loadMasjids()
  }, [])

  useEffect(() => {
    // Filter masjids based on search query
    const filtered = masjids.filter((masjid) => {
      const query = searchQuery.toLowerCase()
      return (
        masjid.name.toLowerCase().includes(query) || (masjid.address && masjid.address.toLowerCase().includes(query))
      )
    })
    setFilteredMasjids(filtered)
  }, [searchQuery, masjids])

  const loadMasjids = async () => {
    setIsLoading(true)
    try {
      const data = await fetchMasjids()
      setMasjids(data)
      setFilteredMasjids(data)
    } catch (error) {
      console.error("Error loading masjids:", error)
      toast.error("Failed to load masjids")
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewMasjid = (masjid: Organization) => {
    setSelectedMasjid(masjid)
    setIsModalOpen(true)
  }

  const handleVerifyMasjid = async (masjidId: string) => {
    if (!token) {
      toast.error("Authentication required")
      return
    }

    try {
      await verifyMasjidByAdmin(masjidId, token)
      toast.success("Masjid verified successfully")
      loadMasjids()
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error verifying masjid:", error)
      toast.error("Failed to verify masjid")
    }
  }

  const handleBlockMasjid = async (masjidId: string) => {
    if (!token) {
      toast.error("Authentication required")
      return
    }

    try {
      await blockMasjidByAdmin(masjidId, token)
      toast.success("Masjid blocked successfully")
      loadMasjids()
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error blocking masjid:", error)
      toast.error("Failed to block masjid")
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Islamic design elements */}
      <div className="mb-8 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600 opacity-80"></div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-full bg-emerald-100">
            <Building2 className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-800">Manage Masjids</h1>
        </div>
        <p className="text-gray-600 ml-1">View, verify and manage all registered masjids in the system</p>
      </div>

      {/* Search Bar & Filters */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium text-emerald-700">{filteredMasjids.length}</span> masjids
          </div>
          <button
            onClick={loadMasjids}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Masjids Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading masjids data...</p>
          </div>
        ) : filteredMasjids.length === 0 ? (
          <div className="p-8 text-center">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No masjids found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? "Try adjusting your search query" : "No masjids have been registered yet"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-emerald-600 font-medium hover:text-emerald-700"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-50 text-left">
                  <th className="px-6 py-4 text-sm font-medium text-emerald-800">Masjid Name</th>
                  <th className="px-6 py-4 text-sm font-medium text-emerald-800">Address</th>
                  <th className="px-6 py-4 text-sm font-medium text-emerald-800">Phone Number</th>
                  <th className="px-6 py-4 text-sm font-medium text-emerald-800">Balance</th>
                  <th className="px-6 py-4 text-sm font-medium text-emerald-800">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-emerald-800 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMasjids.map((masjid) => (
                  <tr key={masjid.id || masjid._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                          <Building2 className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{masjid.name}</div>
                          {masjid.email && <div className="text-xs text-gray-500">{masjid.email}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0" />
                        <span className="text-gray-600">{masjid.address || "Not provided"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0" />
                        <span className="text-gray-600">{masjid.phone_number || "Not provided"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0" />
                        <span className="font-medium text-gray-900">
                          ₦{(masjid.masjid_balance || 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          masjid.is_verified ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            masjid.is_verified ? "bg-green-500" : "bg-amber-500"
                          } mr-1.5`}
                        ></span>
                        {masjid.is_verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleViewMasjid(masjid)}
                          className="p-1.5 rounded-full text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        {!masjid.is_verified && (
                          <button
                            onClick={() => handleVerifyMasjid(masjid._id)}
                            className="p-1.5 rounded-full text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors"
                            title="Verify Masjid"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleBlockMasjid(masjid._id)}
                          className="p-1.5 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Block Masjid"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Masjid Detail Modal */}
      {selectedMasjid && (
        <MasjidDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          masjid={selectedMasjid}
          onVerify={handleVerifyMasjid}
          onBlock={handleBlockMasjid}
        />
      )}
    </div>
  )
}

export default Masjids

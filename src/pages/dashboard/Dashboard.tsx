"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Building2, Heart, Eye, EyeOff, Calendar, Moon, ArrowRight, Users, Landmark, Check, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { adminBalance } from "../../services/api"
import { MasjidForm } from "../../components/dashboard/MasjidForm"
import CharityForm from "../../components/dashboard/CharityForm"
import { TableCard } from "./component/TableCard"

// Sample data for tables
const pendingDonations = [
  {
    id: "don-1",
    name: "Ahmed Hassan",
    amount: "₦25,000",
    date: "2023-05-01",
    type: "Masjid",
    status: "pending",
    image: "https://images.unsplash.com/photo-1584286595398-a96c206e012d?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "don-2",
    name: "Fatima Ibrahim",
    amount: "₦15,000",
    date: "2023-05-02",
    type: "Charity",
    status: "pending",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "don-3",
    name: "Mohammed Ali",
    amount: "₦30,000",
    date: "2023-05-03",
    type: "Ramadan",
    status: "pending",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "don-4",
    name: "Aisha Yusuf",
    amount: "₦10,000",
    date: "2023-05-04",
    type: "Masjid",
    status: "pending",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "don-5",
    name: "Ibrahim Musa",
    amount: "₦50,000",
    date: "2023-05-05",
    type: "Charity",
    status: "pending",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop",
  },
]

const pendingMasjids = [
  {
    id: "mas-1",
    name: "Al-Noor Masjid",
    location: "Lagos, Nigeria",
    date: "2023-05-01",
    status: "pending",
    image: "https://images.unsplash.com/photo-1584286595398-a96c206e012d?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "mas-2",
    name: "Al-Rahma Masjid",
    location: "Abuja, Nigeria",
    date: "2023-05-02",
    status: "pending",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "mas-3",
    name: "Central Mosque",
    location: "Kano, Nigeria",
    date: "2023-05-03",
    status: "pending",
    image: "https://images.unsplash.com/photo-1588764815242-a465083d4fee?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "mas-4",
    name: "Uthman Ibn Affan Masjid",
    location: "Ibadan, Nigeria",
    date: "2023-05-04",
    status: "pending",
    image: "https://images.unsplash.com/photo-1585129918930-eef8c21c5177?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "mas-5",
    name: "Al-Furqan Masjid",
    location: "Port Harcourt, Nigeria",
    date: "2023-05-05",
    status: "pending",
    image: "https://images.unsplash.com/photo-1626088689757-37f8aee2c424?q=80&w=100&h=100&auto=format&fit=crop",
  },
]

const pendingCharities = [
  {
    id: "char-1",
    name: "Islamic Relief",
    category: "Humanitarian",
    date: "2023-05-01",
    status: "pending",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "char-2",
    name: "Zakat Foundation",
    category: "Poverty Relief",
    date: "2023-05-02",
    status: "pending",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "char-3",
    name: "Orphan Care Initiative",
    category: "Children",
    date: "2023-05-03",
    status: "pending",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "char-4",
    name: "Water for All",
    category: "Water Projects",
    date: "2023-05-04",
    status: "pending",
    image: "https://images.unsplash.com/photo-1519184269465-91a5a6736529?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: "char-5",
    name: "Education First",
    category: "Education",
    date: "2023-05-05",
    status: "pending",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=100&h=100&auto=format&fit=crop",
  },
]

// Import mosque images
const mosqueImages = [
  "https://images.unsplash.com/photo-1584286595398-a96c206e012d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588764815242-a465083d4fee?q=80&w=800&auto=format&fit=crop",
]

interface CardProps {
  title: string
  value?: string | number
  icon: React.ReactNode
  bgColor?: string
  onClick?: () => void
  children?: React.ReactNode
}

const StatCard: React.FC<CardProps> = ({ title, value, icon, bgColor = "bg-white", onClick, children }) => {
  return (
    <div
      className={`${bgColor} rounded-xl shadow-sm p-5 transition-all hover:shadow-md ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          {value && <h3 className="text-2xl font-bold">{value}</h3>}
        </div>
        <div className="p-2 rounded-full bg-emerald-50">{icon}</div>
      </div>
      {children}
    </div>
  )
}

const ActionCard: React.FC<CardProps> = ({
  title,
  icon,
  bgColor = "bg-gradient-to-r from-emerald-500 to-teal-600",
  onClick,
}) => {
  return (
    <div
      className={`${bgColor} rounded-xl shadow-sm p-5 text-white cursor-pointer transition-transform hover:scale-[1.02]`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <div className="p-2 rounded-full bg-white/20">{icon}</div>
      </div>
      <div className="flex items-center mt-4 text-sm">
        <span>Get Started</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"masjid" | "charity" | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [balanceVisible, setBalanceVisible] = useState<boolean>(false)
  const [currentMosqueIndex, setCurrentMosqueIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      adminBalance(token)
        .then((balanceData) => {
          setBalance(balanceData.admin_balance)
        })
        .catch((error) => {
          console.error("Error fetching balance:", error)
        })
    }

    // Rotate mosque images
    const interval = setInterval(() => {
      setCurrentMosqueIndex((prevIndex) => (prevIndex + 1) % mosqueImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Fetch balance from the API and update state when Balance Card is clicked
  const handleBalanceClick = async () => {
    const token = localStorage.getItem("authToken")
    if (token) {
      try {
        const balanceData = await adminBalance(token)
        setBalance(balanceData.admin_balance)
        toast.success(`Current balance: ₦${balanceData.admin_balance.toFixed(2)}`, {
          position: "top-center",
        })
      } catch (error) {
        console.error("Error fetching balance:", error)
        toast.error("Failed to fetch balance.")
      }
    }
  }

  // Toggle visibility of balance
  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible)
  }

  // Handle approval of donations
  const handleApproveDonation = (id: string) => {
    toast.success(`Donation ${id} approved successfully!`)
  }

  // Handle rejection of donations
  const handleRejectDonation = (id: string) => {
    toast.error(`Donation ${id} rejected.`)
  }

  // Handle approval of masjids
  const handleApproveMasjid = (id: string) => {
    toast.success(`Masjid ${id} approved successfully!`)
  }

  // Handle approval of charities
  const handleApproveCharity = (id: string) => {
    toast.success(`Charity ${id} approved successfully!`)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img
                src="/images/Masjid.png"}
                alt="Featured Mosque"
                className="w-full h-full object-cover transition-opacity duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to PaySadaka</h1>
                <p className="text-sm md:text-base opacity-90">
                  Manage your donations and support local mosques and charities
                </p>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveForm("masjid")}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-emerald-100 mb-2">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700">Add Masjid</span>
                </button>

                <button
                  onClick={() => setActiveForm("charity")}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-emerald-100 mb-2">
                    <Heart className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700">Add Charity</span>
                </button>

                <button
                  onClick={() => navigate("/dashboard/donations")}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-emerald-100 mb-2">
                    <Landmark className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700">Donations</span>
                </button>

                <button
                  onClick={() => navigate("/dashboard/ramadan")}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-emerald-100 mb-2">
                    <Moon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700">Ramadan</span>
                </button>
              </div>
            </div>
          </div>

          {activeForm === "masjid" && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Masjid</h2>
              <MasjidForm />
            </div>
          )}

          {activeForm === "charity" && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Charity</h2>
              <CharityForm />
            </div>
          )}

          {/* Pending Donations Table Card */}
          <TableCard
            title="Pending Donations"
            data={pendingDonations}
            columns={[
              {
                header: "Donor",
                accessor: "name",
                cell: (item) => (
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=32&width=32"
                      }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                ),
              },
              { header: "Amount", accessor: "amount" },
              { header: "Type", accessor: "type" },
              {
                header: "Date",
                accessor: "date",
                cell: (item) => new Date(item.date).toLocaleDateString(),
              },
              {
                header: "Actions",
                accessor: "actions",
                cell: (item) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveDonation(item.id)}
                      className="p-1 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600"
                      title="Approve"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRejectDonation(item.id)}
                      className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                      title="Reject"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ),
              },
            ]}
            viewAllLink="/dashboard/donations"
            className="mb-6"
          />

          {/* Pending Masjids Table Card */}
          <TableCard
            title="Pending Masjids"
            data={pendingMasjids}
            columns={[
              {
                header: "Masjid",
                accessor: "name",
                cell: (item) => (
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=32&width=32"
                      }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                ),
              },
              { header: "Location", accessor: "location" },
              {
                header: "Date",
                accessor: "date",
                cell: (item) => new Date(item.date).toLocaleDateString(),
              },
              {
                header: "Actions",
                accessor: "actions",
                cell: (item) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveMasjid(item.id)}
                      className="p-1 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600"
                      title="Approve"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ),
              },
            ]}
            viewAllLink="/dashboard/masjids"
            className="mb-6"
          />

          {/* Pending Charities Table Card */}
          <TableCard
            title="Pending Charities"
            data={pendingCharities}
            columns={[
              {
                header: "Charity",
                accessor: "name",
                cell: (item) => (
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=32&width=32"
                      }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                ),
              },
              { header: "Category", accessor: "category" },
              {
                header: "Date",
                accessor: "date",
                cell: (item) => new Date(item.date).toLocaleDateString(),
              },
              {
                header: "Actions",
                accessor: "actions",
                cell: (item) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveCharity(item.id)}
                      className="p-1 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600"
                      title="Approve"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ),
              },
            ]}
            viewAllLink="/dashboard/charities"
          />
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <StatCard
            title="Account Balance"
            value={balanceVisible && balance !== null ? `₦${balance?.toFixed(2)}` : "••••••"}
            icon={
              balanceVisible ? (
                <EyeOff className="w-5 h-5 text-emerald-600" />
              ) : (
                <Eye className="w-5 h-5 text-emerald-600" />
              )
            }
            onClick={toggleBalanceVisibility}
          >
            <button
              onClick={handleBalanceClick}
              className="mt-2 text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center"
            >
              Refresh Balance
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </StatCard>

          <StatCard title="Active Users" value="1,254" icon={<Users className="w-5 h-5 text-emerald-600" />} />

          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Quick Access</h3>

            <ActionCard
              title="Ramadan Campaign"
              icon={<Moon className="w-5 h-5 text-white" />}
              onClick={() => navigate("/dashboard/ramadan")}
            />

            <ActionCard
              title="Prayer Times"
              icon={<Calendar className="w-5 h-5 text-white" />}
              bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
              onClick={() => navigate("/dashboard/prayer-times")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

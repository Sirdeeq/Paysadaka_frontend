import React, { useState, useEffect } from "react";
import { fetchDonations, fetchDonationById, verifyDonation, approveDonation } from "../../services/api";
import Modal from "../../components/common/Modal";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Check, Eye, HandThumbsUp } from "lucide-react";  // Import icons from Lucide

interface Donation {
  _id: string;
  donor_name: string;
  category: string;
  masjid_name: string;  // Added masjid_name to the Donation interface
  masjid_balance: number;  // Added masjid_balance to the Donation interface
  status: string;  // Added status to the Donation interface
  amount: number;
  paystack_reference: string;
}

export const Donations: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const data = await fetchDonations();
      if (Array.isArray(data)) {
        setDonations(data);
      } else {
        console.error("Invalid donation data format:", data);
        toast.error("Failed to load donations.");
      }
    } catch (error) {
      console.error("Error loading donations:", error);
      toast.error("Failed to load donations.");
    }
  };

  const handleView = async (id: string | undefined) => {
    if (!id) {
      console.error("Donation ID is undefined.");
      toast.error("Invalid donation ID.");
      return;
    }
    try {
      const donation = await fetchDonationById(id);
      if (donation) {
        setSelectedDonation(donation);
        setIsModalOpen(true);
      } else {
        toast.error("Donation not found.");
      }
    } catch (error) {
      console.error("Error fetching donation details:", error);
      toast.error("Failed to load donation details.");
    }
  };

  const handleDonate = async (donation: Donation | null) => {
    if (!donation || !donation._id) {
      console.error("Invalid donation object.");
      toast.error("Cannot process donation.");
      return;
    }
    const reference = await verifyDonation(donation.paystack_reference);
    console.log(reference);
    toast.success(`Donating to ${donation.donor_name}`);
    navigate(`/dashboard/donation/${donation._id}`);
  };

  const handleApprove = async (id: string) => {
    const password = localStorage.getItem("adminPassword");
    const token = localStorage.getItem("authToken"); 
  
    if (!password) {
      toast.error("Admin password not found in local storage");
      return;
    }
  
    if (!token) {
      toast.error("Authentication token not found in local storage");
      return;
    }
  
    try {
      const response = await approveDonation(id, password, token); 
      console.log(response);
      toast.success("Donation approved successfully");
      loadDonations();
    } catch (error) {
      console.error("Error approving donation:", error);
      toast.error("Failed to approve donation.");
    }
  };

  const columns = [
    { header: "S/N", render: (_: any, __: any, index: number) => index + 1 },
    { header: "Donation ID", accessor: "_id" },
    { header: "Organization Account", accessor: "recipient" },  // Show masjid name
    // { header: "Organization Balance", accessor: "recipient_balance" },  // Show masjid balance
    { header: "Status", accessor: "status" },  // Show donation status
    { header: "Donor Name", accessor: "donor_name" },
    { header: "Category", accessor: "category" },
    {
      header: "Amount",
      accessor: "amount",
      render: (value: number) => `₦${value.toFixed(2)}`,
    },
    {
      header: "Actions",
      render: (_: any, donation: Donation) => {
        return (
          <div className="flex space-x-2">
            {/* Only show View and Donate buttons if donation is not approved */}
              <button
                onClick={() => handleView(donation._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Eye /> {/* View icon */}
              </button>
            {donation.status !== 'approved' && (
              <button
                onClick={() => handleApprove(donation._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Check /> {/* Approve icon */}
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Donations</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-900"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id} className="border-t">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 text-sm text-gray-700">
                    {col.render
                      ? col.render(
                          donation[col.accessor as keyof Donation],
                          donation,
                          index
                        )
                      : donation[col.accessor as keyof Donation]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedDonation && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{selectedDonation.donor_name}</h2>
            <p className="text-lg font-semibold text-gray-800">
              Donation Amount: ₦{selectedDonation.amount.toFixed(2)}
            </p>
            <p className="text-lg font-semibold capitalize text-gray-800">
              Donation Status: {selectedDonation.status}
            </p>
            <p className="text-lg font-semibold capitalize text-gray-800">
              Donation Category: {selectedDonation.category}
            </p>
            <p className="text-lg font-semibold capitalize text-gray-800">
              Donation Masjid: {selectedDonation.masjid_name}
            </p>
            {selectedDonation.status !== 'approved' && (
              <button
                onClick={() => handleDonate(selectedDonation)}
                className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                <Check /> {/* Donate icon */}
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

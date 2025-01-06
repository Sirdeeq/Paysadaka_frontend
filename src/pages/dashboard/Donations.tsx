import React, { useState, useEffect } from "react";
import { fetchDonations, fetchDonationById, verifyDonation, approveDonation } from "../../services/api";
import Modal from "../../components/common/Modal";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Check, Eye } from "lucide-react"; // Removed HandThumbsUp

// Donation Interface
interface Donation {
  _id: string;
  donor_name: string;
  category: string;
  masjid_name: string; // Added masjid_name to the Donation interface
  masjid_balance: number; // Added masjid_balance to the Donation interface
  status: string; // Added status to the Donation interface
  amount: number;
  paystack_reference: string;
}

export const Donations: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]); // Explicitly typed state
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null); // Explicitly typed state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const data: Donation[] = await fetchDonations(); // Type explicitly matches the return type of fetchDonations
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
      const donation: Donation = await fetchDonationById(id); // Explicitly typing `donation`
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
    try {
      const reference = await verifyDonation(donation.paystack_reference); // Explicitly typing not required if verifyDonation returns correct type
      console.log(reference);
      toast.success(`Donating to ${donation.donor_name}`);
      navigate(`/dashboard/donation/${donation._id}`);
    } catch (error) {
      console.error("Error verifying donation:", error);
      toast.error("Failed to verify donation.");
    }
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
      const response = await approveDonation(id, password, token); // Assuming response is already typed in `approveDonation`
      console.log(response);
      toast.success("Donation approved successfully");
      loadDonations();
    } catch (error) {
      console.error("Error approving donation:", error);
      toast.error("Failed to approve donation.");
    }
  };

  const columns: 
  {
    header: string;
    accessor?: keyof Donation; // Ensure `accessor` is a key of Donation
    render?: (value: unknown, donation: Donation, index: number) => React.ReactNode;
  }[] = [
    
    { header: "S/N", render: (_: unknown, __: unknown, index: number) => index + 1 },
    { header: "Donation ID", accessor: "_id" },
    { header: "Organization Account", accessor: "masjid_name" }, // Correct accessor
    { header: "Status", accessor: "status" },
    { header: "Donor Name", accessor: "donor_name" },
    { header: "Category", accessor: "category" },
    {
      header: "Amount",
      accessor: "amount",
      render: (value: number) => `₦${value.toFixed(2)}`,
    },
    {
      header: "Actions",
      render: (_: unknown, donation: Donation) => {
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleView(donation._id)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              <Eye className="mr-2" /> View
            </button>
            {donation.status !== "approved" && (
              <button
                onClick={() => handleApprove(donation._id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
              >
                <Check className="mr-2" /> Approve
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
            {selectedDonation.status !== "approved" && (
              <button
                onClick={() => handleDonate(selectedDonation)}
                className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
              >
                <Check className="mr-2" /> Donate
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

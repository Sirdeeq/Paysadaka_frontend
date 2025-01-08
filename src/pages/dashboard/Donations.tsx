import React, { useState, useEffect } from "react";
import {
  fetchDonations,
  fetchDonationById,
  approveDonation,
  disburseDonation
} from "../../services/api";
import Modal from "../../components/common/Modal";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Check, Eye } from "lucide-react";

// Donation Interface
interface Donation {
  _id: string;
  donor_name: string;
  category: string;
  recipient: string;
  masjid_balance: number;
  status: string;
  amount: number;
  paystack_reference: string;
  bank_code: string;
  account_name: string;
}

export const Donations: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const data: Donation[] = await fetchDonations();
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
      const donation: Donation = await fetchDonationById(id);
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
      // Update the status of the donation after approval
      setDonations((prevDonations) =>
        prevDonations.map((donation) =>
          donation._id === id ? { ...donation, status: "approved" } : donation
        )
      );
    } catch (error) {
      console.error("Error approving donation:", error);
      toast.error("Failed to approve donation.");
    }
  };

  const handleDisburse = async (id: string, donation: Donation) => {
    const password = localStorage.getItem("adminPassword");
    const token = localStorage.getItem("authToken");

    if (!id) {
      console.error("Donation ID is undefined.");
      toast.error("Invalid donation ID.");
      return;
    }

    const { recipient: account_number, bank_code: bank_code, account_name: account_name } = donation;

    if (!account_number || !bank_code || !account_name) {
      toast.error("Account number, account name and bank code are required.");
      return;
    }

    if (!password) {
      toast.error("Admin password not found in local storage.");
      return;
    }

    if (!token) {
      toast.error("Authentication token not found in local storage.");
      return;
    }

    try {
      const response = await disburseDonation(
        id,
        password,
        token,
        account_number,
        bank_code,
        account_name
      );
      console.log(response);
      toast.success("Donation disbursed successfully.");
      loadDonations(); // Refresh the donations list
    } catch (error) {
      console.error("Error disbursing donation:", error);
      toast.error("Failed to disburse donation.");
    }
  };

  const columns = [
    {
      header: "S/N",
      render: (_: unknown, __: unknown, index: number) => index + 1
    },
    { header: "Donation ID", accessor: "_id" },
    { header: "Organization Account Number", accessor: "recipient" },
    { header: "Status", accessor: "status" },
    { header: "Donor Name", accessor: "donor_name" },
    { header: "Category", accessor: "category" },
    {
      header: "Amount",
      accessor: "amount",
      render: (value: unknown) => `₦${(value as number).toFixed(2)}`
    },
    {
      header: "Actions",
      render: (_: unknown, donation: Donation) => (
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
          {donation.status === "approved" && (
            <button
              onClick={() => handleDisburse(donation._id, donation)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            >
              <Check className="mr-2" /> Disburse
            </button>
          )}
        </div>
      )
    }
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
            <h2 className="text-2xl font-bold mb-2">
              {selectedDonation.donor_name}
            </h2>
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
              Donation Masjid: {selectedDonation.recipient}
            </p>
            {selectedDonation.status === "approved" && (
              <button
                onClick={() =>
                  handleDisburse(selectedDonation._id, selectedDonation)
                }
                className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
              >
                <Check className="mr-2" /> Disburse
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

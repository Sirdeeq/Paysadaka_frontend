import React, { useState, useEffect } from "react";
import {
  fetchDonations,
  fetchDonationById,
  approveDonation,
  disburseDonation
} from "../../services/api";
import Modal from "../../components/common/Modal";
import { toast } from "react-hot-toast";
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
  bank_name: string;
}

export const Donations: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const navigate = useNavigate();

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

    const {
      recipient: account_number,
      bank_code: bank_code,
      account_name: account_name
    } = donation;

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
    { header: "Bank Name", accessor: "bank_name" }, // New Column for Bank Name
    { header: "Account Name", accessor: "account_name" }, // New Column for Account Name
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
          <div className="relative p-8 bg-white rounded-lg shadow-lg max-w-lg mx-auto transition-all transform duration-300 ease-in-out">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Donation Details
            </h2>
            <div className="space-y-4">
              <p className="text-xl font-semibold text-gray-700">
                Donor Name:{" "}
                <span className="font-normal">
                  {selectedDonation.donor_name}
                </span>
              </p>
              <p className="text-xl font-semibold text-gray-700">
                Donation Amount:{" "}
                <span className="font-normal">
                  ₦{selectedDonation.amount.toFixed(2)}
                </span>
              </p>
              <p className="text-xl font-semibold text-gray-700">
                Status:{" "}
                <span className="font-normal capitalize">
                  {selectedDonation.status}
                </span>
              </p>
              <p className="text-xl font-semibold text-gray-700">
                Category:{" "}
                <span className="font-normal capitalize">
                  {selectedDonation.category}
                </span>
              </p>
              <p className="text-xl font-semibold text-gray-700">
                Account Number:{" "}
                <span className="font-normal">
                  {selectedDonation.recipient}
                </span>
              </p>
              <p className="text-xl font-semibold text-gray-700">
                Bank Name:{" "}
                <span className="font-normal">
                  {selectedDonation.bank_name || "N/A"}
                </span>
              </p>
              <p className="text-xl font-semibold text-gray-700">
                Account Name:{" "}
                <span className="font-normal">
                  {selectedDonation.account_name || "N/A"}
                </span>
              </p>
            </div>

            {selectedDonation.status === "approved" && (
              <button
                onClick={() =>
                  handleDisburse(selectedDonation._id, selectedDonation)
                }
                className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                <Check className="mr-2 inline-block" /> Disburse Donation
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

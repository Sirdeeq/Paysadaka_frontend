import React, { useState, useEffect } from "react";
import { Table } from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import { blockCharityByAdmin, fetchCharities, verifyCharityByAdmin } from "../../services/api";
import { toast } from "react-hot-toast";
import type { Organization } from "../../types/donation";

export const Charities: React.FC = () => {
  const [charities, setCharities] = useState<Organization[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<Organization | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const token = localStorage.getItem("authToken");


  useEffect(() => {
    loadCharities();
  }, []);

  const loadCharities = async () => {
    try {
      const data = await fetchCharities();
      setCharities(data);
    } catch (error) {
      console.error("Error loading charities:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter charities based on search term
  const filteredCharities = charities.filter(
    (charity) =>
      charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charity.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: "Name", accessor: "name" as keyof Organization },
    { header: "Address", accessor: "address" as keyof Organization },
    { header: "Phone", accessor: "phone_number" as keyof Organization },
    {
      header: "Logo",
      accessor: "image" as keyof Organization,
      render: (value: string) => (
        <img
          src={value}
          alt="Charity Logo"
          className="w-16 h-16 object-cover rounded-full"
        />
      )
    },
    {
      header: "Status",
      accessor: "is_verified" as keyof Organization,
      render: (value: boolean) => (
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              value ? "bg-green-500" : "bg-red-500"
            } mr-2`}
          ></div>
          {value ? "Verified" : "Unverified"}
        </div>
      )
    },
    {
      header: "Current Balance",
      accessor: "charity_balance" as keyof Organization,
      render: (value: number) => `₦${value.toFixed(2)}`
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Charities</h1>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Name or Address"
          className="px-4 py-2 w-full max-w-md border border-gray-300 rounded"
        />
      </div>

      <Table
        data={filteredCharities}
        columns={columns}
        onView={(item) => {
          setSelectedCharity(item);
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && selectedCharity && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-8 bg-white rounded-lg shadow-xl max-w-xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center gap-6 mb-8">
              <img
                src={selectedCharity.logo?.url}
                alt={selectedCharity.name}
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-gray-200"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedCharity.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Empowering Communities, One Step at a Time
                </p>
              </div>
            </div>

            {/* Organization Details */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Organization Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">Address:</span>{" "}
                  {selectedCharity.address}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Phone:</span>{" "}
                  {selectedCharity.phone_number}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Status:</span>{" "}
                  <span
                    className={`font-semibold ${
                      selectedCharity.is_verified
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedCharity.is_verified ? "Verified" : "Unverified"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-800">
                    Current Balance:
                  </span>{" "}
                  ₦{selectedCharity.charity_balance.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Bank Details */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Bank Details
              </h3>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm space-y-3">
                <p>
                  <span className="font-semibold text-gray-800">
                    Bank Name:
                  </span>{" "}
                  {selectedCharity.bank_details.bank_name}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">
                    Account Name:
                  </span>{" "}
                  {selectedCharity.bank_details.account_name}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">
                    Account Number:
                  </span>{" "}
                  <span className="tracking-wide">
                    {selectedCharity.bank_details.account_number}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {!selectedCharity.is_verified && (
                <button
                  onClick={async () => {
                    try {
                      await verifyCharityByAdmin(
                        selectedCharity._id,
                        token
                      );
                      toast.success("Charity verified successfully");
                      loadCharities();
                      setIsModalOpen(false);
                    } catch (error) {
                      toast.error("Failed to verify charity");
                    }
                  }}
                  className="bg-emerald-600 text-white font-medium text-lg px-6 py-3 rounded-lg hover:bg-emerald-700 transition-transform transform hover:scale-105 shadow-md"
                >
                  Verify Charity
                </button>
              )}
              <button
                onClick={async () => {
                  try {
                    await blockCharityByAdmin(selectedCharity._id, token);
                    toast.success("Charity blocked successfully");
                    loadCharities();
                    setIsModalOpen(false);
                  } catch (error) {
                    toast.error("Failed to block charity");
                  }
                }}
                className="bg-red-600 text-white font-medium text-lg px-6 py-3 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-md"
              >
                Block Charity
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

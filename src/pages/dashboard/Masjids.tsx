import React, { useState, useEffect } from "react";
import { Table } from "../../components/common/Table";
import { blockMasjidByAdmin, fetchMasjids, verifyMasjid, verifyMasjidByAdmin } from "../../services/api";
import type { Organization } from "../../types/donation";
import Modal from "../../components/common/Modal";
import toast from "react-hot-toast";

export const Masjids: React.FC = () => {
  const [masjids, setMasjids] = useState<Organization[]>([]);
  const [filteredMasjids, setFilteredMasjids] = useState<Organization[]>([]);
  const [selectedMasjid, setSelectedMasjid] = useState<Organization | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const token = localStorage.getItem("authToken");


  useEffect(() => {
    loadMasjids();
  }, []);

  useEffect(() => {
    // Filter masjids based on search query
    const filtered = masjids.filter((masjid) => {
      const query = searchQuery.toLowerCase();
      return (
        masjid.name.toLowerCase().includes(query) ||
        masjid.address.toLowerCase().includes(query)
      );
    });
    setFilteredMasjids(filtered);
  }, [searchQuery, masjids]);

  const loadMasjids = async () => {
    try {
      const data = await fetchMasjids();
      setMasjids(data);
      setFilteredMasjids(data); // Set initial filtered data to all masjids
    } catch (error) {
      console.error("Error loading masjids:", error);
    }
  };

  const handleVerify = async (masjid: Organization) => {
    try {
      await verifyMasjid(masjid.id);
      loadMasjids();
    } catch (error) {
      console.error("Error verifying masjid:", error);
    }
  };

  const columns = [
    { header: "Masjid Name", accessor: "name" as keyof Organization },
    { header: "Masjid Address", accessor: "address" as keyof Organization },
    {
      header: "Masjid Phone  No.",
      accessor: "phone_number" as keyof Organization
    },
    {
      header: "Balance",
      accessor: "masjid_balance" as keyof Organization,
      render: (value: number) => `₦${value.toFixed(2)}`
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
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Masjids</h1>

      {/* Search Bar */}
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search by Name or Address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Table */}
      <Table
        data={filteredMasjids}
        columns={columns}
        onView={(item) => {
          setSelectedMasjid(item);
          setIsModalOpen(true);
        }}
      />

      {/* Modal */}
      {isModalOpen && selectedMasjid && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            {/* Masjid Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedMasjid.name}</h2>
              <img
                src={selectedMasjid.logo?.url}
                alt={`${selectedMasjid.name} Logo`}
                className="w-16 h-16 rounded-full border border-gray-300"
              />
            </div>

            {/* Masjid Details */}
            <div className="space-y-4">
              <p>
                <strong>Address:</strong> {selectedMasjid.address}
              </p>
              <p>
                <strong>Email:</strong> {selectedMasjid.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedMasjid.phone_number}
              </p>
              <p>
                <strong>Balance:</strong> ₦
                {selectedMasjid.masjid_balance.toFixed(2)}
              </p>
              <p className="flex items-center">
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-semibold rounded ${
                    selectedMasjid.is_verified
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedMasjid.is_verified ? "Verified" : "Unverified"}
                </span>
              </p>
            </div>

            {/* Bank Details */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md border">
              <h3 className="text-lg font-semibold mb-2">Bank Details</h3>
              <p>
                <strong>Bank Name:</strong>{" "}
                {selectedMasjid.bank_details.bank_name}
              </p>
              <p>
                <strong>Account Number:</strong>{" "}
                {selectedMasjid.bank_details.account_number}
              </p>
              <p>
                <strong>Account Name:</strong>{" "}
                {selectedMasjid.bank_details.account_name}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-4">
              {!selectedMasjid.is_verified && (
                <button
                  onClick={async () => {
                    try {
                      await verifyMasjidByAdmin(
                        selectedMasjid._id,
                        token
                      );
                      toast.success("Masjid verified successfully");
                      loadMasjids();
                      setIsModalOpen(false);
                    } catch (error) {
                      toast.error("Failed to verify Masjid");
                    }
                  }}
                  className="bg-emerald-600 text-white font-medium text-lg px-6 py-3 rounded-lg hover:bg-emerald-700 transition-transform transform hover:scale-105 shadow-md"
                >
                  Verify Masjid
                </button>
              )}
              <button
                onClick={async () => {
                  try {
                    await blockMasjidByAdmin(selectedMasjid._id, token);
                    toast.success("Masjid blocked successfully");
                    loadMasjids();
                    setIsModalOpen(false);
                  } catch (error) {
                    toast.error("Failed to block Masjid");
                  }
                }}
                className="bg-red-600 text-white font-medium text-lg px-6 py-3 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-md"
              >
                Block Masjid
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

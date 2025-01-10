import React, { useState, useEffect } from 'react';
import { Table } from '../../components/common/Table';
import { fetchMasjids, verifyMasjid } from '../../services/api';
import type { Organization } from '../../types/donation';
import Modal from '../../components/common/Modal';

export const Masjids: React.FC = () => {
  const [masjids, setMasjids] = useState<Organization[]>([]);
  const [filteredMasjids, setFilteredMasjids] = useState<Organization[]>([]);
  const [selectedMasjid, setSelectedMasjid] = useState<Organization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

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
      console.error('Error loading masjids:', error);
    }
  };

  const handleVerify = async (masjid: Organization) => {
    try {
      await verifyMasjid(masjid.id);
      loadMasjids();
    } catch (error) {
      console.error('Error verifying masjid:', error);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Organization },
    { header: 'Address', accessor: 'address' as keyof Organization },
    { header: 'Phone', accessor: 'phone_number' as keyof Organization },
    {
      header: 'Balance',
      accessor: 'masjid_balance' as keyof Organization,
      render: (value: number) => `₦${value.toFixed(2)}`,
    },
    {
      header: 'Status',
      accessor: 'is_verified' as keyof Organization,
      render: (value: boolean) => (
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
          {value ? 'Verified' : 'Unverified'}
        </div>
      ),
    },
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
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedMasjid.name}</h2>
            <div className="space-y-2">
              <p><strong>Address:</strong> {selectedMasjid.address}</p>
              <p><strong>Phone:</strong> {selectedMasjid.phone_number}</p>
              <p><strong>Balance:</strong> ₦{selectedMasjid.masjid_balance.toFixed(2)}</p>
              <p><strong>Status:</strong> {selectedMasjid.is_verified ? 'Verified' : 'Unverified'}</p>
              {!selectedMasjid.is_verified && (
                <button
                  onClick={() => handleVerify(selectedMasjid)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Verify Masjid
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

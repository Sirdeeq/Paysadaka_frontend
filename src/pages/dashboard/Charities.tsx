import React, { useState, useEffect } from 'react';
import { Table } from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { fetchCharities, verifyCharity } from '../../services/api';
import { toast } from 'react-hot-toast';
import type { Organization } from '../../types/donation';

export const Charities: React.FC = () => {
  const [charities, setCharities] = useState<Organization[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<Organization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    loadCharities();
  }, []);

  const loadCharities = async () => {
    try {
      const data = await fetchCharities();
      setCharities(data);
    } catch (error) {
      console.error('Error loading charities:', error);
    }
  };

  const handleVerify = async (charity: Organization) => {
    try {
      await verifyCharity(charity.id);
      toast.success('Charity verified successfully');
      loadCharities(); // Reload the list to show updated status
    } catch (error) {
      console.error('Error verifying charity:', error);
      toast.error('Failed to verify charity');
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
    { header: 'Name', accessor: 'name' as keyof Organization },
    { header: 'Address', accessor: 'address' as keyof Organization },
    { header: 'Phone', accessor: 'phone_number' as keyof Organization },
    {
      header: 'Logo',
      accessor: 'image' as keyof Organization,
      render: (value: string) => (
        <img src={value} alt="Charity Logo" className="w-16 h-16 object-cover rounded-full" />
      ),
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
    {
      header: 'Current Balance',
      accessor: 'charity_balance' as keyof Organization,
      render: (value: number) => `₦${value.toFixed(2)}`,
    },
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
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={selectedCharity.image} 
                alt={selectedCharity.name} 
                className="w-24 h-24 rounded-full object-cover"
              />
              <h2 className="text-2xl font-bold">{selectedCharity.name}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Organization Details</h3>
                <div className="space-y-2">
                  <p><strong>Address:</strong> {selectedCharity.address}</p>
                  <p><strong>Phone:</strong> {selectedCharity.phone_number}</p>
                  <p><strong>Status:</strong> {selectedCharity.is_verified ? 'Verified' : 'Unverified'}</p>
                  <p><strong>Current Balance:</strong> ₦{selectedCharity.charity_balance.toFixed(2)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Bank Details</h3>
                <div className="space-y-2">
                  <p><strong>Bank Name:</strong> {selectedCharity.bank_details.bank_name}</p>
                  <p><strong>Account Name:</strong> {selectedCharity.bank_details.account_name}</p>
                  <p><strong>Account Number:</strong> {selectedCharity.bank_details.account_number}</p>
                </div>
              </div>
              {!selectedCharity.is_verified && (
                <div className="mt-6">
                  <button
                    onClick={() => handleVerify(selectedCharity)}
                    className="w-full bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
                  >
                    Verify Charity
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

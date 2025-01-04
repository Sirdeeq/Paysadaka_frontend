import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Form } from '../common/Form';
import { createMasjid, type MasjidData } from '../../services/organizations';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Bank {
  name: string;
  code: string;
}

export const MasjidForm: React.FC = () => {
  const navigate = useNavigate();
  const [isBankDetailsOpen, setIsBankDetailsOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBankCode, setSelectedBankCode] = useState<string | null>(null);

  const fields = [
    { name: 'name', label: 'Masjid Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone_number', label: 'Phone Number', type: 'tel', required: true },
    { name: 'address', label: 'Address', type: 'text', required: true },
  ];

  useEffect(() => {
    // Fetch banks from Paystack
    const fetchBanks = async () => {
      try {
        const response = await axios.get('https://api.paystack.co/bank', {
          headers: { Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_KEY}` },
        });
        setBanks(response.data.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
        toast.error('Failed to load bank list');
      }
    };

    fetchBanks();
  }, []);

  const handleSubmit = async (formData: Record<string, string | number>) => {
    try {
      if (!selectedBankCode) {
        toast.error('Please select a bank');
        return;
      }

      const masjidData: MasjidData = {
        name: String(formData.name),
        email: String(formData.email),
        phone_number: String(formData.phone_number),
        address: String(formData.address),
        bank_details: {
          bank_name: banks.find(bank => bank.code === selectedBankCode)?.name || '',
          account_number: String(formData.account_number),
          account_name: String(formData.account_name),
          bank_code: selectedBankCode,
        },
      };

      await createMasjid(masjidData);
      toast.success('Masjid created successfully');
      navigate('/');
    } catch (error: unknown) {
      console.error('Error creating masjid:', error);
      toast.error('Failed to create masjid');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Register New Masjid</h2>
      <Form
        fields={[
          ...fields,
          {
            type: 'custom',
            render: () => (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setIsBankDetailsOpen(!isBankDetailsOpen)}
                  className="flex items-center justify-between w-full p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <span className="font-medium">Bank Details</span>
                  {isBankDetailsOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
                {isBankDetailsOpen && (
                  <div className="p-4 border rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name
                      </label>
                      <select
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        onChange={(e) => setSelectedBankCode(e.target.value)}
                        value={selectedBankCode || ''}
                      >
                        <option value="" disabled>
                          Select a Bank
                        </option>
                        {banks.map((bank) => (
                          <option key={bank.code} value={bank.code}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="account_number"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Name
                      </label>
                      <input
                        type="text"
                        name="account_name"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            ),
          },
        ]}
        onSubmit={handleSubmit}
        submitLabel="Create Masjid"
      />
    </div>
  );
};

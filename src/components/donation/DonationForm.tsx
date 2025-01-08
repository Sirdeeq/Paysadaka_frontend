import React, { useState } from 'react';
import { Form } from '../common/Form';
import type { Organization } from '../../types/donation';
import { cn } from '../../utils';

interface FormFieldBase {
  name: string;
  label: string;
  required: boolean;
}

interface SelectFormField extends FormFieldBase {
  type: 'select';
  options: { value: string; label: string; }[];
}

interface HiddenFormField extends FormFieldBase {
  type: 'hidden';
  value: string;
}

interface StandardFormField extends FormFieldBase {
  type: 'text' | 'number' | 'email';
  value?: string | number;
  disabled?: boolean;
  hidden?: boolean;
}

type FormField = SelectFormField | HiddenFormField | StandardFormField;

interface DonationFormData {
  donor_name: string;
  email: string;
  amount: number;
  category: string;
  recipient_account_number: string;
  organization_name?: string;
  bank_code?: string;
  account_name?: string;
}

interface DonationFormProps {
  organization: Organization;
  onSubmit: (data: DonationFormData) => void;
}

const PRESET_AMOUNTS = [
  { label: '₦1,000', value: 1000 },
  { label: '₦5,000', value: 5000 },
  { label: '₦10,000', value: 10000 },
  { label: '₦20,000', value: 20000 },
  { label: '₦50,000', value: 50000 },
  { label: '₦100,000', value: 100000 },
];

export const DonationForm: React.FC<DonationFormProps> = ({
  organization,
  onSubmit,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isDonatingAsOrg, setIsDonatingAsOrg] = useState(false);
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const fields: FormField[] = [
    ...(isDonatingAsOrg ? [
      { 
        name: 'organization_name', 
        label: 'Organization Name', 
        type: 'text' as const,
        required: true
      }
    ] : [
      { 
        name: 'donor_name', 
        label: 'Your Name', 
        type: 'text' as const,
        required: true,
        value: isAnonymous ? 'Anonymous' : '',
        disabled: isAnonymous 
      }
    ]),
    { name: 'email', label: 'Email', type: 'email', required: true, value: isAnonymous ? 'anonymous@donation.com' : '', disabled: isAnonymous },
    { 
      name: 'amount', 
      label: 'Amount',
      type: 'number', 
      required: true,
      value: selectedAmount || customAmount,
      hidden: true
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'masjid_donation', label: 'Masjid Donation' },
        { value: 'ramadan', label: 'Ramadan' },
        { value: 'eid', label: 'Eid' },
      ],
    },
    { 
      name: 'recipient_account_number',
      label: 'Account Number',
      type: 'text',
      value: organization.bank_details.account_number,
      required: true,
      disabled: true
    }

  ];

  const handleSubmit = (formData: Record<string, string | number>) => {
    const submissionData: DonationFormData = {
      donor_name: isDonatingAsOrg ? String(formData.organization_name) : (isAnonymous ? 'Anonymous' : String(formData.donor_name)),
      email: isAnonymous ? 'anonymous@donation.com' : String(formData.email),
      amount: selectedAmount || Number(customAmount),
      category: String(formData.category),
      recipient_account_number: organization.bank_details.account_number,
      account_name: organization.bank_details.account_name,
      organization_name: isDonatingAsOrg ? String(formData.organization_name) : undefined
    };
    
    onSubmit(submissionData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-emerald-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold">Selected Organization:</h3>
        <p>{organization.name}</p>
        <p className="text-gray-600">{organization.address}</p>
      </div>

      {/* Amount Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Amount
        </label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {PRESET_AMOUNTS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setSelectedAmount(value);
                setCustomAmount('');
                setIsCustomAmount(false);
              }}
              className={cn(
                "py-3 px-4 border rounded-lg text-center transition-colors",
                selectedAmount === value && !isCustomAmount
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 hover:border-emerald-500"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={isCustomAmount}
              onChange={(e) => {
                setIsCustomAmount(e.target.checked);
                if (!e.target.checked) {
                  setCustomAmount('');
                }
                setSelectedAmount(null);
              }}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-medium text-gray-700">Enter custom amount</span>
          </label>

          {isCustomAmount && (
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Enter amount in Naira"
            />
          )}
        </div>
      </div>

      {/* Donation Options */}
      <div className="space-y-4 mb-8">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm text-gray-700">Donate Anonymously</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isDonatingAsOrg}
            onChange={(e) => setIsDonatingAsOrg(e.target.checked)}
            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm text-gray-700">Donate as an Organization</span>
        </label>
      </div>

      <Form
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Proceed to Payment"
      />
    </div>
  );
};

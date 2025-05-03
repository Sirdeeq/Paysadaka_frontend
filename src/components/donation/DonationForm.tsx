"use client";

import type React from "react";
import { useState } from "react";
import { Form } from "../common/Form";
import type { Organization } from "../../types/donation";
import { cn } from "../../utils";
import {
  Building2,
  Heart,
  CreditCard,
  User,
  Mail,
  ChevronRight,
} from "lucide-react";

interface FormFieldBase {
  name: string;
  label: string;
  required: boolean;
}

interface SelectFormField extends FormFieldBase {
  type: "select";
  options: { value: string; label: string }[];
}

interface HiddenFormField extends FormFieldBase {
  type: "hidden";
  value: string;
}

interface StandardFormField extends FormFieldBase {
  type: "text" | "number" | "email";
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
  { label: "₦1,000", value: 1000 },
  { label: "₦5,000", value: 5000 },
  { label: "₦10,000", value: 10000 },
  { label: "₦20,000", value: 20000 },
  { label: "₦50,000", value: 50000 },
  { label: "₦100,000", value: 100000 },
];

export const DonationForm: React.FC<DonationFormProps> = ({
  organization,
  onSubmit,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isDonatingAsOrg, setIsDonatingAsOrg] = useState(false);
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const fields: FormField[] = [
    ...(isDonatingAsOrg
      ? [
          {
            name: "organization_name",
            label: "Organization Name",
            type: "text" as const,
            required: true,
          },
        ]
      : [
          {
            name: "donor_name",
            label: "Your Name",
            type: "text" as const,
            required: true,
            value: isAnonymous ? "Anonymous" : "",
            disabled: isAnonymous,
          },
        ]),
    // { name: 'email', label: 'Email', type: 'email', required: true, value: isAnonymous ? 'anonymous@donation.com' : '', disabled: isAnonymous },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      required: true,
      value: selectedAmount || customAmount,
      hidden: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: [
        { value: "masjid_donation", label: "Masjid Donation" },
        { value: "ramadan", label: "Ramadan" },
        { value: "eid", label: "Eid" },
      ],
    },
    {
      name: "recipient_account_number",
      label: "Account Number",
      type: "password",
      value: organization.bank_details.account_number,
      required: true,
      disabled: true,
    },
  ];

  const handleSubmit = (formData: Record<string, string | number>) => {
    const submissionData: DonationFormData = {
      donor_name: isDonatingAsOrg
        ? String(formData.organization_name)
        : isAnonymous
        ? "Anonymous"
        : String(formData.donor_name),
      email: "paysadaqa@gmail.com",
      amount: selectedAmount || Number(customAmount),
      category: String(formData.category),
      recipient_account_number: organization.bank_details.account_number,
      account_name: organization.bank_details.account_number,
      organization_name: organization.name,
    };

    onSubmit(submissionData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Organization Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-emerald-100">
        <div className="bg-emerald-600 p-4 text-white">
          <h3 className="font-bold text-lg">Selected Organization</h3>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              {organization.type === "masjid" ? (
                <Building2 className="h-6 w-6 text-emerald-600" />
              ) : (
                <Heart className="h-6 w-6 text-emerald-600" />
              )}
            </div>
            <div>
              <h4 className="font-bold text-emerald-700">
                {organization.name}
              </h4>
              <p className="text-sm text-gray-600">{organization.address}</p>
            </div>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 mb-1">Account Number</p>
              <p className="font-medium">
                {organization.bank_details.account_number}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 mb-1">Account Name</p>
              <p className="font-medium">
                {organization.bank_details.account_name}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 mb-1">Bank</p>
              <p className="font-medium">
                {organization.bank_details.bank_name}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 mb-1">Contact</p>
              <p className="font-medium">
                {organization.phone_number || "Not provided"}
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Amount Selection */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-emerald-100">
        <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Select Amount
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {PRESET_AMOUNTS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setSelectedAmount(value);
                setCustomAmount("");
                setIsCustomAmount(false);
              }}
              className={cn(
                "py-3 px-4 border rounded-lg text-center transition-colors",
                selectedAmount === value && !isCustomAmount
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-medium"
                  : "border-gray-200 hover:border-emerald-300"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              checked={isCustomAmount}
              onChange={(e) => {
                setIsCustomAmount(e.target.checked);
                if (!e.target.checked) {
                  setCustomAmount("");
                }
                setSelectedAmount(null);
              }}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Enter custom amount
            </span>
          </label>

          {isCustomAmount && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                ₦
              </span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="pl-8 pr-4 py-3 w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="Enter amount in Naira"
              />
            </div>
          )}
        </div>
      </div>

      {/* Donation Options */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-emerald-100">
        <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center">
          <User className="mr-2 h-5 w-5" />
          Donation Options
        </h3>
        <div className="space-y-4">
          <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <div className="ml-3">
              <span className="text-gray-700 font-medium">
                Donate Anonymously
              </span>
              <p className="text-sm text-gray-500">
                Your name will not be displayed in donation records
              </p>
            </div>
          </label>

          <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={isDonatingAsOrg}
              onChange={(e) => setIsDonatingAsOrg(e.target.checked)}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <div className="ml-3">
              <span className="text-gray-700 font-medium">
                Donate as an Organization
              </span>
              <p className="text-sm text-gray-500">
                Make this donation on behalf of your organization
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-emerald-100">
        <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Donation Details
        </h3>
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          submitLabel={
            <>
              Proceed to Payment
              <ChevronRight className="ml-2 h-5 w-5" />
            </>
          }
          submitClassName="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg w-full flex items-center justify-center"
        />
      </div>

      {/* Islamic Quote */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600 italic">
          "Charity does not decrease wealth, and the servant who forgives, Allah
          adds to his honor."
        </p>
        <p className="text-xs text-emerald-600 mt-1">- Sahih Muslim</p>
      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Form } from '../common/Form';
import { createCharity } from '../../services/organizations';
import { uploadFile } from '../../services/api';
import { ChevronDown, ChevronUp, Upload } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CharityData {
  name: string;
  email: string;
  logo: string;
  address: string;
  phone_number: string;
  website: string;
  areaOfFocus: string;
  bank_details: {
    bankName: string;
    account_number: string;
    account_name: string;
  };
}

interface CloudinaryResponse {
  public_id: string;
  url: string;
}

export const CharityForm: React.FC = () => {
  const navigate = useNavigate(); 
  const [isBankDetailsOpen, setIsBankDetailsOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fields = [
    { name: 'name', label: 'Organization Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone_number', label: 'Phone Number', type: 'tel', required: true },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'website', label: 'Website', type: 'url', required: true },
    { name: 'areaOfFocus', label: 'Area of Focus', type: 'text', required: true },
  ];

  const bankFields = [
    { name: 'bank_name', label: 'Bank Name', type: 'text', required: true },
    { name: 'account_number', label: 'Account Number', type: 'text', required: true },
    { name: 'account_name', label: 'Account Name', type: 'text', required: true },
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Logo file size must be less than 10MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (formData: Record<string, string | number>) => {
    try {
      if (!logoPreview) {
        toast.error('Please upload a logo');
        return;
      }

      // Create FormData object with flat structure
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', String(formData.name));
      formDataToSubmit.append('email', String(formData.email));
      formDataToSubmit.append('phone_number', String(formData.phone_number));
      formDataToSubmit.append('address', String(formData.address));
      formDataToSubmit.append('website', String(formData.website));
      formDataToSubmit.append('areaOfFocus', String(formData.areaOfFocus));
      formDataToSubmit.append('bankName', String(formData.bank_name));
      formDataToSubmit.append('account_number', String(formData.account_number));
      formDataToSubmit.append('account_name', String(formData.account_name));

      // Handle logo file
      const logoFile = fileInputRef.current?.files?.[0];
      if (logoFile) {
        formDataToSubmit.append('logo', logoFile);
      }

      // First upload the logo
      const logoFormData = new FormData();
      if (logoFile) {
        logoFormData.append('file', logoFile);
        const logoData: CloudinaryResponse = await uploadFile(logoFormData);
        formDataToSubmit.set('logo', logoData.url);
      }

      await createCharity(formDataToSubmit);
      toast.success('Charity organization created successfully');
      navigate('/');
    } catch (error: unknown) {
      console.error('Error creating charity:', error);
      toast.error('Failed to create charity organization');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Register New Charity Organization</h2>

      {/* Logo Upload Section */}
      <div className="mb-6 flex flex-col items-center">
        <div 
          className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 flex items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {logoPreview ? (
            <img 
              src={logoPreview} 
              alt="Logo Preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-emerald-600 hover:text-emerald-700"
        >
          {logoPreview ? 'Change Logo' : 'Upload Logo'}
        </button>
      </div>

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
                    {bankFields.map(field => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }
        ]}
        onSubmit={handleSubmit}
        submitLabel="Create Organization"
      />
    </div>
  );
};
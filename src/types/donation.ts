export interface DonationFormData {
  donor_name: string;
  email: string;
  amount: number;
  category: string;
  recipient_account_number: string;
  organization_name?: string;
}

export interface DonationSubmissionData extends DonationFormData {
  donation_type: 'masjid' | 'charity';
  net_amount: number;
  paystack_reference: string;
}

export interface Organization {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  is_verified: boolean;
  verificationToken: string;
  image: string;
  bank_details: {
    account_number: string;
    account_name: string;
    bank_name: string;
  };
}

export interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  message: string;
}
import axios from 'axios';
import type { Organization, DonationFormData } from '../types/donation';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchMasjids = async (): Promise<Organization[]> => {
  const response = await axios.get(`${API_BASE_URL}/masjids/all_masjids`);
  return response.data;
};

export const fetchCharities = async (): Promise<Organization[]> => {
  const response = await axios.get(`${API_BASE_URL}/charities/all_organisation`);
  return response.data;
};

export const submitDonation = async (donationData: DonationFormData) => {
  const response = await axios.post(`${API_BASE_URL}/donations/donate`, donationData);
  return response.data;
};

export const verifyMasjid = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/masjids/verify/${token}`);
  return response.data;
};
export const verifyCharity = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/charities/verify/${token}`);
  return response.data;
};


export const fetchMasjidById = async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/masjids/get_one_masjid/${id}`);
    return response.data;
};

export const fetchCharityById = async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/charities/get_one_charity/${id}`);
    return response.data;
};  


export const uploadFile = async (file: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/upload/single`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};



// export const fetchBankDetails = async (): Promise<any[]> => {
//   const response = await axios.get(`${API_BASE_URL}/banks/all_banks`);
//   return response.data;
// };

// export const fetchBankById = async (bankId: string): Promise<any> => {
//   const response = await axios.get(`${API_BASE_URL}/banks/get_one_bank/${bankId}`);
//   return response.data;
// };

// export const fetchBankDetails = async (): Promise<any[]> => {
//   const response = await axios.get(`${API_BASE_URL}/banks/all_banks`);
//   return response.data;
// };

export const verifyBank = async (bankDetails: { accountNumber: string; bankName: string; accountName: string }): Promise<any> => {
  const response = await axios.post(`${API_BASE_URL}/banks/verify`, bankDetails);
  return response.data;
};

export const fetchDonations = async (): Promise<DonationFormData[]> => {
  const response = await axios.get(`${API_BASE_URL}/donations/all-donations`);
  return response.data;
};

export const fetchDonationById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/donations/one-donation/${id}`);
  return response.data;
};

export const verifyDonation = async (reference: string) => {
  const response = await axios.get(`${API_BASE_URL}/donations/verify/${reference}`);
  return response.data;
};

export const approveDonation = async (id: string, password: string, token: string) => {
  const response = await axios.put(
    `${API_BASE_URL}/admin/approve-donation/${id}`,
    { password: password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const adminBalance = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/admin/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const adminDonations = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/admin/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const adminLogin = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/admin/login`, { email: email, password: password });
  return response.data;
};

export const adminSignup = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/admin/create`, { name: name, email: email, password: password });
  return response.data;
};

// export const verifyDonation = async (reference: string) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/donations/verify/${reference}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error verifying donation:', error.response?.data || error.message);
//     throw error;
//   }
// };

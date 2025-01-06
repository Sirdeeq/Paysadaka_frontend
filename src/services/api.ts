import axios from 'axios';
import type { Organization, DonationFormData } from '../types/donation';
import { CharityData, MasjidData } from './organizations';

const API_BASE_URL = 'http://localhost:5000/api';

/** Fetch all Masjids */
export const fetchMasjids = async (): Promise<Organization[]> => {
  const response = await axios.get(`${API_BASE_URL}/masjids/all_masjids`);
  return response.data;
};

/** Fetch all Charities */
export const fetchCharities = async (): Promise<Organization[]> => {
  const response = await axios.get(`${API_BASE_URL}/charities/all_organisation`);
  return response.data;
};

/** Submit Donation */
export const submitDonation = async (donationData: DonationFormData): Promise<unknown> => {
  const response = await axios.post(`${API_BASE_URL}/donations/donate`, donationData);
  return response.data;
};

<<<<<<< HEAD
/** Verify Masjid */
export const verifyMasjid = async (token: string): Promise<unknown> => {
=======
export const createMasjid = async (masjidData: MasjidData) => {
  const response = await axios.post(`${API_BASE_URL}/masjids/register`, masjidData);
  return response.data;
};

export const createCharity = async (charityData: CharityData) => {
  const response = await axios.post(`${API_BASE_URL}/charities/create`, charityData);
  return response.data;
};

export const verifyMasjid = async (token: string) => {
>>>>>>> dc4fa9b5f1f4dc03ab5e8a1d2f63071824ae654c
  const response = await axios.get(`${API_BASE_URL}/masjids/verify/${token}`);
  return response.data;
};

/** Verify Charity */
export const verifyCharity = async (token: string): Promise<unknown> => {
  const response = await axios.get(`${API_BASE_URL}/charities/verify/${token}`);
  return response.data;
};

/** Fetch Masjid by ID */
export const fetchMasjidById = async (id: string): Promise<Organization> => {
  const response = await axios.get(`${API_BASE_URL}/masjids/get_one_masjid/${id}`);
  return response.data;
};

/** Fetch Charity by ID */
export const fetchCharityById = async (id: string): Promise<Organization> => {
  const response = await axios.get(`${API_BASE_URL}/charities/get_one_charity/${id}`);
  return response.data;
};

/** Upload File */
export const uploadFile = async (file: FormData): Promise<unknown> => {
  const response = await axios.post(`${API_BASE_URL}/upload/single`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/** Verify Bank Details */
export const verifyBank = async (bankDetails: { accountNumber: string; bankName: string; accountName: string }): Promise<unknown> => {
  const response = await axios.post(`${API_BASE_URL}/banks/verify`, bankDetails);
  return response.data;
};

/** Fetch All Donations */
export const fetchDonations = async (): Promise<DonationFormData[]> => {
  const response = await axios.get(`${API_BASE_URL}/donations/all-donations`);
  return response.data;
};

/** Fetch Donation by ID */
export const fetchDonationById = async (id: string): Promise<DonationFormData> => {
  const response = await axios.get(`${API_BASE_URL}/donations/one-donation/${id}`);
  return response.data;
};

/** Verify Donation */
export const verifyDonation = async (reference: string): Promise<unknown> => {
  const response = await axios.get(`${API_BASE_URL}/donations/verify/${reference}`);
  return response.data;
};

/** Approve Donation */
export const approveDonation = async (id: string, password: string, token: string): Promise<unknown> => {
  const response = await axios.put(
    `${API_BASE_URL}/admin/approve-donation/${id}`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/** Fetch Admin Balance */
export const adminBalance = async (token: string): Promise<unknown> => {
  const response = await axios.get(`${API_BASE_URL}/admin/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/** Fetch Admin Donations */
export const adminDonations = async (token: string): Promise<unknown> => {
  const response = await axios.get(`${API_BASE_URL}/admin/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/** Admin Login */
export const adminLogin = async (email: string, password: string): Promise<unknown> => {
  const response = await axios.post(`${API_BASE_URL}/admin/login`, { email, password });
  return response.data;
};

/** Admin Signup */
export const adminSignup = async (name: string, email: string, password: string): Promise<unknown> => {
  const response = await axios.post(`${API_BASE_URL}/admin/create`, { name, email, password });
  return response.data;
};

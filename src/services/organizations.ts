import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://paysadaka-backend.onrender.com/api';


export interface MasjidData {
  name: string;
  logo: string;
  email: string;
  phone_number: string;
  address: string;
  bank_details: BankDetails;
}

interface BankDetails {
  bank_name: string;
  account_number: string;
  account_name: string;
}

export interface CharityData {
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

export const createMasjid = async (data: MasjidData) => {
  const response = await axios.post(`${API_BASE_URL}/masjids/register`, data);
  return response.data;
};

export const createCharity = async (data: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/charities/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
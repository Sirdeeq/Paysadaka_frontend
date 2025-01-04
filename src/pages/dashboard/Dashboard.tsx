import React, { useState, useEffect } from 'react';
import { Building2, DollarSign, Heart, Eye, EyeOff } from 'lucide-react';
import { MasjidForm } from '../../components/dashboard/MasjidForm';
import { CharityForm } from '../../components/dashboard/CharityForm';
import { adminBalance } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Card } from './component/Card';
import { Button } from '../../components/common/Button';

const Dashboard: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'masjid' | 'charity' | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceVisible, setBalanceVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      adminBalance(token).then((balanceData) => {
        setBalance(balanceData.admin_balance);
      }).catch((error) => {
        console.error('Error fetching balance:', error);
      });
    }
  }, []);

  // Fetch balance from the API and update state when Balance Card is clicked
  const handleBalanceClick = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const balanceData = await adminBalance(token);
        setBalance(balanceData.admin_balance);
        toast.success(`Current balance: ₦${balanceData.admin_balance.toFixed(2)}`, {
          position: 'top-center',
        });
      } catch (error) {
        console.error('Error fetching balance:', error);
        toast.error('Failed to fetch balance.');
      }
    }
  };

  // Toggle visibility of balance
  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="flex gap-4 mb-8">
        <Card
          label="New Masjid"
          icon={<Building2 />}
          onClick={() => setActiveForm('masjid')}
          className="w-40 h-40 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        />
        <Card
          label="New Charity"
          icon={<Heart />}
          onClick={() => setActiveForm('charity')}
          className="w-40 h-40 bg-gradient-to-r from-green-500 to-green-600 text-white"
        />
      </div>

      {activeForm === 'masjid' && <MasjidForm />}
      {activeForm === 'charity' && <CharityForm />}

      <div className="flex gap-4 mb-8">
        {/* Balance Card */}
        <Card
          label="Balance"
          value={balanceVisible && balance !== null ? `₦${balance?.toFixed(2)}` : '****'}
          icon={balanceVisible ? <EyeOff /> : <Eye />}
          onClick={toggleBalanceVisibility}
          className="w-40 h-40 bg-gradient-to-r from-purple-500 to-purple-600 text-white"
        >
          <Button
            label="Show Balance"
            onClick={handleBalanceClick}
            className="w-full mt-2 text-white"
          />
        </Card>

        {/* Total Donation Card */}
        <Card
          label="Total Donations"
          icon={<DollarSign />}
          onClick={() => navigate('/dashboard/donations')}
          className="w-40 h-40 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
        />

        {/* Approved Donations Card */}
        <Card
          label="Approved Donations"
          icon={<DollarSign />}
          onClick={() => navigate('/dashboard/approved-donations')}
          className="w-40 h-40 bg-gradient-to-r from-red-500 to-red-600 text-white"
        />
      </div>
    </div>
  );
};

// Ensure to export the component correctly
export default Dashboard;

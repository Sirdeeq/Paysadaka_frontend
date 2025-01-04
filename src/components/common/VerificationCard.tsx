import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCharityById, fetchMasjidById, verifyMasjid } from '../../services/api';
import toast from 'react-hot-toast';

const VerificationCard = ({ type }: { type: 'masjid' | 'charity' }    ) => {
  const navigate = useNavigate();
  const { id, token } = useParams(); // Extract masjid ID and token from the URL
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
      const getDetails = async () => {
      try {
        console.log('Fetching masjid details for ID:', id);
        if (type === 'masjid') {
            const data = await fetchMasjidById(id);
            setName(data.name);
        } else {
            const data = await fetchCharityById(id);
            setName(data.name);
        }

        console.log(type, name);
        


        if (name) {
          if (type === 'masjid') {
              setName(name);
          } else {
            setName(name);
          }
        } else {
          if (type === 'masjid') {
            throw new Error('Masjid not found');
          } else {
            throw new Error('Charity not found');
          }
        }
      } catch (err) {
        console.error(err);
        if (type === 'masjid') {
          setError('Error fetching masjid details');
          toast.error('Error fetching masjid details');
        } else {
          setError('Error fetching charity details');
          toast.error('Error fetching charity details');
        }
      }
    };

    getDetails(); // Call the async function
  }, [id]);

  const handleVerification = async () => {
    if (!token) {
      setError('No token provided');
      toast.error('No token provided');
      return;
    }

    try {
      const data = await verifyMasjid(token);
      console.log(data);
      console.log(token);

      if (data.message === 'Masjid verified successfully' && type === 'masjid' && id && token) {
        toast.success('Masjid verified successfully');
        navigate('/'); // Navigate to the home page
      } else if (data.message === 'Charity verified successfully' && type === 'charity' && id && token) {
        toast.success('Charity verified successfully');
        navigate('/'); // Navigate to the home page
      } else {
        setError('Error verifying ' + type);
        toast.error('Error verifying ' + type);
      }
    } catch (err) {
      console.error(err);
      setError('Error verifying ' + type);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Welcome to Pay Sadaka</h1>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Verification for {name}
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <p className="text-gray-600 text-center mb-6">
            Alhamdulillah! Your masjid is almost ready to receive donations. Please click the button below to complete your verification.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleVerification}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
            >
              Complete Verification
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            JazakAllahu Khairan for your patience and support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;

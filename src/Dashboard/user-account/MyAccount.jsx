import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userImg from '../../assets/images/doctor-img01.png';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../../config';

const MyAccount = () => {
  const { user, token, dispatch } = useContext(authContext);
  const navigate = useNavigate();
  
  // Blood type options
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  // Initialize state with user data
  const [userData, setUserData] = useState({
    
    name: user?.name || 'abbbb',
    email: user?.email || 'abb@gmail.com',
    bloodType: user?.bloodType || 'AB+'
  });
  
  const [loading, setLoading] = useState(false);

  // Handle blood type change
  const handleBloodTypeChange = (e) => {
    const newBloodType = e.target.value;
    setUserData(prev => ({
      ...prev,
      bloodType: newBloodType
    }));
    
    // Update blood type in backend
    updateBloodType(newBloodType);
  };

  // Update blood type in backend
  const updateBloodType = async (bloodType) => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bloodType })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update blood type');
      }
      
      toast.success('Blood type updated successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to update blood type');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    
    // Update context
    dispatch({ type: 'LOGOUT' });
    
    // Redirect to login page
    navigate('/login');
    
    // Force reload to ensure all states are reset
    window.location.reload();
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/users/${user._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to delete account');
        }
        
        // Logout after successful deletion
        handleLogout();
        toast.success('Account deleted successfully');
      } catch (err) {
        toast.error(err.message || 'Failed to delete account');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='max-w-[1170px] px-5 mx-auto'> 
      <div className='grid md:grid-cols-3 gap-10'>
        <div className='pb-[50px] px-[30px] rounded-md'>
          <div className='flex flex-col items-center justify-center'>
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img src={userImg} alt='user' className='w-full h-full rounded-full' />
            </figure>

            <div className='text-center mt-4'>
              <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{userData.name}</h3>
              <p className='text-[15px] leading-6 text-textColor font-medium mt-2'>{userData.email}</p>
              
              <div className='mt-4'>
                <label className='text-[15px] leading-6 text-textColor font-medium'>
                  Blood Type: 
                </label>
                <select 
                  value={userData.bloodType}
                  onChange={handleBloodTypeChange}
                  disabled={loading}
                  className='ml-2 text-headingColor text-[19px] leading-8 bg-transparent border-b-2 border-primaryColor focus:outline-none'
                >
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {loading && (
                <p className='text-primaryColor text-sm mt-2'>Updating...</p>
              )}
            </div>
            
            <div className='mt-8 flex flex-col gap-4 w-full max-w-xs'>
              <button
                onClick={handleLogout}
                className='w-full bg-primaryColor text-white py-2 px-4 rounded-md hover:bg-[#0066ffdd] transition-colors'
              >
                Logout
              </button>
              
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className='w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50'
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default MyAccount;
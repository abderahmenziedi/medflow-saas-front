import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import MyBookings from './MyBookings';
import Profile from './Profile';
import useGetProfile from '../../hooks/useFetchData';

const MyAccount = () => {
  const { user, token, dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState('bookings');
  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`);
  console.log(userData,'userdata');
  

  
  // Blood type options
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  // Initialize state with user data
  const [localUserData, setLocalUserData] = useState({
    
    name: user?.name || 'abbbb',
    email: user?.email || 'abb@gmail.com',
    bloodType: user?.bloodType || 'AB+'
  });
  
  const [loadingState, setLoadingState] = useState(false);

  // Handle blood type change
  const handleBloodTypeChange = (e) => {
    const newBloodType = e.target.value;
    setLocalUserData(prev => ({
      ...prev,
      bloodType: newBloodType
    }));
    
    // Update blood type in backend
    updateBloodType(newBloodType);
  };

  // Update blood type in backend
  const updateBloodType = async (bloodType) => {
    try {
      setLoadingState(true);
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
      setLoadingState(false);
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
        setLoadingState(true);
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
        setLoadingState(false);
      }
    }
  };

  return (
    <div className='max-w-[1170px] px-5 mx-auto'> 
      <div className='grid md:grid-cols-3 gap-10'>
        <div className='pb-[50px] px-[30px] rounded-md'>
          <div className='flex flex-col items-center justify-center'>
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img src={user?.photo } alt='user' className='w-full h-full rounded-full' />
            </figure>

            <div className='text-center mt-4'>
              <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{localUserData.name}</h3>
              <p className='text-[15px] leading-6 text-textColor font-medium mt-2'>{localUserData.email}</p>
              
              <div className='mt-4'>
                <label className='text-[15px] leading-6 text-textColor font-medium'>
                  Blood Type: 
                </label>
                <select 
                  value={localUserData.bloodType}
                  onChange={handleBloodTypeChange}
                  disabled={loadingState}
                  className='ml-2 text-headingColor text-[19px] leading-8 bg-transparent border-b-2 border-primaryColor focus:outline-none'
                >
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {loadingState && (
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
                disabled={loadingState}
                className='w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50'
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className='md:col-span-2 md:px-[30px]'>
          <div>
            <button onClick={() => setTab('bookings')}
                className={`${tab ==='bookings' && 'bg-primaryColor text-white font-normal' }p-2 mr-5 px-5 text-headingColor  rounded-md  font-semibold text-[16px] leading-6
            border border-solid border-primaryColor`}>My Bookings</button>
               <button onClick={() => setTab('settings')}
                className={`${tab ==='settings' && 'bg-primaryColor text-white font-normal' }py-2 mr-5 px-5 text-headingColor  rounded-md  font-semibold text-[16px] leading-6
            border border-solid border-primaryColor`	}>Profile Settings</button>
          </div>
          <div className='mt-8'>
            {tab === 'bookings' && <MyBookings />}
            {tab === 'settings' && <Profile />}
          </div>
        </div>

      </div> 
    </div>
  );
};

export default MyAccount;
import React, { useContext, useState, useEffect } from 'react';
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
  
  // Initialize state with user data
  const [localUserData, setLocalUserData] = useState({
    name: '',
    email: '',
    bloodType: ''
  });

  // Update local user data when userData is fetched
  useEffect(() => {
    if (userData) {
      setLocalUserData({
        name: userData.name || user?.name || 'abbbb',
        email: userData.email || user?.email || 'abb@gmail.com',
        bloodType: userData.bloodType || user?.bloodType || 'AB+'
      });
    } else if (user) {
      setLocalUserData({
        name: user.name || 'abbbb',
        email: user.email || 'abb@gmail.com',
        bloodType: user.bloodType || 'AB+'
      });
    }
  }, [userData, user]);

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
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='max-w-[1170px] px-5 mx-auto'> 
      <div className='grid md:grid-cols-3 gap-10'>
        <div className='pb-[50px] px-[30px] rounded-md'>
          <div className='flex flex-col items-center justify-center'>
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img src={user?.photo} alt='user' className='w-full h-full rounded-full' />
            </figure>

            <div className='text-center mt-4'>
              <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{localUserData.name}</h3>
              <p className='text-[15px] leading-6 text-textColor font-medium mt-2'>{localUserData.email}</p>
              
              <div className='mt-4'>
                <label className='text-[15px] leading-6 text-textColor font-medium'>
                  Blood Type: 
                </label>
                <span className='ml-2 text-headingColor text-[19px] leading-8'>
                  {localUserData.bloodType}
                </span>
              </div>
            </div>
            
            <div className='mt-8 flex flex-col gap-4 w-full max-w-xs'>
              <button
                onClick={handleLogout}
                className='w-full bg-black text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors'
              >
                Logout
              </button>
              
              <button
                onClick={handleDeleteAccount}
                className='w-full bg-black text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors'
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className='md:col-span-2 md:px-[30px] hidden lg:flex flex-col p-[30px]  shadow-panelShadow items-center 
        h-max rounded-md'>
          <div>
            <button onClick={() => setTab('bookings')}
                className={`${tab ==='bookings' && 'bg-indigo-100 text-primaryColor font-normal' }p-2 mr-5 px-5 text-headingColor  rounded-md  font-semibold text-[16px] leading-6
            border border-solid border-primaryColor `}>My Bookings</button>
               <button onClick={() => setTab('settings')}
                className={`${tab ==='settings' && 'bg-indigo-100 text-primaryColor font-normal' }py-2 mr-5 px-5 text-headingColor  rounded-md  font-semibold text-[16px] leading-6
            border border-solid border-primaryColor`}>Profile Settings</button>
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
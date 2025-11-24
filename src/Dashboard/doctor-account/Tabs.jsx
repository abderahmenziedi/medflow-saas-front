import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {BiMenu} from "react-icons/bi"
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';

const Tabs = ({ tab, setTab }) => {
  const { user, token, dispatch } = useContext(authContext);
  const navigate = useNavigate();

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
        const res = await fetch(`${BASE_URL}/doctors/${user._id}`, {
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

  return (
    <div>
        <span className='lg:hidden'>
           <BiMenu  className='w-6 h-6 cursor-pointer'/>
        </span>
        <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center 
        h-max rounded-md'>
          <button 
          onClick={() => setTab('overview')}
          className={` ${tab === 'overview' 
          ? 'bg-indigo-100 text-primaryColor'
          : 'bg-transparent text-headingColor'
          } w-full btn mt-0 rounded-md`}
          >OverView</button>

           <button 
           onClick={() => setTab('appointments')}
           className={` ${tab === 'appointments' 
          ? 'bg-indigo-100 text-primaryColor'
          : 'bg-transparent text-headingColor'
          } w-full btn mt-0 rounded-md`}
          >Appointments</button>

           <button 
            onClick={() => setTab('settings')}
            className={` ${tab === 'settings' 
          ? 'bg-indigo-100 text-primaryColor'
          : 'bg-transparent text-headingColor'
          } w-full btn mt-0 rounded-md`}
          >Profile</button>

           <div className='mt-[100px] w-full'>
              <button
                onClick={handleLogout}
                className='w-full bg-primaryColor text-white py-2 px-4 rounded-md hover:bg-[#0066ffdd] transition-colors'
              >
                Logout
              </button>
              
              <button
                onClick={handleDeleteAccount}
                className='w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors mt-2'
              >
                Delete Account
              </button>
            </div>

        </div>
    </div>
   

    
  )
}

export default Tabs
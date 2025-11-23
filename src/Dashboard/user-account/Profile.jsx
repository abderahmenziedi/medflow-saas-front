import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';

const Profile = () => {
  const { user, token, dispatch } = useContext(authContext);
  
  // Initialize state with user data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    gender: user?.gender || '',
    bloodType: user?.bloodType || '',
    photo: user?.photo || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(user?.photo || '');
  
  // Blood type options
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  // Gender options
  const genders = ['male', 'female', 'other'];
  
  // Update form data when user context changes
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      gender: user?.gender || '',
      bloodType: user?.bloodType || '',
      photo: user?.photo || ''
    });
    setPreviewURL(user?.photo || '');
  }, [user]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle file input change
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };
  
  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const newPassword = prompt('Enter your new password:');
    if (!newPassword) return;
    
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    const confirmPassword = prompt('Confirm your new password:');
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password: newPassword })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update password');
      }
      
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      
      // Update context with new user data
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: data.data,
          token,
          role: user.role
        }
      });
      
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-headingColor mb-6">Profile Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-headingColor font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-headingColor font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
              placeholder="Enter your email"
              required
            />
          </div>
          
       
          
          {/* Gender Field */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-headingColor font-semibold mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
            >
              <option value="">Select Gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Blood Type Field */}
          <div className="mb-4">
            <label htmlFor="bloodType" className="block text-headingColor font-semibold mb-2">
              Blood Type
            </label>
            <select
              id="bloodType"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
            >
              <option value="">Select Blood Type</option>
              {bloodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          {/* Photo Upload */}
          <div className="mb-4">
            <label className="block text-headingColor font-semibold mb-2">
              Profile Photo
            </label>
            <div className="flex items-center gap-3">
              {previewURL && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img src={previewURL} alt="Preview" className="w-full rounded-full" />
                </figure>
              )}
              
              <div className="relative w-[130px] h-[50px]">
                <input
                  type="file"
                  id="customFile"
                  onChange={handleFileInputChange}
                  accept=".jpg, .png"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <label
                  htmlFor="customFile"
                  className="absolute top-0 left-0 w-full flex items-center px-[0.75rem] 
                    py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor
                    font-semibold rounded-lg truncate cursor-pointer"
                >
                  Upload Photo
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Password Change */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handlePasswordChange}
            disabled={loading}
            className="bg-secondaryColor text-white py-2 px-4 rounded-md hover:bg-[#ff6600dd] transition-colors duration-300 font-semibold disabled:opacity-50"
          >
            Change Password
          </button>
        </div>
        
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primaryColor text-white py-3 rounded-md hover:bg-[#0066ffdd] transition-colors duration-300 font-semibold disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
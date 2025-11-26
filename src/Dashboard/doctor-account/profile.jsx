import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';

const Profile = () => {
  const { user, token, dispatch } = useContext(authContext);
  
  // Helper function to convert old format to new format
  const convertQualifications = (quals) => {
    if (!quals || !Array.isArray(quals)) return [{ degree: '', institute: '', from: '', to: '' }];
    
    return quals.map(qual => {
      // If it's already in the new format (object with properties)
      if (typeof qual === 'object' && qual !== null && (qual.degree || qual.institute)) {
        return {
          degree: qual.degree || '',
          institute: qual.institute || '',
          from: qual.from || '',
          to: qual.to || ''
        };
      }
      // If it's in the old format (just a string)
      if (typeof qual === 'string') {
        return {
          degree: qual,
          institute: '',
          from: '',
          to: ''
        };
      }
      // Default empty object
      return { degree: '', institute: '', from: '', to: '' };
    });
  };
  
  // Helper function to convert old format to new format
  const convertExperiences = (exps) => {
    if (!exps || !Array.isArray(exps)) return [{ position: '', hospital: '', from: '', to: '' }];
    
    return exps.map(exp => {
      // If it's already in the new format (object with properties)
      if (typeof exp === 'object' && exp !== null && (exp.position || exp.hospital)) {
        return {
          position: exp.position || '',
          hospital: exp.hospital || '',
          from: exp.from || '',
          to: exp.to || ''
        };
      }
      // If it's in the old format (just a string)
      if (typeof exp === 'string') {
        return {
          position: exp,
          hospital: '',
          from: '',
          to: ''
        };
      }
      // Default empty object
      return { position: '', hospital: '', from: '', to: '' };
    });
  };
  
  // Initialize state with doctor data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    photo: user?.photo || '',
    ticketPrice: user?.ticketPrice || '',
    specialization: user?.specialization || '',
    qualifications: convertQualifications(user?.qualifications),
    experiences: convertExperiences(user?.experiences),
    bio: user?.bio || '',
    about: user?.about || '',
    gender: user?.gender || '',
    timeSlots: user?.timeSlots || []
  });
  
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(user?.photo || '');
  
  // Gender options
  const genders = ['male', 'female', 'other'];
  
  // Specialization options
  const specializations = ['cardiologue', 'dentiste', 'generaliste', 'aide soignant'];
  
  // Update form data when user context changes
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      photo: user?.photo || '',
      ticketPrice: user?.ticketPrice || '',
      specialization: user?.specialization || '',
      qualifications: convertQualifications(user?.qualifications),
      experiences: convertExperiences(user?.experiences),
      bio: user?.bio || '',
      about: user?.about || '',
      gender: user?.gender || '',
      timeSlots: user?.timeSlots || []
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
  
  // Handle qualifications change
  const handleQualificationsChange = (index, field, value) => {
    const newQualifications = [...formData.qualifications];
    // Ensure the item is an object
    if (typeof newQualifications[index] === 'string') {
      newQualifications[index] = { degree: newQualifications[index], institute: '', from: '', to: '' };
    }
    newQualifications[index] = { ...newQualifications[index], [field]: value };
    setFormData({ ...formData, qualifications: newQualifications });
  };
  
  // Add a new qualification field
  const addQualification = () => {
    setFormData({ 
      ...formData, 
      qualifications: [...formData.qualifications, { degree: '', institute: '', from: '', to: '' }] 
    });
  };
  
  // Remove a qualification field
  const removeQualification = (index) => {
    if (formData.qualifications.length <= 1) {
      toast.error('You must have at least one qualification');
      return;
    }
    const newQualifications = formData.qualifications.filter((_, i) => i !== index);
    setFormData({ ...formData, qualifications: newQualifications });
  };
  
  // Handle experiences change
  const handleExperiencesChange = (index, field, value) => {
    const newExperiences = [...formData.experiences];
    // Ensure the item is an object
    if (typeof newExperiences[index] === 'string') {
      newExperiences[index] = { position: newExperiences[index], hospital: '', from: '', to: '' };
    }
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setFormData({ ...formData, experiences: newExperiences });
  };
  
  // Add a new experience field
  const addExperience = () => {
    setFormData({ 
      ...formData, 
      experiences: [...formData.experiences, { position: '', hospital: '', from: '', to: '' }] 
    });
  };
  
  // Remove an experience field
  const removeExperience = (index) => {
    if (formData.experiences.length <= 1) {
      toast.error('You must have at least one experience');
      return;
    }
    const newExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: newExperiences });
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
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`${BASE_URL}/doctors/${user._id}`, {
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
      <h2 className="text-2xl font-bold text-headingColor mb-6">Doctor Profile Settings</h2>
      
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
          
          {/* Phone Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-headingColor font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
              placeholder="Enter your phone number"
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
          
          {/* Specialization Field */}
          <div className="mb-4">
            <label htmlFor="specialization" className="block text-headingColor font-semibold mb-2">
              Specialization
            </label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec.charAt(0).toUpperCase() + spec.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Ticket Price Field */}
          <div className="mb-4">
            <label htmlFor="ticketPrice" className="block text-headingColor font-semibold mb-2">
              Ticket Price ($)
            </label>
            <input
              type="number"
              id="ticketPrice"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
              placeholder="Enter your consultation fee"
            />
          </div>
          
          {/* Bio Field */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-headingColor font-semibold mb-2">
              Bio (Max 50 characters)
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              maxLength="50"
              className="w-full px-4 py-3 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
              placeholder="Short bio"
            />
          </div>
          
          {/* Qualifications Section */}
          <div className="mb-4 md:col-span-2">
            <label className="block text-headingColor font-semibold mb-2">
              Qualifications
            </label>
            {formData.qualifications.map((qualification, index) => (
              <div key={index} className="border border-gray-200 rounded p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={typeof qualification === 'string' ? qualification : (qualification.degree || '')}
                      onChange={(e) => handleQualificationsChange(index, 'degree', e.target.value)}
                      className="w-full px-3 py-2 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
                      placeholder="e.g., MD in Cardiology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institute
                    </label>
                    <input
                      type="text"
                      value={typeof qualification === 'object' && qualification !== null ? (qualification.institute || '') : ''}
                      onChange={(e) => handleQualificationsChange(index, 'institute', e.target.value)}
                      className="w-full px-3 py-2 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
                      placeholder="e.g., Harvard Medical School"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From
                    </label>
                    <input
                      type="date"
                      value={typeof qualification === 'object' && qualification !== null ? (qualification.from || '') : ''}
                      onChange={(e) => handleQualificationsChange(index, 'from', e.target.value)}
                      className="w-full px-3 py-2 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To
                    </label>
                    <input
                      type="date"
                      value={typeof qualification === 'object' && qualification !== null ? (qualification.to || '') : ''}
                      onChange={(e) => handleQualificationsChange(index, 'to', e.target.value)}
                      className="w-full px-3 py-2 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                  >
                    Remove Qualification
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addQualification}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Qualification
            </button>
          </div>
          
          {/* Experiences Section */}
          <div className="mb-4 md:col-span-2">
            <label className="block text-headingColor font-semibold mb-2">
              Experiences
            </label>
            {formData.experiences.map((experience, index) => (
              <div key={index} className="border border-gray-200 rounded p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={typeof experience === 'string' ? experience : (experience.position || '')}
                      onChange={(e) => handleExperiencesChange(index, 'position', e.target.value)}
                      className="w-full px-3 py-2 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
                      placeholder="e.g., Senior Surgeon"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hospital/Clinic
                    </label>
                    <input
                      type="text"
                      value={typeof experience === 'object' && experience !== null ? (experience.hospital || '') : ''}
                      onChange={(e) => handleExperiencesChange(index, 'hospital', e.target.value)}
                      className="w-full px-3 py-2 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
                      placeholder="e.g., Johns Hopkins Hospital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From
                    </label>
                    <input
                      type="date"
                      value={typeof experience === 'object' && experience !== null ? (experience.from || '') : ''}
                      onChange={(e) => handleExperiencesChange(index, 'from', e.target.value)}
                      className="w-full px-3 py-2 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To
                    </label>
                    <input
                      type="date"
                      value={typeof experience === 'object' && experience !== null ? (experience.to || '') : ''}
                      onChange={(e) => handleExperiencesChange(index, 'to', e.target.value)}
                      className="w-full px-3 py-2 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                  >
                    Remove Experience
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Experience
            </button>
          </div>
          
          {/* About Field */}
          <div className="mb-4 md:col-span-2">
            <label htmlFor="about" className="block text-headingColor font-semibold mb-2">
              About
            </label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff46] rounded-md focus:outline-none focus:border-primaryColor"
              placeholder="Tell us about yourself"
              rows="4"
            />
          </div>
          
          {/* Photo Upload */}
          <div className="mb-4 md:col-span-2">
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
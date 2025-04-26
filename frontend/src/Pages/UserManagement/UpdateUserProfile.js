import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import './UpdateFrom.css'; 
function UpdateUserProfile() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to load user data');
      }
    };
    
    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Profile updated successfully!');
        navigate('/userProfile'); 
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating profile.');
    }
  };

  return (
    <div className="update-update-profile-container">
      <div className="update-update-profile-inner">
        <div className="update-update-profile-header">
          <h2>Update Your Profile</h2>
          <p>Keep your information up to date to get the best experience on Plusecore</p>
        </div>
        
        <form onSubmit={handleSubmit} className="update-update-profile-form">
          <div className="update-form-group full-width">
            <label>Full Name</label>
            <div className="update-input-field">
              <FaUser className="update-input-icon" />
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleInputChange}
                required
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          
          <div className="update-form-group">
            <label>Email Address</label>
            <div className="update-input-field">
              <FaEnvelope className="update-input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          
          <div className="update-form-group">
            <label>Phone Number</label>
            <div className="update-input-field">
              <FaPhone className="update-input-icon" />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => {
                  const re = /^[0-9\b]{0,10}$/;
                  if (re.test(e.target.value)) {
                    handleInputChange(e);
                  }
                }}
                maxLength="10"
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits."
                required
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          
          <div className="update-form-group">
            <label>Password</label>
            <div className="update-input-field">
              <FaLock className="update-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{ paddingLeft: '2.5rem' }}
              />
              <span className="update-password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          
          <div className="update-form-actions">
            <button 
              type="button" 
              className="update-cancel-btn"
              onClick={() => navigate(-1)} // Go back to previous page
            >
              Cancel
            </button>
            <button type="submit" className="update-update-btn">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserProfile;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './user.css';
import GoogalLogo from './img/glogo.png';

function UserLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userID', data.id);
        alert('Login successful!');
        navigate('/allPost');
      } else if (response.status === 401) {
        alert('Invalid credentials!');
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="Auth_container">
      <div className="Auth_innerContainer">
        <div className="Auth_content">
          <div className="Auth_content_img"></div>
        </div>
        <div className="Auth_content new_content">
          <div className='login_content'>
            <p className="Auth_heading">Let the journey begin!</p>
            <p className="Auth_subheading">Unlock a world of education with a single click! Please login to your account.</p>
          </div>
          <div className="Auth_form_neww">
            <form onSubmit={handleSubmit} className="Auth_form">
              <div className="Auth_formGroup">
                <label className="Auth_label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="Auth_input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">Password</label>
                <div style={{ position: 'relative' }}>
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="Auth_input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <span className="password-toggle" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <button type="submit" className="Auth_button">Login</button>
              <p className="Auth_signupPrompt">
                Don't have an account? <span onClick={() => navigate('/register')} className="Auth_signupLink">Sign up for free</span>
              </p>

              <div style={{ textAlign: 'center', margin: '1rem 0', color: '#6b7280', fontSize: '0.9rem' }}>
                — OR —
              </div>
            </form>
            <button
              onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
              className="Auth_googleButton"
            >
              <img src={GoogalLogo} alt='Google logo' className='glogo' />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import './user.css';
import GoogalLogo from './img/glogo.png';
function UserRegister() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!formData.email) {
            alert("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Email is invalid");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('User registered successfully!');
                setFormData({ fullname: '', email: '', password: '', phone: '' });
                window.location.href = '/'
            } else if (response.status === 409) {
                alert('Email already exists!');
            } else {
                alert('Failed to register user.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="user-register-container">
            <div className="register-image-side">
                <h1>Join Plusecore</h1>
                <p>Connect with skilled professionals and share your expertise in our growing community of learners and teachers.</p>
            </div>
            <div className="register-form-side">
                <div className="register-form-container">
                    <div className="register-header">
                        <h2>Create your account!</h2>
                        <p>Join our community and start sharing your skills today.</p>
                    </div>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className="input-field">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Full Name"
                                    value={formData.fullname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-field">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-field">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <div className="input-field">
                                <FaPhone className="input-icon" />
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
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">Register</button>
                        <div className="login-link">
                            You have an account? <span onClick={() => (window.location.href = '/')}>Sign in now</span>
                        </div>
                        <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
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
    );
}

export default UserRegister;
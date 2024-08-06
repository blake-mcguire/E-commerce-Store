import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style_modules/LoginSidebar.css'; // Create a CSS file for styling

const LoginSidebar = ({ show, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            if (response.data.success) {
                // Handle successful login
                onClose();
            } else {
                // Redirect to create account page
                navigate('/create-account');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className={`sidebar ${show ? 'show' : ''}`}>
            <button className="close-btn" onClick={onClose}>×</button>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginSidebar;
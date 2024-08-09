
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style_modules/LoginSidebar.css';

const AdminLoginSidebar = ({ show, onClose, setIsAdmin, setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/admin_login', { email, password });
            if (response.data.success) {
                localStorage.setItem('session_id', response.data.session_id);
                localStorage.setItem('user_id', response.data.user_id);
                localStorage.setItem('user_type', response.data.user_type);
                setIsLoggedIn(true);
                setIsAdmin(true);
                onClose();

            } else {
                setError('Invalid email or password');
                navigate('/create-admin-account');
            }
        } catch (error) {
            setError('Error logging in. Please try again.');
            console.error('Error logging in:', error);
            navigate('/create-admin-account');
        }
    };

    return (
        <div className={`sidebar ${show ? 'show' : ''}`}>
            <button className="close-btn" onClick={onClose}>×</button>
            <form onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                {error && <p className="error">{error}</p>}
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

export default AdminLoginSidebar;

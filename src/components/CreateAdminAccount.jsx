import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style_modules/CreateAccount.css';

const CreateAdminAccount = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accountResponse = await axios.post('http://localhost:5000/admin_accounts', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (accountResponse.data.success) {
                const sessionResponse = await axios.post('http://localhost:5000/admin_login', { email: formData.email, password: formData.password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (sessionResponse.data.success) {
                    localStorage.setItem('session_id', sessionResponse.data.session_id);
                    localStorage.setItem('user_id', sessionResponse.data.user_id);
                    localStorage.setItem('user_type', sessionResponse.data.user_type);
                    
                }
            }
        } catch (error) {
            console.error('Error creating admin account:', error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit} className="p-4 rounded shadow" style={{ backgroundColor: '#ffffff' }}>
                        <h2 className="mb-4">Create Admin Account</h2>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateAdminAccount;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const SupportTicketForm = () => {
    const [formData, setFormData] = useState({
        customer_id: '',  
        subject: '',
        message: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('user_id'); 
        if (userId) {
            setFormData(prevState => ({
                ...prevState,
                customer_id: parseInt(userId, 10)  
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const dataToSend = { ...formData };
        if (!dataToSend.customer_id) {
            delete dataToSend.customer_id;
        }

        try {
            await axios.post('http://localhost:5000/support_tickets', dataToSend);
            alert('Support ticket submitted successfully');
            setFormData({ customer_id: formData.customer_id, subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting support ticket:', error);
        }
    };

    return (
        <Container className="my-5">
            <h2>Submit a Support Ticket</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default SupportTicketForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const ManageSupportTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/support_tickets');
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching support tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <Container>
            <h2>Manage Support Tickets</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Customer ID</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.ticket_id}>
                            <td>{ticket.ticket_id}</td>
                            <td>{ticket.customer_id}</td>
                            <td>{ticket.subject}</td>
                            <td>{ticket.message}</td>
                            <td>{ticket.status}</td>
                            <td>{new Date(ticket.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ManageSupportTickets;

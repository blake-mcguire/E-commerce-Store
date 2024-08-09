import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/customer_accounts');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleChange = (e, accountId) => {
        const { name, value } = e.target;
        setCustomers(customers.map(customer => customer.account_id === accountId ? { ...customer, [name]: value } : customer));
    };

    const handleNewCustomerChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/customer_accounts', newCustomer);
            setCustomers([...customers, response.data]);
            setNewCustomer({ username: '', email: '', password: '' });
            alert('Customer added successfully');
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const handleShowModal = (action, customer) => {
        setModalAction(action);
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const handleConfirmAction = async () => {
        if (modalAction === 'update') {
            try {
                await axios.put(`http://localhost:5000/customer_accounts/${selectedCustomer.account_id}`, selectedCustomer);
                alert('Customer updated successfully');
            } catch (error) {
                console.error('Error updating customer:', error);
            }
        } else if (modalAction === 'delete') {
            handleDeleteCustomer(selectedCustomer);
        }
        setShowModal(false);
    };

    const handleDeleteCustomer = async (customer) => {
        try {
            await axios.delete(`http://localhost:5000/customer_accounts/${customer.account_id}`);
            setCustomers(customers.filter(c => c.account_id !== customer.account_id));
            alert('Customer deleted successfully');
        } catch (error) {
            console.error('Error deleting customer:', error);
            alert('Error deleting customer');
        }
    };

    return (
        <Container>
            <h2>Manage Customers</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.account_id}>
                            <td>{customer.account_id}</td>
                            <td>
                                <input
                                    type="text"
                                    name="username"
                                    value={customer.username}
                                    onChange={(e) => handleChange(e, customer.account_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={customer.email}
                                    onChange={(e) => handleChange(e, customer.account_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    value={customer.password}
                                    onChange={(e) => handleChange(e, customer.account_id)}
                                />
                            </td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowModal('update', customer)}>Update</Button>
                                <Button variant="danger" onClick={() => handleShowModal('delete', customer)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>New</td>
                        <td>
                            <input
                                type="text"
                                name="username"
                                value={newCustomer.username}
                                onChange={handleNewCustomerChange}
                            />
                        </td>
                        <td>
                            <input
                                type="email"
                                name="email"
                                value={newCustomer.email}
                                onChange={handleNewCustomerChange}
                            />
                        </td>
                        <td>
                            <input
                                type="password"
                                name="password"
                                value={newCustomer.password}
                                onChange={handleNewCustomerChange}
                            />
                        </td>
                        <td>
                            <Button variant="success" onClick={handleAddCustomer}>Add</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {modalAction} this customer?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAction}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ManageCustomers;

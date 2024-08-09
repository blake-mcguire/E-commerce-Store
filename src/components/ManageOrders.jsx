import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style_modules/ManageCustomers.css';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        customer_id: '',
        date: '',
        products: []
    });
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleChange = (e, orderId) => {
        const { name, value } = e.target;
        setOrders(orders.map(order => order.order_id === orderId ? { ...order, [name]: value } : order));
    };

    const handleNewOrderChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleAddOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/orders', newOrder);
            setOrders([...orders, response.data]);
            setNewOrder({ customer_id: '', date: '', products: [] });
            alert('Order added successfully');
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    const handleShowModal = (action, order) => {
        setModalAction(action);
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleConfirmAction = async () => {
        if (modalAction === 'update') {
            try {
                await axios.put(`http://localhost:5000/orders/${selectedOrder.order_id}`, selectedOrder);
                alert('Order updated successfully');
            } catch (error) {
                console.error('Error updating order:', error);
            }
        } else if (modalAction === 'delete') {
            handleDeleteOrder(selectedOrder.order_id);
        }
        setShowModal(false);
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5000/orders/${orderId}`);
            setOrders(orders.filter(order => order.order_id !== orderId));
            alert('Order deleted successfully');
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <Container>
            <h2>Manage Orders</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Date</th>
                        <th>Products</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>
                                <input
                                    type="text"
                                    name="customer_id"
                                    value={order.customer_id}
                                    onChange={(e) => handleChange(e, order.order_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name="date"
                                    value={order.date}
                                    onChange={(e) => handleChange(e, order.order_id)}
                                />
                            </td>
                            <td>
                                {order.products.map(product => (
                                    <div key={product.product_id}>
                                        {product.name} (${product.price})
                                    </div>
                                ))}
                            </td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowModal('update', order)}>Update</Button>
                                <Button variant="danger" onClick={() => handleShowModal('delete', order)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>New</td>
                        <td>
                            <input
                                type="text"
                                name="customer_id"
                                value={newOrder.customer_id}
                                onChange={handleNewOrderChange}
                            />
                        </td>
                        <td>
                            <input
                                type="date"
                                name="date"
                                value={newOrder.date}
                                onChange={handleNewOrderChange}
                            />
                        </td>
                        <td></td>
                        <td>
                            <Button variant="success" onClick={handleAddOrder}>Add</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {modalAction} this order?
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

export default ManageOrders;

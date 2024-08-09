import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        calculateTotal(storedCart);
        
        const userId = localStorage.getItem('user_id');
        const sessionId = localStorage.getItem('session_id');

        if (userId && sessionId) {
            setIsLoggedIn(true);
            fetchPreviousOrders(userId, sessionId);
        }
    }, []);

    const calculateTotal = (cartItems) => {
        const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalAmount);
    };

    const fetchPreviousOrders = async (userId, sessionId) => {
        try {
            const response = await axios.get(`http://localhost:5000/orders/customer/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${sessionId}`
                }
            });
            setPreviousOrders(response.data);
        } catch (error) {
            console.error('Error fetching previous orders:', error);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.product_id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const handleCheckout = async () => {
        if (!isLoggedIn) {
            setShowLoginAlert(true);
            return;
        }

        const customer_id = localStorage.getItem('user_id');
        const productIds = cart.map(item => item.product_id);
        const orderData = { customer_id, date: new Date().toISOString().split('T')[0], products: productIds };

        try {
            const response = await axios.post('http://localhost:5000/orders', orderData);
            if (response.status === 201) {
                alert('Order placed successfully!');
                setCart([]);
                localStorage.removeItem('cart');
                setTotal(0);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order');
        }
    };

    return (
        <Container>
            <h1>Your Cart</h1>
            {showLoginAlert && <Alert variant="warning">Please log in or create an account to continue with the checkout.</Alert>}
            <Row>
                {cart.length > 0 ? (
                    <>
                        <Col md={8}>
                            <ListGroup>
                                {cart.map(product => (
                                    <ListGroup.Item key={product.product_id}>
                                        <Row>
                                            <Col md={4}>
                                                <Card.Img variant="top" src={product.image_url} alt={product.name} />
                                            </Col>
                                            <Col md={4}>
                                                <h5>{product.name}</h5>
                                                <p>${product.price.toFixed(2)}</p>
                                            </Col>
                                            <Col md={4}>
                                                <Button variant="danger" onClick={() => removeFromCart(product.product_id)}>Remove</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Total: ${total.toFixed(2)}</Card.Title>
                                    <Button variant="success" onClick={handleCheckout}>Checkout</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </>
                ) : (
                    <Col>
                        <p>Your cart is empty.</p>
                    </Col>
                )}
            </Row>

            <h2 className="mt-5">Previous Orders</h2>
            <Row>
                {previousOrders.length > 0 ? (
                    <ListGroup>
                        {previousOrders.map(order => (
                            <ListGroup.Item key={order.order_id}>
                                <h5>Order ID: {order.order_id}</h5>
                                <p>Date: {order.date}</p>
                                <ListGroup>
                                    {order.products.map(product => (
                                        <ListGroup.Item key={product.product_id}>
                                            {product.name} - ${product.price.toFixed(2)}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No previous orders found.</p>
                )}
            </Row>
        </Container>
    );
};

export default Cart;


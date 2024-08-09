import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ProductTypePage = ({ type }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsByType = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products?type=${type}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductsByType();
    }, [type]);

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <Row className="gx-4">
            {products.map(product => (
                <Col key={product.product_id} md={3} xs={12} sm={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Img variant="top" src={product.image_url} alt={product.name} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>${product.price.toFixed(2)}</Card.Text>
                            <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ProductTypePage;

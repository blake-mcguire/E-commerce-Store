import React, { useEffect, useState } from 'react';
import { Carousel, Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import '../style_modules/ProductCarousel.css';

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    
    useEffect(() => {
        const interval = setInterval(() => {
            setProducts(prev => [...prev.slice(1), prev[0]]);
        }, 3000); 

        return () => clearInterval(interval); 
    }, [products]);

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <div>
            <Carousel interval={null} indicators={false} controls={false} pause={false}>
                {products.length > 0 && (
                    <Carousel.Item>
                        <Row className="gx-4">
                            {products.slice(0, 4).map((product, idx) => (
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
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    );
};

export default ProductCarousel;
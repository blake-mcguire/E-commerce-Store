import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '/images/logo.png'; 
import '../style_modules/HeroSection.css';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <Container className="text-center">
                <Row>
                    <Col>
                        <img src={logo} alt="Company Logo" className="hero-logo mb-4" />
                        <h1 className="hero-text"></h1>
                        <p className="hero-subtext">
                        Get the same clothes you can on Temu, Only 10x more expensive.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HeroSection;
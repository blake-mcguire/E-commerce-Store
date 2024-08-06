import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '/images/logo.png';
import '../style_modules/CustomerNav.css';
import LoginSidebar from "./LoginSidebar"; // Import the LoginSidebar component

function NavigationBar() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="px-3">
                <Navbar.Brand href="/">
                    <img className="img-fluid p-1 custom-logo" src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/" end>
                            Home
                        </Nav.Link>
                        <Nav.Link onClick={toggleSidebar}>
                            Login
                        </Nav.Link>
                        <NavDropdown title="Shop" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/shop/shirts">
                                Shirts
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/shop/dresses">
                                Dresses
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/shop/coats">
                                Coats
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <LoginSidebar show={showSidebar} onClose={toggleSidebar} />
        </>
    );
}

export default NavigationBar;
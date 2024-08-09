import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '/images/logo.png';
import '../style_modules/CustomerNav.css';
import LoginSidebar from "./LoginSidebar";
import AdminLoginSidebar from "./AdminLoginSidebar";

function NavigationBar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showAdminSidebar, setShowAdminSidebar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const sessionId = localStorage.getItem('session_id');
        const userType = localStorage.getItem('user_type');
        if (sessionId) {
            setIsLoggedIn(true);
            if (userType === 'admin') {
                setIsAdmin(true);
            }
        }
    }, []);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleAdminSidebar = () => {
        setShowAdminSidebar(!showAdminSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const closeAdminSidebar = () => {
        setShowAdminSidebar(false);
    };

    const handleLogout = async () => {
        const sessionId = localStorage.getItem('session_id');
        if (sessionId) {
            try {
                const response = await fetch('http://localhost:5000/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id: sessionId }),
                });

                if (response.ok) {
                    localStorage.removeItem('session_id');
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('user_type');
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
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
                        <Nav.Link as={NavLink} to="/cart">
                            Cart
                        </Nav.Link>
                        {isLoggedIn ? (
                            <>
                                {isAdmin && (
                                    <>
                                        <Nav.Link as={NavLink} to="/manage-customers">
                                            Manage Customers
                                        </Nav.Link>
                                        <Nav.Link as={NavLink} to="/manage-products">
                                            Manage Products
                                        </Nav.Link>
                                        <Nav.Link as={NavLink} to="/manage-orders">
                                            Manage Orders
                                        </Nav.Link>
                                        <Nav.Link as={NavLink} to="/manage-support-tickets">
                                            Manage Support Tickets
                                        </Nav.Link>
                                    </>
                                )}
                                <Nav.Link onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link onClick={toggleSidebar}>
                                    Login
                                </Nav.Link>
                                <Nav.Link onClick={toggleAdminSidebar}>
                                    Admin Sign In
                                </Nav.Link>
                            </>
                        )}
                        <NavDropdown title="Shop" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/shop/shirts">
                                Shirts
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/shop/dresses">
                                Dresses
                            </NavDropdown.Item>
                            {/* Add more dropdown items here for different types */}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <LoginSidebar show={showSidebar} onClose={closeSidebar} />
            <AdminLoginSidebar 
                show={showAdminSidebar} 
                onClose={closeAdminSidebar} 
                setIsAdmin={setIsAdmin} 
                setIsLoggedIn={setIsLoggedIn}
            />
        </>
    );
}

export default NavigationBar;

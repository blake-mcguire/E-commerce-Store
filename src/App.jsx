import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/CustomerNavigationBar';
import ProductCarousel from './components/ProductCarousel';
import CreateAccount from './components/CreateAccount'; // Import the CreateAccount component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<ProductCarousel />} />
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
        </Router>
    );
}

export default App;
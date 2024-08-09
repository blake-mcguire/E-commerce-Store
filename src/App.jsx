import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/CustomerNavigationBar';
import ProductCarousel from './components/ProductCarousel';
import CreateAccount from './components/CreateAccount'; 
import CreateAdminAccount from './components/CreateAdminAccount'; 
import ManageCustomers from './components/ManageCustomers'; 
import ManageProducts from './components/ManageProducts'; 
import ManageOrders from './components/ManageOrders'; 
import Cart from './components/Cart';
import ProductTypePage from './components/ProductType';  
import HeroSection from './components/Hero';
import SupportTicketForm from './components/SupportTickets'
import ManageSupportTickets from './components/ManageSupportTickets';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={
                    <>
                        <ProductCarousel />
                        <HeroSection /> z
                        <SupportTicketForm/>
                    </>
                } />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/create-admin-account" element={<CreateAdminAccount />} /> 
                <Route path="/manage-customers" element={<ManageCustomers />} /> 
                <Route path="/manage-products" element={<ManageProducts />} /> 
                <Route path="/manage-orders" element={<ManageOrders />} /> 
                <Route path="/cart" element={<Cart />} /> 
                <Route path="/shop/shirts" element={<ProductTypePage type="Shirts" />} />
                <Route path="/shop/dresses" element={<ProductTypePage type="Dresses" />} />
                <Route path="/manage-support-tickets" element={<ManageSupportTickets />}/>
            </Routes>
        </Router>
    );
}

export default App;


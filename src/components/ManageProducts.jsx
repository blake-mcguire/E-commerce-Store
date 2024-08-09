import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style_modules/ManageCustomers.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image_url: '',
        type: ''  // Added type field
    });
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const handleChange = (e, productId) => {
        const { name, value } = e.target;
        setProducts(products.map(product => product.product_id === productId ? { ...product, [name]: value } : product));
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/products', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ name: '', price: '', image_url: '', type: '' });  
            alert('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleShowModal = (action, product) => {
        setModalAction(action);
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleConfirmAction = async () => {
        if (modalAction === 'update') {
            try {
                await axios.put(`http://localhost:5000/products/${selectedProduct.product_id}`, selectedProduct);
                alert('Product updated successfully');
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else if (modalAction === 'delete') {
            handleDeleteProduct(selectedProduct.product_id);
        }
        setShowModal(false);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            setProducts(products.filter(product => product.product_id !== productId));
            alert('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Container>
            <h2>Manage Products</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image URL</th>
                        <th>Type</th> 
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={product.name}
                                    onChange={(e) => handleChange(e, product.product_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={(e) => handleChange(e, product.product_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="image_url"
                                    value={product.image_url}
                                    onChange={(e) => handleChange(e, product.product_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="type"
                                    value={product.type}
                                    onChange={(e) => handleChange(e, product.product_id)}  
                                />
                            </td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowModal('update', product)}>Update</Button>
                                <Button variant="danger" onClick={() => handleShowModal('delete', product)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>New</td>
                        <td>
                            <input
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleNewProductChange}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleNewProductChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="image_url"
                                value={newProduct.image_url}
                                onChange={handleNewProductChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="type"
                                value={newProduct.type}  
                                onChange={handleNewProductChange}
                            />
                        </td>
                        <td>
                            <Button variant="success" onClick={handleAddProduct}>Add</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {modalAction} this product?
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

export default ManageProducts;

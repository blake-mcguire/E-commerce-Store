# E-Commerce Application

This is a full-stack e-commerce application built with React for the frontend and Flask for the backend. The application includes features for managing products, customers, orders, and support tickets.

## Table of Contents

- [E-Commerce Application](#e-commerce-application)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Usage](#usage)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
  - [Loading the SQL File](#loading-the-sql-file)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject/frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

### Backend

1. Navigate to the backend directory:
    ```bash
    cd yourproject/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Start the Flask server:
    ```bash
    flask run
    ```

## Usage

### Frontend

The frontend is built with React and includes the following components:

- `App.jsx`: Main application component that sets up routing.
- `CustomerNavigationBar.jsx`: Navigation bar for customers.
- `AdminLoginSidebar.jsx`: Sidebar for admin login.
- `Cart.jsx`: Shopping cart component.
- `CreateAccount.jsx`: Form for creating a customer account.
- `CreateAdminAccount.jsx`: Form for creating an admin account.
- `HeroSection.jsx`: Hero section of the homepage.
- `LoginSidebar.jsx`: Sidebar for customer login.
- `ManageCustomers.jsx`: Component for managing customers.
- `ManageOrders.jsx`: Component for managing orders.
- `ManageProducts.jsx`: Component for managing products.
- `ManageSupportTickets.jsx`: Component for managing support tickets.
- `ProductCarousel.jsx`: Carousel for displaying products.
- `ProductTypePage.jsx`: Page for displaying products by type.
- `SupportTicketForm.jsx`: Form for submitting support tickets.

### Backend

The backend is built with Flask and includes the following models and schemas:

- `CustomerAccount`: Model for customer accounts.
- `AdminAccount`: Model for admin accounts.
- `SupportTicket`: Model for support tickets.
- `SessionTable`: Model for sessions.
- `Order`: Model for orders.
- `Product`: Model for products.

## Loading the SQL File

To load the SQL file into your database, follow these steps:

1. Ensure you have a MySQL server running and you have the necessary credentials to access it.

2. Open a terminal and log in to your MySQL server:
    ```bash
    mysql -u yourusername -p
    ```

3. Create a new database:
    ```sql
    CREATE DATABASE yourdatabase;
    ```

4. Use the newly created database:
    ```sql
    USE yourdatabase;
    ```

5. Load the SQL file into the database:


6. Verify that the tables have been created and populated:
    ```sql
    SHOW TABLES;
    ```

## Contributing

Guidelines for contributing to the project.

## License

Information about the project's license.
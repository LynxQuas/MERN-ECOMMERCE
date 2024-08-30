# React Full-Stack Application

## Overview

This React full-stack application provides a comprehensive e-commerce platform with separate user and admin interfaces. Users can explore products, view item details, manage their wishlist, and more, while admins have the ability to manage products and customers through a specialized dashboard.

## Architecture

### Frontend

-   **Routing:** Managed with React Router. The `createBrowserRouter` function defines routes and components for both user and admin interfaces.
-   **State Management:** Utilizes React Query for data fetching and caching, providing efficient state management for server-side data.
-   **Context:** User authentication and state are managed using `UserContextProvider`.
-   **Notifications:** Implemented using `react-hot-toast` for handling success and error messages.

## Components

### User Interface

-   **`AppLayout`**: Main layout component for user routes.
-   **`Shop`**: Displays a list of products with optional category filtering.
-   **`ItemDetails`**: Shows detailed information about a selected product.
-   **`Wishlist`**: Allows users to manage their wishlist.
-   **`PlaceholderPage`**: Placeholder component for routes like `/about` and `/contact`.

### Admin Interface

-   **`AdminLayout`**: Main layout component for admin routes.
-   **`Customers`**: Manages and displays the list of customers.
-   **`Products`**: Manages and displays the list of products.
-   **`ProductForm`**: Form for creating and updating products.

### Authentication & Authorization

-   **`PrivateRoute`**: Ensures only authenticated users with the appropriate roles can access certain routes.
-   **`RedirectIfAuthenticated`**: Redirects authenticated users away from login and registration pages to prevent unnecessary access.

### Error Handling

-   **`Error`**: Displays a custom error message for non-existent routes or other errors.

### Backend

-   **Express.js**: A web framework for Node.js to build RESTful APIs.
-   **MongoDB**: A NoSQL database for storing user, product, and order data.
-   **Mongoose**: An ODM library for MongoDB and Node.js.
-   **Cors**: Middleware for handling Cross-Origin Resource Sharing.
-   **dotenv**: For managing environment variables.

## API Endpoints

### User Routes (`/api/users`)

-   **POST `/api/users/register`**: Register a new user.
-   **POST `/api/users/login`**: Log in a user.
-   **GET `/api/users/:userId`**: Get the currently authenticated user's details.

### Product Routes (`/api/products`)

-   **GET `/api/products`**: Get all products.
-   **GET `/api/products/:productId`**: Get details of a specific product.
-   **POST `/api/products`**: Create a new product (Admin only).
-   **PUT `/api/products/:productId`**: Update an existing product (Admin only).
-   **DELETE `/api/products/:productId`**: Delete a product (Admin only).

### Order Routes (`/api/orders`)

-   **POST `/api/orders`**: Create a new order.
-   **GET `/api/orders`**: Get all orders for the authenticated user.
-   **GET `/api/orders/:orderId`**: Get details of a specific order.

## Database Schema

### User

```json
{
    "name": "String",
    "email": "String",
    "password": "String",
    "role": "String" // either 'user' or 'admin'
}
```

### Product

```json
{
    "name": "String",
    "description": "String",
    "price": "Number",
    "category": "String",
    "imageUrl": "String",
    "sizes": ["String"],
    "colors": ["String"],
    "onSale": "Boolean",
    "salePrice": "Number",
    "ratings": "Number",
    "dateAdded": "Date"
}
```

### Order

```json
{
    "userId": {
        "type": "mongoose.Schema.ObjectId",
        "ref": "User",
        "required": true
    },
    "name": {
        "type": "String",
        "required": true
    },
    "productId": {
        "type": "mongoose.Schema.ObjectId",
        "ref": "Product",
        "required": true
    },
    "imageUrl": {
        "type": "String",
        "required": true
    },
    "color": {
        "type": "String",
        "required": true
    },
    "size": {
        "type": "String",
        "required": true
    },
    "price": {
        "type": "Number",
        "required": true
    },
    "quantity": {
        "type": "Number",
        "default": 1
    },
    "status": {
        "type": "String",
        "enum": ["Pending", "Paid", "Processing", "Completed"],
        "default": "Pending"
    },
    "createdAt": {
        "type": "Date",
        "default": "Date.now"
    },
    "updatedAt": {
        "type": "Date",
        "default": "Date.now"
    }
}
```

## Setup Instructions

### Prerequisites

-   Node.js and npm installed.
-   MongoDB database instance (for backend).
-   Environment variables for API keys and database connection.

### Installation & Run App

1. **Clone the Repository:**
    ```bash
    git clone "https://github.com/LynxQuas/MERN-ECOMMERCE"
    cd <repository-directory>
    ```
2. **Install Dependencies:** <br>
   -For The Backend

    ```bash
    cd backend
    npm install
    npm run server
    ```

    -For The Backend

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### Environment Variables

Create a .env file in the root of the project and add the following:<br>
PORT=3000<br>
DATABASE_URL=your_mongodb_connection_string<br>
JWT_SECRET=your_jwt_secret<br>

### Running the Project

**Frontend:**
Navigate to "http://localhost:5173" to access the user-facing shop and admin dashboard.<br>
**Backend**
API endpoints will be accessible at http://localhost:3000/api.

### Graceful Shutdown

The server will handle `SIGINT` and `SIGTERM` signals for graceful shutdown, ensuring that database connections are closed properly before exiting.

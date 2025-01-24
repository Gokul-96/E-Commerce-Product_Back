npm install

npm init -y
Installed express mongoose dotenv bcrypt jsonwebtoken mongodb cors

1. product Management
    - Created Model three fields [name,image,price]
    - Done business logic (controller)
    - Handle API request for create products and Fetch all products  using find() and then product details by ID using findById.
    - API endpoints created for getProducts, getProductById, createProduct

2. cart management 
    - Created model two fields [userId,items(productId,quantity) ]
    - Business logic (controller): Add, remove, and update products in the cart for an authenticated user.
    - API endpoints created for Add, remove, and update.

3. Manage User Order
    - created model three fields [name, email, password]
    - Encrypt the password before saving and compare entered psw with hassed psw
    - Business logic (controller): create, view, update order status

4. JWT token implemented


Database - MongoDB
environmental variable - Managed using dotenv 

//Run development server
node server.js

Deployment link: https://e-commerce-product-back.onrender.com

Server will be running on http://localhost:8000


const express = require('express');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes= require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { authenticateUser } = require('./middleware/auth');
const connectDB = require('./config/db');
const cors = require('cors');
let app = express();

app.use(cors()); 

dotenv.config();

app.use(express.json());   //middleware 

//routes
app.use  ('/api/products', productRoutes);
app.use  ('/api/users', userRoutes);
app.use ('/api/orders',authenticateUser,orderRoutes )
app.use('/api/cart', authenticateUser, cartRoutes);


connectDB();


//server
const PORT = process.env.PORT ||8000;
app.listen(PORT,  () =>  console.log(`Server running on the port ${PORT}` ));
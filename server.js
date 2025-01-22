const express = require('express');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes= require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');


dotenv.config();
let app = express();
app.use(express.json());   //middleware 

//routes
app.use ('orders',orderRoutes )
app.use  ('products', productRoutes);
app.use  (' users', userRoutes);


connectDB();


//server
const PORT = process.env.PORT ||8000;
app.listen(PORT,  () =>  console.log(`Server running on the port ${PORT}` ));
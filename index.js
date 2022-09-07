//Good Luck everyone! lets crush this project together!

//Import list
const express = require("express");
const app = express()
const cors = require("cors");   
require('dotenv').config()
const {PORT} = process.env || 8080;
//Import routes
const warehouseRoutes = require('./routes/warehouse');
const inventoryRoutes = require('./routes/inventory');

//Middleware
app.use(cors())
app.use(express.json()); // to get request body
app.use(express.static('public')); // to get images as static files

//Routes
app.use("/warehouse", warehouseRoutes);
app.use("/inventory", inventoryRoutes);

app.listen(PORT, () =>{
    console.log(`Running on port ${PORT}....`)
    console.log('To kill API press CTRL + C')
})
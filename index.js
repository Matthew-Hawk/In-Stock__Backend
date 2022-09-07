//Good Luck everyone! lets crush this project together!

//Import list
const express = require("express");
const app = express()
const cors = require("cors");   
require('dotenv').config()
const {PORT} = process.env
//Import routes
const warehouseRoutes = require('./routes/warehouses');

//Middleware
app.use(cors())
app.use(express.json()); // to get request body
app.use(express.static('public')); // to get images as static files

//Routes
app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () =>{
    console.log(`Running on port ${PORT}....`)
    console.log('To kill API press CTRL + C')
})
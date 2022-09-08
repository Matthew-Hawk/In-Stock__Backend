// imports
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// post /warehouses => add new warehouse to warehouses data
router.post("/", (req, res) => {
    // get new warehouse data from request body and validate data
    const { name, address, city, country, contactName, contactPosition, contactPhone, contactEmail } = req.body;
    // check that all fields are non-empty
    if (!name || !address || !city || !country || !contactName || !contactPosition || !contactPhone || !contactEmail) {
        res.status(400).send("Error in request - all fields must be non-empty.");
        return;
    }
    // check that phone number and email are correct using regex
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailRegex.test(contactEmail)) {
        res.status(400).send("Error in request - email is invalid.");
        return;
    }
    const phoneRegex = /^(\+[0-9])\s(\([0-9]{3}\))\s([0-9]{3}\-[0-9]{4})$/;
    if (!phoneRegex.test(contactPhone)) {
        res.status(400).send("Error in request - phone number is invalid.");
        return;
    }
    // create new warehouse object
    const newWarehouse =   {
        "id": uuidv4(),
        name,
        address,
        city,
        country,
        "contact": {
            contactName,
            contactPosition,
            contactPhone,
            contactEmail
        }
    };
    // get current warehouse data and push new warehouse to existing array
    const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
    warehouseData.push(newWarehouse);
    // write the updated warehouse data back to the json file
    fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouseData));
    // send back the newly added warehouse
    res.status(200).json(newWarehouse);
});


// get single warehouse detail
router.get('/:id', (req, res) => {
    const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
    let selectedWarehouse = warehouseData.find(warehouse => warehouse.id === req.params.id)
    res.json(selectedWarehouse)
})

module.exports = router;
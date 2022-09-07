// libraries
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// post /warehouses => add new warehouse to warehouses data
router.post("/", (req, res) => {
    // get new warehouse data from request body
    const { name, address, city, country, contactName, contactPosition, contactPhone, contactEmail } = req.body;
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
    res.json(newWarehouse);
});

exports.modules = router;
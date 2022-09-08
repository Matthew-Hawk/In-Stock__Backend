// imports
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// post /warehouses => add new warehouse to warehouses data
const addWarehouse = (req, res) => {
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
};

// delete /warehouse => delete warehouse and all its inventory items from data files
const deleteWarehouse = (req, res) => {
    // get warehouse id from url
    const warehouseId = req.params.warehouseId;
    // remove specified warehouse and corresponding inventory items using warehouse id
    const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
    const inventoryData = JSON.parse(fs.readFileSync("./data/inventories.json"));
    const newWarehouseData = warehouseData.filter((warehouse) => warehouse.id !== warehouseId);
    const newInventoryData = inventoryData.filter((item) => item.warehouseID !== warehouseId);
    // save deleted warehouse to send back
    const deletedWarehouse = warehouseData.filter((warehouse) => warehouse.id === warehouseId);
    // write the updated warehouse and inventory data back to the json files
    fs.writeFileSync("./data/warehouses.json", JSON.stringify(newWarehouseData));
    fs.writeFileSync("./data/inventories.json", JSON.stringify(newInventoryData));
    res.status(200).json(deletedWarehouse);
};

module.exports = {
    addWarehouse,
    deleteWarehouse
}
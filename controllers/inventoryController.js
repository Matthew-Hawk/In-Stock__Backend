// imports
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// post /inventory => add new inventory item to inventory data
const addInventoryItem = (req, res) => {
    // get new inventory data from request body and validate data
    const { itemName, description, category, status, quantity, warehouseName } = req.body;
    // check that all fields are non-empty
    if (!itemName || !description || !category || !status || !quantity || !warehouseName) {
        return res.status(400).send("Error in request - all fields must be non-empty.");
    }
    // find warehouse id from warehouse name in the warehouse json file
    const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
    const warehouseId = warehouseData.find(warehouse => warehouse.name === warehouseName).id;
    // create new inventory object
    const newInventory = {
        "id": uuidv4(),
        warehouseId,
        warehouseName,
        itemName,
        description,
        category,
        status,
        quantity
    };
    // get current inventory data and push new inventory to existing array
    const inventoryData = JSON.parse(fs.readFileSync("./data/inventories.json"));
    inventoryData.push(newInventory);
    // write the updated inventory data back to the json file
    fs.writeFileSync("./data/inventories.json", JSON.stringify(inventoryData));
    // send back the new inventory location
    const newInventoryURL = `/inventory/${newInventory[0]}`;
    res.status(201).location(newInventoryURL).send(newInventoryURL);
};

module.exports = {
    addInventoryItem
}
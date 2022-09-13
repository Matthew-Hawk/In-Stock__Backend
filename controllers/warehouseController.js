// imports
const fs = require('fs');
const { v4: uuid } = require('uuid');

// post /warehouses => add new warehouse to warehouses data
const addWarehouse = (req, res) => {
    // create new warehouse object
    const newWarehouse = {
        id: uuid(),
        name: req.body.newWarehouse.warehouseName,
        address: req.body.newWarehouse.address,
        city: req.body.newWarehouse.city,
        country: req.body.newWarehouse.country,
        contact: {
          name: req.body.newWarehouse.contact.contactName,
          position: req.body.newWarehouse.contact.position,
          phone: req.body.newWarehouse.contact.phone,
          email: req.body.newWarehouse.contact.email,
        },
      };
    // get current warehouse data and push new warehouse to existing array
    const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
    warehouseData.push(newWarehouse);
    // write the updated warehouse data back to the json file
    fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouseData));
    // send back the new warehouse location
    // const newWarehouseURL = `/warehouse/${newWarehouse[0]}`;
    res.status(201).json({message: 'success'});
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
    // write the updated warehouse and inventory data back to the json files
    fs.writeFileSync("./data/warehouses.json", JSON.stringify(newWarehouseData));
    fs.writeFileSync("./data/inventories.json", JSON.stringify(newInventoryData));
    res.status(204).send(`Warehouse with id: ${warehouseId} and all its inventory items have been deleted.`)
};

// get single warehouse detail
 const singleWarehouse = (req, res) => {
    const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
    let selectedWarehouse = warehouseData.find(warehouse => warehouse.id === req.params.warehouseId)
    res.status(200).json(selectedWarehouse)
}

// get list of warehouses
const index = (_req,res) => {
    const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
    res.status(200).json(warehouseData)
}

//edit warehouse details
const editWarehouse = (req, res) => {
    const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
    warehouseData.find(warehouse => warehouse.id === req.params.warehouseId).name = req.body.name;
    warehouseData.find(warehouse => warehouse.id === req.params.warehouseId).address = req.body.address;
    warehouseData.find(warehouse => warehouse.id === req.params.warehouseId).city = req.body.city;
    warehouseData.find(warehouse => warehouse.id === req.params.warehouseId).country = req.body.country;
    warehouseData.find(warehouse => warehouse.id === req.params.warehouseId).contact.name = req.body.contact.name;
    warehouseData.find(warehouse => warehouse.id === req.params.warehouseId).contact.position = req.body.contact.position;
    warehouseData.find(warehouse => warehouse.id === req.params.warehouseId).contact.phone = req.body.contact.phone;
    warehouseData.find(warehouse => warehouse.id === req.params.warehouseId).contact.email = req.body.contact.email;
    fs.writeFileSync('./data/warehouses.json', JSON.stringify(warehouseData))
    res.status(204).send(`warehouse with id ${req.params.warehouseID} was edited`)
}

module.exports = {
    addWarehouse,
    deleteWarehouse,
    singleWarehouse,
    index,
    editWarehouse
}
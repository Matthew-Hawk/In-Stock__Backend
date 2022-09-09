// imports
const express = require('express');
const router = express.Router();
// inventory controller
const inventoryController = require("../controllers/inventoryController");

// inventory routes
router.post("/", inventoryController.addInventoryItem);
router.put('/:inventoryId', inventoryController.editInventoryItem)

module.exports = router;
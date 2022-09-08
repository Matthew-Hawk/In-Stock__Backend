// imports
const express = require('express');
const router = express.Router();
// inventory controller
const inventoryController = require("../controllers/inventoryController");

// inventory routes
router.post("/", inventoryController.addInventoryItem);

module.exports = router;
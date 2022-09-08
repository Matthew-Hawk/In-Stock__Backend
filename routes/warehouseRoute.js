// imports
const express = require('express');
const router = express.Router();
// warehouse controller
const warehouseController = require("../controllers/warehouseController");

// warehouse routes
router.post("/", warehouseController.addWarehouse);
router.delete("/:warehouseId", warehouseController.deleteWarehouse);

module.exports = router;
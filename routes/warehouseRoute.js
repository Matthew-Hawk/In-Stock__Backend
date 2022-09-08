// imports
const express = require('express');
const router = express.Router();
// warehouse controller
const warehouseController = require("../controllers/warehouseController");

// warehouse routes
//root endpoint
router
    .route("/")
    .get(warehouseController.index)
    .post(warehouseController.addWarehouse);

// /:warehouseId endpoint
router
    .route("/:warehouseId")
    .delete(warehouseController.deleteWarehouse)
    .get(warehouseController.singleWarehouse);

module.exports = router;
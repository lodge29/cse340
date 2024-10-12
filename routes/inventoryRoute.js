// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const invValidate = require('../utilities/inventory-validation');

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// build single detail view
router.get("/detail/:invId", invController.buildSingleVehicle);

// management access route
router.get("/", invController.renderManagementView);
router.get("/add-classification", invController.renderClassificationView);
router.get("/add-inventory", invController.renderInventoryView);

router.post("/add-classification", invValidate.inventoryRules(), invValidate.checkInvData, invController.addClassification);

module.exports = router;
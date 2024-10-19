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
router.get("/add-inventory", invController.renderAddInventoryView);

// display list of classifications in JSON to be edited
router.get('/getInventory/:classification_id', invController.getInventoryJSON);

// 
router.get("/edit/:invId", invController.editInventoryView);

router.post("/update", invController.updateInventory)

// add classification
router.post("/add-classification", invValidate.inventoryRules(), invValidate.checkInvData, invController.addClassification);

// add inventory items to classification
router.post('/add-inventory', invValidate.addInventoryRules(), invValidate.checkAddInvData, invController.addInventory)



module.exports = router;
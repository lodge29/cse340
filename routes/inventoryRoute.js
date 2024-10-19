// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const invValidate = require('../utilities/inventory-validation');
const utilities = require("../utilities/")
const errorController = require("../controllers/errorController")

//error link for testing
router.get('/error', errorController.RenderErrorView)

// build classification view
router.get("/type/:classificationId", 
    utilities.handleErrors(invController.buildByClassificationId));

// build single detail view
router.get("/detail/:invId", 
    utilities.handleErrors(invController.buildSingleVehicle));

// management access route
router.get("/", 
    utilities.handleErrors(invController.renderManagementView));

// view add-classification 
router.get("/add-classification", 
    utilities.handleErrors(invController.renderClassificationView));

// view add-inventory 
router.get("/add-inventory", 
    utilities.handleErrors(invController.renderAddInventoryView));

// display list of classifications in JSON to be edited
router.get('/getInventory/:classification_id', 
    utilities.handleErrors(invController.getInventoryJSON));

// view edit-inventory 
router.get("/edit/:invId", 
    utilities.handleErrors(invController.editInventoryView));

// UPDATE single vehicle details through edit-inventory view
router.post("/update", 
    utilities.handleErrors(invController.updateInventory));

// add classification to list
router.post("/add-classification", 
    invValidate.inventoryRules(), 
    invValidate.checkInvData, 
    utilities.handleErrors(invController.addClassification));

// add single vehicle details to classification
router.post('/add-inventory', 
    invValidate.addInventoryRules(), 
    invValidate.checkAddInvData, 
    utilities.handleErrors(invController.addInventory))



module.exports = router;
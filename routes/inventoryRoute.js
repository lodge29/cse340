// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const detailController = require("../controllers/detailController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// ???
router.get("/detail/:inventoryId", detailController.buildByClassificationId);


module.exports = router;
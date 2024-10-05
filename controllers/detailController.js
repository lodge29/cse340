const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by inventory view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getClassificationById(classification_id)
    const grid = await utilities.buildInventoryGrid(data)
    let nav = await utilities.getNav()
    const className = data
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
    }

module.exports = invCont
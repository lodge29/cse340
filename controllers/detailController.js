// Not using!

const invModel = require("../models/inventory-model")
const utilities = require("../utilities")


const invCont = {}

/* ***************************
 *  Build inventory by inventory view
 * ************************** */
invCont.buildSingleVehicle = async function (req, res, next) {
    const inv_id = req.params.invId
    const data = await invModel.getClassificationById(inv_id)
    const html = await utilities.buildSingleVehicle(data)
    let nav = await utilities.getNav()
    const vehicle = data
    //const className = data[0].classification_id
    res.render("./inventory/singleclassification", {
      title: vehicle + "HELLO",
      nav,
      html,
    })
  }

module.exports = invCont
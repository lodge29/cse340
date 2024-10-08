// week 3
const invModel = require("../models/inventory-model")
const Util = {}



/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + ' details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* **************************************
* Build the single inventory vehicle - DETAIL VIEW
* ************************************ */
// Build the spefic vehicle information view HTML
Util.buildSingleVehicle = async function(data){
  let html 
  if (data) {
  html = '<div id="inv-details-display">'
  const vehicle = data
  let vehicleMiles = vehicle.inv_miles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  html += '<div class="inv-details-img">'
  html += '<img src="' + vehicle.inv_image +'" alt="' + vehicle.inv_make + ' ' + vehicle.inv_model + '">'
  html += '</div>'
  html += '<div class="inv-details">'
  html += '<h1>' + vehicle.inv_make + ' ' + vehicle.inv_model + ' Details</h1>'
  html += '<p><strong>Price: $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</strong></p>'
  html += '<p><strong>Description: </strong>' + vehicle.inv_description + '</p>'
  html += '<p><strong>Color: </strong>' + vehicle.inv_color + '</p>'
  html += '<p><strong>Miles: </strong>' + vehicleMiles + '</p>'
  html += '</div>'
  html += '</div>'
}
  return html
}
  

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util
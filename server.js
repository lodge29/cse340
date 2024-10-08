/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")

// week 3
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/index")


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)
 
/*Index route
app.get("/", function(req, res){
  res.render("index", {title: "Home"})
})
*/

// week 3
// error handling added
app.get("/", utilities.handleErrors(baseController.buildHome))
// Inventory routes added
app.use("/inv", inventoryRoute)

/* **********************
* File Not Found Route - must be last route in list
* Place after all routes
* Unit 3, Basic Error Handling Activity
************************/
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page."});
});

/* **********************
*** Exoress Error handler ***
* Place after all other middleware
* Unit 3, basic Error Handling Activity
************************/

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
});

/* *** older replaced by above; comparison only ***
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})
  */

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

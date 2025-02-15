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

// week 4
const session = require("express-session")
const pool = require('./database/')
const accountRoute = require('./routes/accountRoute')
const bodyParser = require("body-parser")

// week 5
const cookieParser = require("cookie-parser")
//const jwt = require('jsonwebtoken');


/* ***********************
 * Middleware
 * ************************/


app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))



// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(utilities.checkJWTTokenGlobally)



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

// week 3
// error handling added
app.get("/", utilities.handleErrors(baseController.buildHome))
// Inventory routes added
app.use("/inv", inventoryRoute)
// account route
app.use("/account", accountRoute)



/* **********************
* File Not Found Route - must be last route in list
* Place after all routes
* Unit 3, Basic Error Handling Activity
************************/
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page."});
});

// errorLink for testing to be used only with /inv/error
app.use('/inv/error', async (err, req, res, next) => {
  let nav = await utilities.getNav()
  //console.error(err.stack);
  res.status(err.status || 500);
  res.render('errors/errorLink', {
    title: 'Server Error',
    nav,
    message: err.message,
    status: err.status || 500,
  });
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

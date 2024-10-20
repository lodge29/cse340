const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const bcrypt = require("bcryptjs")


async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }


  /* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
      errors: null,
    })
  }

  /* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password
  let hashedPassword
  try {
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
   req.flash("notice", "Please check your credentials and try again.")
   res.status(400).render("account/login", {
    title: "Login",
    nav,
    errors: null,
    account_email,
   })
  return
  }
  try {
   if ( await bcrypt.compare(account_password, accountData.account_password) ) {
   delete accountData.account_password
   const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
   if (process.env.NODE_ENV === 'development') {
     res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
     } else {
       res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
     }
   return res.redirect("/account/management")
   }
  } catch (error) {
   return new Error('Access Forbidden')
  }
 }


 /* ****************************************
 *  Logout and return to homepage
 * ************************************ */
async function logout(req, res) {
  try {
    res.clearCookie("jwt")
    return res.redirect("/")
} catch (error) {
  console.error('Error during logout:', error);
  res.status(500).render('errors/error', {
    title: 'Error',
    message: 'An error occurred during logout. Please try again.',
  });
}
}

 /* ****************************************
 *  Management view
 * ************************************ */
  async function buildManagement(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/management", {
      title: "Management",
      nav,
    })
  }

  /* ****************************************
 *  UPDATE view
 * ************************************ */
  async function buildUpdate(req, res, next) {
    const account_id = parseInt(req.params.accountId)
    let nav = await utilities.getNav()
    const data = await accountModel.getAccountById(account_id)
    res.render('account/update', {
      title: "Update Account Information",
      nav,
      errors: null,
      account_firstname: data.account_firstname,
      account_lastname: data.account_lastname,
      account_email: data.account_email,
      account_id: data.account_id
    })
  }


/* ****************************************
 *  UPDATE account information through UPDATE view
 * ************************************ */
async function updateAccountInformation(req, res, next) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_id } = req.body
  const updateResults = await accountModel.updateAccountInformation(
    account_firstname, 
    account_lastname, 
    account_email,
    account_id
  )
  if (updateResults) {
    req.flash(" notice", 'Account updated!')
    res.status(201).render("account/management", {
      title: "Account Management",
      nav,
      errors: null,
    })
  } else {
    const data = await accountModel.getAccountById(account_id)
    req.flash("notice", 'Sorry, the update faild.')
    res.status(501).render("account/update", {
      title: "Update Account Information",
      nav,
      errors: null,
      account_firstname: data.account_firstname,
      account_lastname: data.account_lastname,
      account_email: data.account_email
    })
  }
}


/* ****************************************
 *  UPDATE account password
 * ************************************ */
async function updateAccountPassword(req, res, next) {
  let nav = await utilities.getNav()
  const { account_password, account_id } = req.body

let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(account_password, 10)
  } catch (error) {
    const data = await accountModel.getAccountById(account_id)
    req.flash("notice", 'Sorry, hashing password faild.')
    res.status(500).render("account/update", {
      title: "Update Account Information",
      nav,
      errors: null,
      account_firstname: data.account_firstname,
      account_lastname: data.account_lastname,
      account_email: data.account_email
    })
  }
  const updateResults = await accountModel.updateAccountPassword(
    hashedPassword,
    account_id
  )
  if (updateResults) {
    req.flash("notice", `Password updated!`)
    res.status(201).render("account/management", {
      title: "Account Management",
      nav,
      errors: null,
    })
  } else {
    const data = await accountModel.getAccountById(account_id)
    req.flash("notice", 'Sorry, the password update faild.')
    res.status(501).render("account/update", {
      title: "Update Account Information",
      nav,
      errors: null,
      account_firstname: data.account_firstname,
      account_lastname: data.account_lastname,
      account_email: data.account_email
    })
  }
}


  module.exports = { 
    buildLogin, 
    buildRegister, 
    registerAccount, 
    accountLogin, 
    buildManagement, 
    logout, 
    buildUpdate, 
    updateAccountInformation,
    updateAccountPassword
  }
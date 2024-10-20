const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
      const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'client') RETURNING *"
      return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
      return error.message
    }
  }

  /* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}


/* *****************************
* Get firstname, lastname, email using account_id
* ***************************** */
async function getAccountById (account_id) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email FROM account WHERE account_id = $1',
      [account_id])
      console.log("Query result:", result.rows);
      return result.rows[0]
  } catch (error) {
    return new Error("No matching id found")
  }
}


/* *****************************
* UPDATE account firstname, lastname, email
* ***************************** */
async function updateAccountInformation (
  account_firstname, 
  account_lastname, 
  account_email, 
  account_id
) {
  try {
    const sql =
      "UPDATE public.account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *"
    const data = await pool.query(sql, [
      account_firstname, 
      account_lastname, 
      account_email,
      account_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("update account information error: " + error)
  }
}

/* *****************************
* UPDATE account password
* ***************************** */
async function updateAccountPassword (hashedPassword, account_id) {
  try {
    const sql =
      "UPDATE public.account SET account_password = $1 WHERE account_id = $2 RETURNING account_id, account_password"
    const data = await pool.query(sql, [
      hashedPassword,
      account_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("sql update account password error: " + error)
  }
}


  module.exports = { registerAccount, getAccountByEmail, getAccountById, updateAccountInformation, updateAccountPassword }
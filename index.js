// load environment variables defined in .env
require('dotenv').load()

// set up the server
const express = require('express')
const app = express()

module.exports = app

if (!module.parent) {
  const port = process.env.SERVER_PORT
  app.listen(port, _ => console.log(`Server started on port ${port}`))
}

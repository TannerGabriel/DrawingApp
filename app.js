const express = require('express')

const app = express()

app.use(express.static('public'))

module.exports = app
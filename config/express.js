const express = require('express')
const cors = require('cors')
const compression = require('compression')
const candidatos = require('../src/routes/candidatosRotas')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use('/candidatos', candidatos)

module.exports = app
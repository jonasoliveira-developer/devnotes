const express = require('express')
const router = require('./routes')
const cors = require('cors')
const routes = require('./routes')

const app = express()
require('./connect/db_connection')
app.use(cors())
app.use(express.json())

app.use(routes)


app.listen(3333)


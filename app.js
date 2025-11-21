const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./src/db/sequelize')

const app = express()
const port = 3000

app
    .use(favicon(__dirname+'/favicon.ico'))
    .use(morgan('dev'))
    .use(cors())
    .use(bodyParser.json())

db.initDb()

require('./src/routes/login')(app)
require('./src/routes/getCountriesStats')(app)
require('./src/routes/getCountriesByContinent')(app)
require('./src/routes/getCountriesByContinentName')(app)
require('./src/routes/getTopCountriesByPopulation')(app)
require('./src/routes/getRecentCountries')(app)
require('./src/routes/findAllCountries')(app)
require('./src/routes/findCountryByPk')(app)
require('./src/routes/createCountry')(app)
require('./src/routes/updateCountry')(app)
require('./src/routes/deleteCountry')(app)

app.use(({res}) => {
    const message = 'Unable to find the resource requested! You can try another URL.'
    res.status(404).json({message})
})

app.listen(port, () => {
    console.log(`\nMy API is running on : http://localhost:${port}`)
})
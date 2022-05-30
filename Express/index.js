const express = require('express')

const { sequelize } = require('./models')

const routes = require('./routes/index')

const port = process.env.PORT || 3000
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)


app.listen(port, () => console.log('App running on port ' + port))
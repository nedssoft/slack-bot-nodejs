const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'The app is running...'})
})

app.use('/api', routes);

module.exports = app;
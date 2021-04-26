const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

const routes = require('./app/routes/note.routes');

const port = process.env.PORT || 3000

// create express app
const app = express();

// Connecting to the database
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to Easy Note Application Backend."
    })
})

routes(app);

app.listen(port, () => {
    console.log("Server is listening to port " + port);
})
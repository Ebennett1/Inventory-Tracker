const express = require('express')
const db = require('./models');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');




const app = express()
const port = 3000



// Middleware
app.use(methodOverride('_method')); // Allows using other HTTP methods such as PUT and DELETE
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files


// Ejs setup
app.set('views', path.join(__dirname, 'views'));


// Server listening
app.listen(port, () => {
  console.log(`App Running on port: ${port}`);
});
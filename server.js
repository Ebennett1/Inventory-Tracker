const express = require('express');
const db = require('./models');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

// Middleware
app.use(methodOverride('_method')); // Allows using other HTTP methods such as PUT and DELETE
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files
app.use(expressLayouts);
// Routes
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

// EJS setup
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


// Sample route
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard', body: 'Dashboard content goes here' });
});

app.get('/products', async (req, res, next) => {
  try {
    const products = await db.Product.find();
    console.log(JSON.stringify(products, null, 2)); // Log products in a readable format
    res.render('productList', { title: 'Product List', products: products, body: {} });
  } catch (err) {
    next(err);
  }
});




app.get('/products/add', (req, res) => {
  res.render('productForm', { title: 'Add Product', body: {} }); // Passing an empty object as the body
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server listening
app.listen(port, () => {
  console.log(`App Running on port: ${port}`);
});





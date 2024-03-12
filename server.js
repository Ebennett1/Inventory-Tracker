const express = require('express');
const db = require('./models');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Product = require('./models/product');
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
// Routes
app.use('/api/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);




// EJS setup
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


// Sample route
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard', body: 'Dashboard content goes here' });
});

// Backend route to handle search queries
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q; // Assuming the search query is passed as 'q' parameter
    // Perform search operation in the database based on the query
    const searchResults = await Product.find({ $text: { $search: query } });
    res.render('dashboard', { title: 'Dashboard', searchResults, body: {} }); // Pass search results to the dashboard page
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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




//Next steps 

// display products 
// in said category----- products not rendering
//search bar function--- not getting products back, just dashboard view
// Add Images--- API
// Work on login/registration views and functionality
// CSS
// CheckList

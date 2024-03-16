// Import necessary modules
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const Product = require('./models/product');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const session = require('express-session')
const sessionsController = require('./controllers/sessionsController.js')



const app = express();
const port = process.env.PORT || 3000;

// Import routers
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');






// Middleware
app.use(methodOverride('_method')); // Allows using other HTTP methods such as PUT and DELETE
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files
app.use(
  session({
    secret: process.env.SECRET_KEY, 
    resave: false, 
    saveUninitialized: false 
  })
)
// app.use(isAuthenticated)



// Routes
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/sessions', sessionsController)

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.get('/', (req, res) => {
  res.redirect('sessions/new')
})




// Sample route
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard', body: 'Dashboard', currentUser: req.session.currentUser });
});

// Backend route to handle search queries
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q; // Assuming the search query is passed as 'q' parameter
    // Perform search operation in the database based on the query
    const searchResults = await Product.find({ $text: { $search: query } });
    // Render the searchResults.ejs view with the search results
    res.render('searchResults', { title: 'Search Results', searchResults, body: {}, currentUser: req.session.currentUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// Backend route to fetch image URLs for products
// app.get('/products/:id/images', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const productImages = await productController.fetchProductImages(productId); // Use the function from the product controller
//     res.json(productImages);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server listening
app.listen(port, () => {
  console.log(`App Running on port: ${port}`);
});




// Add Images--- API--- getting img links ---  
// CSS
// CheckList
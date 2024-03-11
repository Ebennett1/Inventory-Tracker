// seedCategories.js

const mongoose = require('mongoose');
const Category = require('./models/category');
const { updateCategoriesWithProducts } = require('./seed');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define random category names
const categoryNames = [
  'Electronics', 'Computers', 'Audio', 'Cameras', 'Wearables',
  'Accessories', 'Gaming', 'Drones', 'Fitness', 'Storage',
  'Peripherals', 'Networking', 'Printers', 'Projectors', 'Office Supplies'
];

// Insert initial categories into the database
async function seedCategories() {
  try {
    await Category.deleteMany(); // Clear existing categories
    const categories = categoryNames.map(name => ({ name }));
    await Category.insertMany(categories); // Insert new categories
    console.log('Categories seeded successfully');

    // Update categories with associated products
    // First, generate random products
    const { generateRandomProducts } = require('./seed'); // Import the function from seed.js
    const products = await generateRandomProducts();
    // Then, update categories with the generated products
    await updateCategoriesWithProducts(products);
  } catch (err) {
    console.error('Error seeding categories:', err);
  } finally {
    mongoose.disconnect(); // Disconnect from MongoDB
  }
}

seedCategories(); // Execute the seedCategories function

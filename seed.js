const mongoose = require('mongoose');
const Product = require('./models/product');
const Category = require('./models/category');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define random product names, descriptions, and categories
const productNames = [
  'Smartphone', 'Laptop', 'Headphones', 'Camera', 'Smartwatch',
  'Tablet', 'Bluetooth Speaker', 'Gaming Console', 'Drone', 'Fitness Tracker',
  'Wireless Earbuds', 'Portable Charger', 'External Hard Drive', 'Monitor',
  'Printer', 'Projector', 'Router', 'Keyboard', 'Mouse', 'Graphics Card'
];

const productDescriptions = [
  'High-quality', 'Durable', 'Sleek design', 'Advanced features', 'Portable',
  'Wireless connectivity', 'Long battery life', 'High-resolution display',
  'Fast performance', 'Easy to use', 'Versatile', 'Compact size', 'Waterproof',
  'Noise-canceling', 'Affordable', 'Energy-efficient', 'Ergonomic design',
  'Expandable storage', 'User-friendly interface', 'Stylish'
];

const productCategories = [
  'Electronics', 'Computers', 'Audio', 'Cameras', 'Wearables',
  'Accessories', 'Gaming', 'Drones', 'Fitness', 'Storage',
  'Peripherals', 'Networking', 'Printers', 'Projectors', 'Office Supplies'
];

// Define function to generate random price
function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Generate random products without duplicates
const generateRandomProducts = async () => {
  const products = [];
  try {
    const categories = await Category.find();
    const generatedNames = new Set(); // Keep track of generated names to avoid duplicates
    while (products.length < 20) { // Generate 20 unique products
      const name = productNames[Math.floor(Math.random() * productNames.length)];
      if (!generatedNames.has(name)) {
        const description = productDescriptions[Math.floor(Math.random() * productDescriptions.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const price = getRandomPrice(10, 1000);
        const quantity = Math.floor(Math.random() * 100) + 1;
        products.push({ name, description, category: category._id, price, quantity });
        generatedNames.add(name);
      }
    }
  } catch (err) {
    console.error('Error generating random products:', err);
  }
  return products;
};


// Reseed the database
const reseedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    // Generate new products
    const products = await generateRandomProducts();
    // Insert new products into the database
    await Product.insertMany(products);
    console.log('Database reseeded successfully.');
  } catch (error) {
    console.error('Error reseeding database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Execute the reseeding function
reseedDatabase();

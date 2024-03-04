// seed.js

const mongoose = require('mongoose');
const Product = require('./models/product');
const Category = require('./models/category');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define random product names
const productNames = [
  'Smartphone', 'Laptop', 'Headphones', 'Camera', 'Smartwatch',
  'Tablet', 'Bluetooth Speaker', 'Gaming Console', 'Drone', 'Fitness Tracker',
  'Wireless Earbuds', 'Portable Charger', 'External Hard Drive', 'Monitor',
  'Printer', 'Projector', 'Router', 'Keyboard', 'Mouse', 'Graphics Card'
];

// Define random product descriptions
const productDescriptions = [
  'High-quality', 'Durable', 'Sleek design', 'Advanced features', 'Portable',
  'Wireless connectivity', 'Long battery life', 'High-resolution display',
  'Fast performance', 'Easy to use', 'Versatile', 'Compact size', 'Waterproof',
  'Noise-canceling', 'Affordable', 'Energy-efficient', 'Ergonomic design',
  'Expandable storage', 'User-friendly interface', 'Stylish'
];

// Define random product categories
const productCategories = [
  'Electronics', 'Computers', 'Audio', 'Cameras', 'Wearables',
  'Accessories', 'Gaming', 'Drones', 'Fitness', 'Storage',
  'Peripherals', 'Networking', 'Printers', 'Projectors', 'Office Supplies'
];

// Define function to generate random price
function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Generate random products
const generateRandomProducts = async () => {
  const products = [];
  for (let i = 1; i <= 20; i++) {
    const name = productNames[Math.floor(Math.random() * productNames.length)];
    const description = productDescriptions[Math.floor(Math.random() * productDescriptions.length)];
    // Fetch a random category from the database
    const category = await Category.findOne().skip(Math.floor(Math.random() * productCategories.length));
    const price = getRandomPrice(10, 1000);
    const quantity = Math.floor(Math.random() * 100) + 1; // Random quantity between 1 and 100
    products.push({ name, description, category: category._id, price, quantity });
  }
  return products;
};

// Insert initial products into the database
const seed = async () => {
  try {
    await Product.deleteMany(); // Clear existing data
    const products = await generateRandomProducts();
    await Product.insertMany(products); // Insert new data
    console.log('Data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.disconnect(); // Disconnect from MongoDB
  }
};

seed(); // Execute the seed function

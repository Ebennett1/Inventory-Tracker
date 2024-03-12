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
    
    // Generate one product for each category
    for (const category of categories) {
      const name = productNames[Math.floor(Math.random() * productNames.length)];
      const description = productDescriptions[Math.floor(Math.random() * productDescriptions.length)];
      const price = getRandomPrice(10, 300);
      const quantity = Math.floor(Math.random() * 100) + 1;
      products.push({ name, description, category: category._id, price, quantity });
      generatedNames.add(name);
      console.log(`Generated product: ${name}, Category: ${category.name}`);
    }

    // Generate additional random products
    while (products.length < 20) { // Generate a total of 20 products
      const name = productNames[Math.floor(Math.random() * productNames.length)];
      if (!generatedNames.has(name)) {
        const description = productDescriptions[Math.floor(Math.random() * productDescriptions.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const price = getRandomPrice(10, 300);
        const quantity = Math.floor(Math.random() * 100) + 1;
        products.push({ name, description, category: category._id, price, quantity });
        generatedNames.add(name);
        console.log(`Generated product: ${name}, Category: ${category.name}`);
      }
    }
  } catch (err) {
    console.error('Error generating random products:', err);
  }
  return products;
};

// Function to update categories with associated products
const updateCategoriesWithProducts = async (products) => {
  try {
    // Retrieve all categories
    const categories = await Category.find();

    // Iterate over each product and update categories
    for (const product of products) {
      // Find the category associated with the product
      const category = await Category.findById(product.category);
      
      // If the category is found, update its products array
      if (category) {
        category.products.push(product._id); // or product.id
        await category.save(); // Save the category with the updated products array
      } else {
        console.error(`Category '${product.category}' not found for product '${product.name}'`);
      }
    }
    console.log('Categories updated with associated products');
  } catch (error) {
    console.error('Error updating categories with associated products:', error);
  }
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

    // Update categories with associated products
    await updateCategoriesWithProducts(products);

    console.log('Database reseeded successfully.');
  } catch (error) {
    console.error('Error reseeding database:', error);
  } finally {
    // Disconnect from MongoDB after all operations are completed
    mongoose.disconnect();
  }
};

// Execute the reseeding function
reseedDatabase();

module.exports = {
  updateCategoriesWithProducts,
  generateRandomProducts
};

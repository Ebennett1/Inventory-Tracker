const mongoose = require('mongoose');
const Category = require('./models/category');
const { updateCategoriesWithProducts } = require('./seed');
require('dotenv').config();

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGODBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Category.deleteMany();
    const categoryNames = ['Electronics', 'Computers', 'Audio', 'Cameras', 'Wearables', 'Accessories', 'Gaming', 'Drones', 'Fitness', 'Storage', 'Peripherals', 'Networking', 'Printers', 'Projectors', 'Office Supplies'];
    const categories = categoryNames.map(name => ({ name }));
    await Category.insertMany(categories);

    console.log('Categories seeded successfully');

    const { generateRandomProducts } = require('./seed');
    const products = await generateRandomProducts();
    await updateCategoriesWithProducts(products);
  } catch (err) {
    console.error('Error seeding categories:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedCategories();

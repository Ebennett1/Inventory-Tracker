const express = require('express')
const db = require('./models');
const app = express()
const port = 3000









// Server listening
app.listen(port, () => {
  console.log(`App Running on port: ${port}`);
});
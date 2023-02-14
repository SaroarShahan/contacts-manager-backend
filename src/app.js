const express = require('express');
require('dotenv').config();

const _PORT = process.env.PORT || 4000;
const app = express();

// Import All the routes here
const contactRoutes = require('./routes/contactRoutes');

// routes
app.use('/api/v1/contacts', contactRoutes);

app.listen(_PORT, () => {
  console.log(`Sever is running at http://localhost:${_PORT}`);
});

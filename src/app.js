const express = require('express');
require('dotenv').config();

const _PORT = process.env.PORT || 4000;
const app = express();

// routes
app.use('/api/v1/contacts', require('./routes/contactRoutes'));

app.listen(_PORT, () => {
  console.log(`Sever is running at http://localhost:${_PORT}`);
});

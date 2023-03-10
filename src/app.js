const express = require('express');
const connectDb = require('./config/dbConnection');
require('dotenv').config();

const _PORT = process.env.PORT || 4000;
const app = express();

const { errorHandler } = require('./middleware/errorHandler');

// middlewares
app.use(express.json());

// routes
app.use('/api/v1/contacts', require('./routes/contactRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use(errorHandler);

app.listen(_PORT, () => {
  console.log(`Sever is running at http://localhost:${_PORT}`);
});
connectDb();

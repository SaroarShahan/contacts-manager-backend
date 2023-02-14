const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connect = await mongoose.set('strictQuery', false).connect(process.env.DB_URL);

    console.log(`Database connected at ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;

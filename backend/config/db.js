const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDb connected: ${conn.connection.host}`.cyan);
  } catch (error) {
    console.log(`error ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;

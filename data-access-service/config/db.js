const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI_SERVICE || 'mongodb://localhost:27017';
    mongoose
        .connect(mongoURI)
        .then(() => console.log("✅ MongoDB Connected to Consumer Service "))
        .catch((err) => console.error("❌ MongoDB Connection Error ", err));

};
  
// Function to get a specific database instance
const getDB = (dbName) => {
    return mongoose.connection.useDb(dbName);
};

module.exports = { connectDB, getDB };

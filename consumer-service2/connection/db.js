const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    const mongoURI = 'mongodb://localhost:27017/consumer-service2' || process.env.MONGO_URI ;
    mongoose
        .connect(mongoURI)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.error("MongoDB Connection Error:", err));
};

module.exports = connectDB;

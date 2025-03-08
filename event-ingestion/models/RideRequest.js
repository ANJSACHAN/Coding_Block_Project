const mongoose = require("mongoose");

const RideRequestSchema = new mongoose.Schema({
  riderId: String,
  driverId: String,
  location: String,
  timestamp: String,
});

module.exports = mongoose.model("RideRequest", RideRequestSchema);

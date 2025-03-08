require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const { KafkaClient, Consumer } = require("kafka-node");
const RideRequest = require("../models/RideRequest.js"); // Import model

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://127.0.0.1:27017/Ride')
.then(()=>{
     console.log("DB Connected");
})
.catch((err)=>{
     console.log(err);
})


const redisClient = redis.createClient({ host: "localhost", port: 6379 });

// Kafka Consumer
const client = new KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new Consumer(client, [{ topic: "ride-requests", partition: 0 }], { autoCommit: true });

consumer.on("message", async (message) => {
  console.log("🚖 Received Ride Request:", message.value);
  const ride = JSON.parse(message.value);

  await RideRequest.create(ride);
  redisClient.setex(`ride-${ride.riderId}`, 3600, JSON.stringify(ride));
});

app.listen(PORT, () => console.log(`🚀 Event Ingestion Service running on port ${PORT}`));

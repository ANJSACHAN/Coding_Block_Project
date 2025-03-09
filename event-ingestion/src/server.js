require("dotenv").config();
const express = require("express");
const { Kafka } = require("kafkajs");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const kafka = new Kafka({
  clientId: "event-ingestion-service",
  brokers: ["localhost:9092"], 
});

const producer = kafka.producer();

const startProducer = async () => {
  await producer.connect();
  console.log("✅ Kafka Producer Connected");
};

startProducer();

app.post("/request-ride", async (req, res) => {
  try {
    const { riderId, pickup, destination } = req.body;

    if (!riderId || !pickup || !destination) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log(riderId , pickup , destination)
    const rideRequest = {
      riderId,
      pickup,
      destination,
      timestamp: new Date().toISOString(),
    };

    await producer.send({
      topic: "ride-requests",
      messages: [{ value: JSON.stringify(rideRequest) }],
    });

    console.log("🚀 Ride Request Sent to Kafka:", rideRequest);
    res.status(200).json({ message: "Ride request sent successfully!", rideRequest });

  } catch (err) {
    console.error("❌ Error sending ride request:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(PORT, () => console.log(`🚀 Event Ingestion Service running on port ${PORT}`));

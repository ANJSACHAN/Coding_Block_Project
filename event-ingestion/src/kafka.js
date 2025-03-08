const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new kafka.Producer(client);

producer.on("ready", () => console.log("Kafka Producer is ready"));
producer.on("error", (err) => console.log(err));

const sendMessage = (topic, message) => {
  producer.send([{ topic, messages: JSON.stringify(message) }], (err, data) => {
    if (err) console.error(err);
  });
};

module.exports = { sendMessage };

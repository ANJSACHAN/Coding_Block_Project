const amqp = require('amqplib');
const saveOrder = require('./services/orderService');
const preprocessOrder = require('./utilites/preprocess');
require('dotenv').config();

const RABBITMQ_URL = 'amqp://localhost' || process.env.RABBITMQ_URL ;

async function consumeOrders() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'orderQueue2';

        await channel.assertQueue(queue, { durable: true });

        channel.consume(queue, async (msg) => {
            try {
                const order = JSON.parse(msg.content.toString());
                const processedOrder = preprocessOrder(order); // Preprocess data
                await saveOrder(processedOrder); // Store in DB
                channel.ack(msg);
            } catch (err) {
                console.error('❌ Error processing order:', err);
                channel.nack(msg, false, false); // Reject message if processing fails
            }
        }, { noAck: false });
 
        console.log('🚀 Consumer Service 2 is running...');
    } catch (err) {
        console.error('❌ RabbitMQ Consumer Error:', err);
    }
}

module.exports = consumeOrders;


// const amqp = require('amqplib');
// const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

// async function consumeOrders() {
//     try {
//         const connection = await amqp.connect(RABBITMQ_URL);
//         const channel = await connection.createChannel();
//         const queue = 'orderQueue1';

//         await channel.assertQueue(queue, { durable: true });
//         channel.consume(queue, (msg) => {
//             const order = JSON.parse(msg.content.toString());
//             console.log('Processing order:', order);
//             channel.ack(msg);
//         }, { noAck: false });
//     } catch (err) {
//         console.error('Error consuming orders:', err);
//     }
// }
// consumeOrders();
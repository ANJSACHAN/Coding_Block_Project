const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

async function publishOrder(order) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'orderQueue3';

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)), { persistent: true });
        
        console.log('🎧 Headphones Order Published:', order);
        setTimeout(() => connection.close(), 500);
    } catch (err) {
        console.error('❌ Error publishing order:', err);
    }
}

setInterval(() => {
    const order = { id: uuidv4(), product: 'Headphones 🎧', quantity: Math.floor(Math.random() * 10) + 1 };
    publishOrder(order);
}, 25000);

module.exports = publishOrder;

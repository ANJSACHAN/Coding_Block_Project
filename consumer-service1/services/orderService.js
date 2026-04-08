const Order = require('../model/orderModel');

const saveOrder = async (order) => {
    try {
        const newOrder = new Order(order);
        await newOrder.save();
        console.log('✅ Order saved:', order);
    } catch (err) {
        console.error('❌ Error saving order:', err);
    }
};

module.exports = saveOrder;

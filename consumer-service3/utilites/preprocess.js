

const preprocessOrder = (order) => {
    if (!order.id || !order.product || !order.quantity) {
        throw new Error('Invalid Order: Missing required fields');
    }

    return {
        id: order.id,
        product: order.product.charAt(0).toUpperCase() + order.product.slice(1), // Capitalize product name
        quantity: order.quantity
    };
};

module.exports = preprocessOrder;

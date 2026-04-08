const { getDB } = require('../config/db');
const redisClient = require('../config/redisClient'); // Import Redis client

const CACHE_EXPIRATION = 300; // Cache expiration time in seconds (5 minutes)

// ✅ Fetch Orders from Consumer Service 1
const getAllOrdersService1 = async () => {
    const cacheKey = 'orders:service1';

    try {
        // Check Redis cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log('✅ Returning cached orders from Service 1');
            return JSON.parse(cachedData);
        }

        // Fetch from MongoDB
        const db = getDB('consumer-service1');
        const OrderModel = db.collection('orders');
        console.log('🔄 Fetching orders from MongoDB (Service 1)');

        const orders = await OrderModel.find({}).toArray();

        // Store data in Redis
        await redisClient.setEx(cacheKey, 300, JSON.stringify(orders));

        return orders;
    } catch (error) {
        console.error('❌ Error fetching orders from Service 1:', error.message);
        return { error: 'Server error fetching Service 1 orders' };
    }
};


// ✅ Fetch Orders from Consumer Service 2
const getAllOrdersService2 = async () => {
    const cacheKey = 'orders:service2';

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        console.log('✅ Returning cached orders from Service 2');
        return JSON.parse(cachedData);
    }

    const db = getDB('consumer-service2');
    const OrderModel = db.collection('orders');
    console.log('🔄 Fetching orders from MongoDB (Service 2)');
    const orders = await OrderModel.find({}).toArray();

    await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(orders));

    return orders;
};

// ✅ Fetch Orders from Consumer Service 3
const getAllOrdersService3 = async () => {
    const cacheKey = 'orders:service3';

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        console.log('✅ Returning cached orders from Service 3');
        return JSON.parse(cachedData);
    }

    const db = getDB('consumer-service3');
    const OrderModel = db.collection('orders');
    console.log('🔄 Fetching orders from MongoDB (Service 3)');
    const orders = await OrderModel.find({}).toArray();

    await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(orders));

    return orders;
};

// ✅ Fetch Orders from Consumer Service 4
const getAllOrdersService4 = async () => {
    const cacheKey = 'orders:service4';

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        console.log('✅ Returning cached orders from Service 4');
        return JSON.parse(cachedData);
    }

    const db = getDB('consumer-service4');
    const OrderModel = db.collection('orders');
    console.log('🔄 Fetching orders from MongoDB (Service 4)');
    const orders = await OrderModel.find({}).toArray();

    await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(orders));

    return orders;
};

// ✅ Fetch Orders from ALL Databases (With Caching)
const getAllOrdersFromAllServices = async () => {
    const cacheKey = 'orders:all';

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        console.log('✅ Returning cached orders from all services');
        return JSON.parse(cachedData);
    }

    console.log('🔄 Fetching orders from all MongoDB services');
    const allOrders = {
        service1: await getAllOrdersService1(),
        service2: await getAllOrdersService2(),
        service3: await getAllOrdersService3(),
        service4: await getAllOrdersService4()
    };

    // Cache the combined response
    await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(allOrders));

    return allOrders;
};

module.exports = {
    getAllOrdersService1,
    getAllOrdersService2,
    getAllOrdersService3,
    getAllOrdersService4,
    getAllOrdersFromAllServices
};

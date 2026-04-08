const express = require('express');
const {
    getAllOrdersService1,
    getAllOrdersService2,
    getAllOrdersService3,
    getAllOrdersService4,
    getAllOrdersFromAllServices
} = require('../services/orderService');
const { Logger } = require('winston');

const router = express.Router();

// ✅ Route 1: Get Orders from Consumer Service 1
router.get('/orders/service1', async (req, res) => {
    try {
        // console.log('Getting orders from Service 1 try'); 
        // Logger.info('Getting orders from Service 1');
        console.log('Getting orders from Service 1');
        const orders = await getAllOrdersService1();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching Service 1 orders' });
    }
});

// ✅ Route 2: Get Orders from Consumer Service 2
router.get('/orders/service2', async (req, res) => {
    try {
        const orders = await getAllOrdersService2();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching Service 2 orders' });
    }
});

// ✅ Route 3: Get Orders from Consumer Service 3
router.get('/orders/service3', async (req, res) => {
    try {
        const orders = await getAllOrdersService3();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching Service 3 orders' });
    }
});

// ✅ Route 4: Get Orders from Consumer Service 4
router.get('/orders/service4', async (req, res) => {
    try {
        const orders = await getAllOrdersService4();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching Service 4 orders' });
    }
});

// ✅ Route 5: Get All Orders from All Databases
router.get('/orders/all', async (req, res) => {
    try {
        const allOrders = await getAllOrdersFromAllServices();
        res.json(allOrders);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching all orders' });
    }
});

module.exports = router;

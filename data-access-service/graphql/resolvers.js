const axios = require('axios');

const BASE_API_URL = 'http://localhost:5000/api/orders/all'; // Existing API

const resolvers = {
    ordersByService: async ({ service }) => {
        try {
            const response = await axios.get(BASE_API_URL);
            return response.data[service] || []; // Return orders for the requested service
        } catch (error) {
            console.error(`Error fetching orders for ${service}:`, error);
            return [];
        }
    },

    allOrders: async () => {
        try {
            const response = await axios.get(BASE_API_URL);
            return Object.keys(response.data).map(service => ({
                service,
                orders: response.data[service]
            }));
        } catch (error) {
            console.error("Error fetching all orders:", error);
            return [];
        }
    }
};

module.exports = resolvers;

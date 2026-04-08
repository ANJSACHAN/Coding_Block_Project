const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Order {
        id: ID!
        product: String!
        quantity: Int!
        createdAt: String!
    }

    type ServiceOrders {
        service: String!
        orders: [Order]
    }

    type Query {
        ordersByService(service: String!): [Order]
        allOrders: [ServiceOrders]
    }
`);

module.exports = schema;

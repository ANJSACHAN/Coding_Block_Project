const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const ordersRoute = require('./routes/Order');
const responseTIme = require('response-time');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const client = require('prom-client');
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");

const app = express();
const PORT = process.env.PORT || 5000;

// Create a logger for the application
const options = {
    
    transports: [
      new LokiTransport({
        host: "http://127.0.0.1:3100"
      })
    ]   
  }; 
const logger = createLogger(options);
// logger.info("Data Access Service is running...");
//collect server mtric(internal details)
const collectDefaultMetrics = client.collectDefaultMetrics;


//get data from server and throw it to endpoin
collectDefaultMetrics({register: client.register});

app.get('/metrics',async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});

const reqResTime = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'statusCode'],
    buckets: [1, 2, 3, 4, 5, 10, 100, 500, 1000, 2000]
});

app.use(responseTIme((req, res, time) => {
    reqResTime
        .labels({
            method:req.method, 
            route: req.url, 
            statusCode: res.statusCode})
        .observe(time);
}));

// Establish a single MongoDB connection
connectDB();

app.use(cors());
app.use(express.json()); 
app.use('/api', ordersRoute);

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true // Enables GraphiQL for easy testing
}));


app.get('/', (req, res) => {
    res.send('Data Access Service is Running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

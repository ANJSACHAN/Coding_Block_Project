const express = require('express');
const dotenv = require('dotenv');
const client = require('prom-client');


require('./producer');
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3003;


//collect server mtric(internal details)
const collectDefaultMetrics = client.collectDefaultMetrics;


//get data from server and throw it to endpoin
collectDefaultMetrics({register: client.register});


app.get('/metrics',async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});
app.listen(PORT, () => console.log(`Producer Service 1 running on port ${PORT}`));

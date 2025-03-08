const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Service Running in 3001"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Service running on port ${PORT}`));

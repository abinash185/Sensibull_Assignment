const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/order-routes");
const cors = require("cors");
const app = express();

// Middlewares
const PORT = process.env.PORT || 5000;
console.log("PORT",PORT);
app.use(express.json());
app.use(cors());

app.use("/order-service", router); // localhost:5000

mongoose
  .connect(
    "mongodb://abinash185:abinash185@ac-m1t6ht5-shard-00-00.4l3c9gx.mongodb.net:27017,ac-m1t6ht5-shard-00-01.4l3c9gx.mongodb.net:27017,ac-m1t6ht5-shard-00-02.4l3c9gx.mongodb.net:27017/?ssl=true&replicaSet=atlas-vng6wl-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(PORT);
  })


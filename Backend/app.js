const express = require("express");
const app = express();
const plant = require('./routes/plant')
app.use(express.json());
const errorMiddleware = require("./middlewares/error");

app.use("/api/v1",plant)
app.use(errorMiddleware);

module.exports = app;

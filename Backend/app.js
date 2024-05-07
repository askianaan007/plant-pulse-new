const express = require("express");
const app = express();
const plant = require("./routes/plant");
const auth = require("./routes/auth");
app.use(express.json());
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", plant);
app.use("/api/v1", auth);

app.use(errorMiddleware);

module.exports = app;

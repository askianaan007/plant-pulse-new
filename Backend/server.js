const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db');
const path = require('path');
const colors = require("colors");

dotenv.config({path:path.join(__dirname, './config/config.env')})

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
      .bgGreen.white
  );
});


process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});
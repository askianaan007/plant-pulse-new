const mongoose = require("mongoose");
const colors = require("colors");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`.bgCyan
          .white
      );
    })

    .catch((err) => {
      console.log(`error in connection db ${err}`.bgRed.white);
      process.exit(1);
    });
};

module.exports = connectDatabase;

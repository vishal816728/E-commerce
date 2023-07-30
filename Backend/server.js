const app = require("./app");
require("dotenv").config();
const mongoDB = require("./config/Mongo/DB");
// const client = require("./config/DB/redis");

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(`server is closing due to unhandled uncaught Exceptions`);
  process.exit(1);
});

mongoDB(process.env.MONGO_URI);

const server = app.listen(process.env.PORT, () => {
  console.log(`server is listening on ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`message: ${err}`);
  console.log("process is exiting due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});

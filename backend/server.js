/**
 * This is server file which imports neccessary file and sets our server up.
 * This file connects to our database, and sets port which will be used for the server.
 */

const app = require("./app.js");
const dotenv = require("dotenv");
const connectDB = require("./database/database.js");

// uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);

  server.close(() => {
    process.exit(1);
  });
});

// dotenv config
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDB();

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started at https://localhost:${process.env.PORT}`)
);

// unhandled Promise rejection error handling
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandles promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

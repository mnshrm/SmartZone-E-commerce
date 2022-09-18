/**
 * This is server file which imports neccessary file and sets our server up.
 * This file connects to our database, and sets port which will be used for the server.
 */

const app = require("./app.js");
const dotenv = require("dotenv");
const connectDB = require("./database/database.js");

// dotenv config
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Server started at https://localhost:${process.env.PORT}`)
);

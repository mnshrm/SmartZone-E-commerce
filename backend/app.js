/**
 * All configurations of express app resides in this file
 * Configurations like which route file to use for a particular route resides in this file.
 */

const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error.js");
app.use(express.json());

// Router imports
const productRouter = require("./routes/productRoute.js");

app.use("/api/v1", productRouter);

// Middleware for error

app.use(errorMiddleWare);

module.exports = app;

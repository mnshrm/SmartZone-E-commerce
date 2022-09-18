const ErrorHandler = require("../utils/errorHandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (err.message === "Cast error") {
    const message = `Resource not found. Invalid_id : ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  res
    .status(err.statusCode)
    .json({ success: false, message: err.message, error: err.stack });
};

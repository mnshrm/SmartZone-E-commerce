const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorHandler");

/**
 * @param
 */
exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler("Please log in before accessing this resource", 403)
    );
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

/**
 * @Description Checks if user can access a resource or not based on user role
 * @param  {...any} roles
 * @returns function to be executed
 */
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`
        )
      );
    }

    next();
  };
};

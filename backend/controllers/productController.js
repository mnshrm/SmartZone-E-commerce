const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
// Create product --Admin

exports.createProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
});

// Get products -- All

exports.getAllProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
});

//Update Product --Admin

exports.updateProduct = catchAsyncError(async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({ success: "true", product });
  } else res.status(500).json({ message: "Invalid id" });
});

//Delete Product --Admin

exports.deleteProduct = catchAsyncError(async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    } else {
      product = await Product.deleteOne({ _id: req.params.id });

      res.status(500).json({ success: true, product });
    }
  } else res.status(500).json({ message: "Invalid id" });
});

// Get product details

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

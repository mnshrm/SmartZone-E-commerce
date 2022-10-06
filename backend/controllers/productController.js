const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");
// Create product --Admin

exports.createProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
});

// Get products -- All

exports.getAllProducts = catchAsyncError(async (req, res) => {
  // productPerPage tells how many products are to be listed on a single page
  const productPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productPerPage);

  const products = await apiFeature.query;

  res.status(200).json({ success: true, products, productCount });
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

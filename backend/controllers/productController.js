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

exports.updateProduct = catchAsyncError(async (req, res, next) => {
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

// Create New review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const productReview = {
    user: req.user.id,
    name: req.user.name,
    rating,
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product with given id does not exist", 404));
  }
  const isReviewed = product.reviews.find((rev) => {
    return rev.user.toString() === req.user.id.toString();
  });

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id) {
        rev.rating = Number(rating);
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(productReview);
    product.numOfReviews++;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings =
    avg / (product.reviews.length === 0 ? 1 : product.reviews.length);

  await product.save({ runValidators: false });

  res.status(200).json({
    success: true,
    message: "Product review added",
  });
});

// Get all reviews

/**
 * Requires product id
 */

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const productId = req.query.productId;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product with given id does not exist", 404));
  }

  const productReviews = product.reviews;
  const productRating = product.ratings;

  res.status(200).json({
    success: true,
    productReviews,
    productRating,
  });
});

// Delete a review
/**
 *
 */
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const productId = req.query.productId;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product with given id does not exist", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev.id.toString() != req.query.reviewId.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / (reviews.length === 0 ? 1 : reviews.length);

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

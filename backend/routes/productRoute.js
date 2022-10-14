const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/product").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticated, authorizeRole("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRole("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticated, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteReview);

module.exports = router;

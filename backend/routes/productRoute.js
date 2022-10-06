const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/product").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticated, authorizeRole("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRole("admin"), deleteProduct)
  .get(getProductDetails);

module.exports = router;

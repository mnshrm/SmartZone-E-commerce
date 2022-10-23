const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticated, authorizeRole("admin"), getSingleOrder);
router.route("/orders/me").get(isAuthenticated, getMyOrder);
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRole("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRole("admin"), deleteOrder);

module.exports = router;

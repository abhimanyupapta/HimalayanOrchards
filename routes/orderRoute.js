const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const isAuth = require("../middleware/auth");

router
  .route("/order/new")
  .post(isAuth.isAuthenticated, orderController.newOrder);

router
  .route("/order/:id")
  .get(isAuth.isAuthenticated, orderController.getSingleOrder);

router
  .route("/orders/me")
  .get(isAuth.isAuthenticated, orderController.myOrders);

router
  .route("/admin/orders")
  .get(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    orderController.getAllOrders
  );

router
  .route("/admin/order/:id")
  .put(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    orderController.updateOrder
  )
  .delete(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    orderController.deleteOrder
  );

module.exports = router;

const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const paymentControllers = require("../controllers/paymentControllers");

router
  .route("/payment/process")
  .post(isAuth.isAuthenticated, paymentControllers.processPayment);

router
  .route("/stripeapikey")
  .get(isAuth.isAuthenticated, paymentControllers.sendStripeApiKey);

module.exports = router;

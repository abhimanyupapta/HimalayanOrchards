const express = require("express");
const productController = require("../controllers/productController");
const isAuth = require("../middleware/auth");

const router = express.Router();

//get products
router.route("/products").get(productController.getAllProducts);

router
  .route("/admin/products")
  .get(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    productController.getAdminProducts
  );

//create product
router.post(
  "/admin/product/new",
  isAuth.isAuthenticated,
  isAuth.authorizeRoles("admin"),
  productController.createProduct
);

//update, delete, details product
router
  .route("/admin/product/:id")
  .put(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    productController.updateProduct
  )
  .delete(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    productController.deleteProduct
  );

router.route("/product/:id").get(productController.getProductDetails);

router
  .route("/review")
  .put(isAuth.isAuthenticated, productController.createProductReview);

router
  .route("/reviews")
  .get(productController.getProductReviews)
  .delete(isAuth.isAuthenticated, productController.deleteReview);

module.exports = router;

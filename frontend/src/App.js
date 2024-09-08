import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";

import LoginSignUp from "./component/user/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/user/Profile.js";
import { Navigate } from "react-router-dom";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword.js";
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/user/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSucess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import NotFound from "./component/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  //for protected route
  function ProtectedRoute({ isAdmin, children, redirectTo }) {
    if (isAuthenticated === false) {
      return <Navigate to={redirectTo} />;
    }
    if (isAdmin == true && user.role !== "admin") {
      return <Navigate to={redirectTo} />;
    }

    return children;
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
       
        {/* protected routes */}
        <Route
          exact
          path="/account"
          element={
            <ProtectedRoute redirectTo="/login">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <ProtectedRoute redirectTo="/login">
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute redirectTo="/login">
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route
          exact
          path="/Cart"
          element={
            <ProtectedRoute redirectTo="/login">
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute redirectTo="/login">
              <Shipping />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/process/payment"
          element={
            <ProtectedRoute redirectTo="/login">
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )}
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/success"
          element={
            <ProtectedRoute redirectTo="/login">
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute redirectTo="/login">
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute redirectTo="/login">
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/:id"
          element={
            <ProtectedRoute redirectTo="/login">
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true} redirectTo="/login">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true} redirectTo="/login">
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true} redirectTo="/login">
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true} redirectTo="/login">
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true} redirectTo="/login">
              <ProcessOrder />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true} redirectTo="/login">
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true} redirectTo="/login">
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true} redirectTo="/login">
              <ProductReviews />
            </ProtectedRoute>
          }
        />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

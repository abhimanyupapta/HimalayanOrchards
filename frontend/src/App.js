import "./App.css";

import { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Loader from "./component/layout/Loader/Loader.js";

import "./component/layout/Header/Header.css";
import "./component/Home/Home.css";
import "./component/Product/Products.css";
import "./component/Product/ProductDetails.css";

const Header = lazy(() => import("./component/layout/Header/Header.js"));
const Footer = lazy (() => import("./component/layout/Footer/Footer.js"));
const UserOptions = lazy(() => import("./component/layout/Header/UserOptions.js"));
const Home = lazy(() => import("./component/Home/Home.js"));
const ProductDetails = lazy(() => import("./component/Product/ProductDetails.js"));
const Products = lazy(() => import("./component/Product/Products.js"));
const LoginSignUp = lazy(() => import("./component/user/LoginSignUp"));
const Profile = lazy(() => import("./component/user/Profile.js"));
const UpdateProfile = lazy(() => import("./component/user/UpdateProfile"));
const UpdatePassword = lazy(() => import("./component/user/UpdatePassword.js"));
const ForgotPassword = lazy(() => import("./component/user/ForgotPassword.js"));
const ResetPassword = lazy(() => import("./component/user/ResetPassword.js"));
const Cart = lazy(() => import("./component/Cart/Cart.js"));
const Shipping = lazy(() => import("./component/Cart/Shipping.js"));
const ConfirmOrder = lazy(() => import("./component/Cart/ConfirmOrder.js"));
const Payment = lazy(() => import("./component/Cart/Payment.js"));
const OrderSuccess = lazy(() => import("./component/Cart/OrderSucess"));
const MyOrders = lazy(() => import("./component/Order/MyOrders"));
const OrderDetails = lazy(() => import("./component/Order/OrderDetails"));
const Dashboard = lazy(() => import("./component/admin/Dashboard.js"));
const ProductList = lazy(() => import("./component/admin/ProductList"));
const NewProduct = lazy(() => import("./component/admin/NewProduct"));
const OrderList = lazy(() => import("./component/admin/OrderList"));
const ProcessOrder = lazy(() => import("./component/admin/ProcessOrder"));
const UsersList = lazy(() => import("./component/admin/UsersList"));
const UpdateUser = lazy(() => import("./component/admin/UpdateUser"));
const ProductReviews = lazy(() => import("./component/admin/ProductReviews"));
const NotFound = lazy(() => import("./component/layout/NotFound/NotFound"));
const Contact = lazy(() => import("./component/admin/Contact"));

function ProtectedRoute({ isAdmin, children, redirectTo }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }
  if (isAdmin && (!user || user.role !== "admin")) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/stripeapikey`);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Failed to fetch Stripe API Key:", error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getStripeApiKey();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto", "Droid Sans", "Chilanka"] },
    });

    store.dispatch(loadUser());
  },[])

  return (
    <Router>
      <Suspense fallback={<Loader />}>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />

          {/* Protected Routes */}
          <Route path="/account" element={<ProtectedRoute redirectTo="/login"><Profile /></ProtectedRoute>} />
          <Route path="/me/update" element={<ProtectedRoute redirectTo="/login"><UpdateProfile /></ProtectedRoute>} />
          <Route path="/password/update" element={<ProtectedRoute redirectTo="/login"><UpdatePassword /></ProtectedRoute>} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<ProtectedRoute redirectTo="/login"><Cart /></ProtectedRoute>} />
          <Route path="/shipping" element={<ProtectedRoute redirectTo="/login"><Shipping /></ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute redirectTo="/login"><ConfirmOrder /></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute redirectTo="/login"><OrderDetails /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute redirectTo="/login"><MyOrders /></ProtectedRoute>} />
          {stripeApiKey && <Route path="/process/payment" element={<ProtectedRoute redirectTo="/login"><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>} />}
          <Route path="/success" element={<ProtectedRoute redirectTo="/login"><OrderSuccess /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin redirectTo="/login"><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute isAdmin redirectTo="/login"><ProductList /></ProtectedRoute>} />
          <Route path="/admin/product" element={<ProtectedRoute isAdmin redirectTo="/login"><NewProduct /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute isAdmin redirectTo="/login"><OrderList /></ProtectedRoute>} />
          <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin redirectTo="/login"><ProcessOrder /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute isAdmin redirectTo="/login"><UsersList /></ProtectedRoute>} />
          <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin redirectTo="/login"><UpdateUser /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute isAdmin redirectTo="/login"><ProductReviews /></ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute isAdmin redirectTo="/login"><Contact /></ProtectedRoute>} />

          {/* Other Routes */}
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
     </Router>
  );
}

export default App;

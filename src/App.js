import "./App.css";
import "./component/layout/Header/Header.css";
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

// Lazy loading components
const Header = lazy(() => import("./component/layout/Header/Header.js"));
const Footer = lazy(() => import("./component/layout/Footer/Footer"));
const Home = lazy(() => import("./component/Home/Home.js"));
const ProductDetails = lazy(() => import("./component/Product/ProductDetails.js"));
const Products = lazy(() => import("./component/Product/Products.js"));
const LoginSignUp = lazy(() => import("./component/user/LoginSignUp"));
const UserOptions = lazy(() => import("./component/layout/Header/UserOptions.js"));
const Cart = lazy(() => import("./component/Cart/Cart.js"));
const Shipping = lazy(() => import("./component/Cart/Shipping.js"));
const ConfirmOrder = lazy(() => import("./component/Cart/ConfirmOrder.js"));
const Payment = lazy(() => import("./component/Cart/Payment.js"));
const MyOrders = lazy(() => import("./component/Order/MyOrders"));
const OrderDetails = lazy(() => import("./component/Order/OrderDetails"));
const Dashboard = lazy(() => import("./component/admin/Dashboard.js"));
const ProductList = lazy(() => import("./component/admin/ProductList"));
const NewProduct = lazy(() => import("./component/admin/NewProduct"));
const NotFound = lazy(() => import("./component/layout/NotFound/NotFound"));

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
    WebFont.load({
      google: { families: ["Roboto", "Droid Sans", "Chilanka"] },
    });

    store.dispatch(loadUser());

    if (isAuthenticated) {
      getStripeApiKey();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/cart" element={<ProtectedRoute redirectTo="/login"><Cart /></ProtectedRoute>} />
          <Route exact path="/shipping" element={<ProtectedRoute redirectTo="/login"><Shipping /></ProtectedRoute>} />
          <Route exact path="/order/confirm" element={<ProtectedRoute redirectTo="/login"><ConfirmOrder /></ProtectedRoute>} />
          <Route exact path="/order/:id" element={<ProtectedRoute redirectTo="/login"><OrderDetails /></ProtectedRoute>} />
          <Route exact path="/orders" element={<ProtectedRoute redirectTo="/login"><MyOrders /></ProtectedRoute>} />
          {stripeApiKey && <Route exact path="/process/payment" element={<ProtectedRoute redirectTo="/login"><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>} />}
          <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} redirectTo="/login"><Dashboard /></ProtectedRoute>} />
          <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true} redirectTo="/login"><ProductList /></ProtectedRoute>} />
          <Route exact path="/admin/product" element={<ProtectedRoute isAdmin={true} redirectTo="/login"><NewProduct /></ProtectedRoute>} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
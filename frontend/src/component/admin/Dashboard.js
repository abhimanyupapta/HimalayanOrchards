import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import Footer from "../layout/Footer/Footer.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  let totalProducts = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
      totalProducts += 1;
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  let totalUsers = 0;

  users &&
    users.forEach((u) => {
      totalUsers += 1;
    });

  return (
    
    <div className="dashboard">
      <MetaData title={`Dashboard`} />
      <Sidebar className="sidebar" />
      <div className="dashboard-right">
        <div className="card">
          <h1>Gross Sale</h1>
          <p>₹{totalAmount}</p>
        </div>
        <div className="card">
          <h1>Total Out of Stock Products</h1>
          <p>{outOfStock}</p>
        </div>
        <div className="card">
          <h1>Total No. Of Products</h1>
          <p>{totalProducts}</p>
        </div>
        <div className="card">
          <h1>Total No. Of Users</h1>
          <p>{totalUsers}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;

import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct,clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Himalayan Orchards" />
          <div className="banner">
            <h1>Welcome to Himalayan Orchards</h1>
            <p>Here’s To Those Who Work In Acres, Not In Hours</p>
            <a href="#prod">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <div classname = "prod" id = "prod">
          <h2 className="homeHeading">Our Products</h2>

          <div className="container" id="container">
            {products &&
              products.slice(0,8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
         
          </div>
          <h2 className="Prod-Btn" onClick={() => handleNavigation("/Products")}>More</h2>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

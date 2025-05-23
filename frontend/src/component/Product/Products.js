import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";

const categories = [
  "All",
  "Apples",
  "Apple Products",
  "Cheries",
  "Other Fruits",
  "Vegetables"
];

const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(category === "All") {
      setCategory("");
    } 

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, category, alert, error]);


const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

const sliderHandler = () => {
  dispatch(getProduct(keyword, currentPage, price, category, ratings));
};  
  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        products && products.length > 0 ? (
        <Fragment>
          <MetaData title="PRODUCTS" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              onChangeCommitted={sliderHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={5000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                onChangeCommitted={sliderHandler}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
         
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          
        </Fragment>
      ): (<>
      <h2 className="productsHeading">No Products Found</h2>
        <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              onChangeCommitted={sliderHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={5000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                onChangeCommitted={sliderHandler}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          </>
      ))}
    </Fragment>
  )};

export default Products;

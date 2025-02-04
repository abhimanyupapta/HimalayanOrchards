import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo.jpg";
import {
  MdOutlineAccountCircle,
  MdOutlineAddShoppingCart,
  MdOutlineShoppingBag,
  MdSearch,
  MdMenu,
  MdClose
} from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className={`menu-icon ${isMenuOpen ? "open" : "close"}`} onClick={toggleMenu}>
      {isMenuOpen ? <MdClose className="icon-transition" size={30} /> : <MdMenu className="icon-transition" size={30} />}
      </div>

      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li onClick={() => handleNavigation("/")}>
          <div className="home-logo-container">
            <img src={logo} alt="Home" className="nav-icon" />
          </div>
        </li>
        <div className="nav-actions">
          <form onSubmit={searchSubmitHandler} className="search-form">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setKeyword(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <MdSearch size={24} />
            </button>
          </form>
          <li onClick={() => handleNavigation("/Products")}>
            <div className="nav-links-item">
              <MdOutlineShoppingBag size={24} />
            </div>
            <div>Shop</div>
          </li>
          <li onClick={() => handleNavigation("/Account")}>
            <div className="nav-links-item">
              <MdOutlineAccountCircle size={24} />
            </div>
            <div>Account</div>
          </li>
          <li onClick={() => handleNavigation("/Cart")}>
            <div className="nav-links-item">
              <MdOutlineAddShoppingCart size={24} />
            </div>
            <div>Cart</div>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Header;

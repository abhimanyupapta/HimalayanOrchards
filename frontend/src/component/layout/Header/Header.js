import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.jpg";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

const options = {
  burgerColorHover: "#30d173",
  logo,
  logoWidth: "10vmax",
  navColor1: "#faf9f6",
  logoHoverSize: "-1px",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#30d173",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIcon: true,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement: MdAddShoppingCart,
  profileIconColorHover: "#30d173",
  searchIconColorHover: "#30d173",
  cartIconColorHover: "#30d173",
  cartIconMargin: "1vmax",
  link1AnimationTime: 0.25,
  link2AnimationTime: 0.25,
  link3AnimationTime: 0.25,
  link4AnimationTime: 0.25,
  logoAnimationTime: 0.25,
  searchIconAnimationTime: 0.25,
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;

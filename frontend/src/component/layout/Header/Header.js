import React , {useState} from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../../../images/logo.jpg";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { MdMenu } from "react-icons/md";



const Header = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };
  const [keyword, setKeyword] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      setMenuOpen(false);
    } else {
      navigate("/products");
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
     setMenuOpen(!isMenuOpen);
  };
    return (
      <nav className="navbar">
        <div className="menu-icon" onClick = {toggleMenu}>
          <MdMenu size={30}/>
        </div>
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        
        <li onClick={() => handleNavigation('/')}> <div className="home-logo-container"> <img src={logo} alt="Home" className="nav-icon" /></div> </li>
        <li onClick={() => handleNavigation('/Products')}>Products</li>
        <li onClick={() => handleNavigation('/Contact')}>Contact</li>
        <li onClick={() => handleNavigation('/About')}>About</li>
        <div className="nav-actions">
        <form onSubmit={searchSubmitHandler} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn"><MdSearch size={24}/></button>
        </form>
        <li onClick={() => handleNavigation('/Account')}><MdAccountCircle size={24} /></li>
        <li onClick={() => handleNavigation('/Cart')}><MdAddShoppingCart size={24} /></li>
        </div>
      </ul>
    </nav>
    );
  
};

export default Header;

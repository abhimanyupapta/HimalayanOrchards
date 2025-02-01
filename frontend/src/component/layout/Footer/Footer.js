import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter"></div>

      <div className="midFooter">
        <h1>Himalayan Orchards</h1>
        <p>Fresh from farm</p>

        <p>Copyrights 2021 &copy; himalayan Orchards</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com">Instagram</a>
        <a href="https://www.facebook.com">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;

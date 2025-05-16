import React, { useEffect } from "react";
import { CgPhone } from "react-icons/cg";
import { CgMail } from "react-icons/cg";
import { CgFacebook } from "react-icons/cg";
import { CgInstagram } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { getContactAdmin, clearErrors } from "../../../actions/userAction"; // Import the action
import "./Footer.css";
import { useAlert } from "react-alert";

const Footer = () => {
  const alert = useAlert(); // Initialize alert
  const dispatch = useDispatch(); // Initialize dispatch
  const { loading, error, contact } = useSelector((state) => state.contact);

  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getContactAdmin()); // Dispatch the action to fetch contact details
  }, [dispatch, error, alert]);

  console.log(contact);

  return (
    <footer id="footer">
      <div className="leftFooter">
        <div className="info">
          <CgPhone size={24} style={{ marginRight: "8px" }} />
          <p>{contact?.phone || "Phone"}</p>
        </div>
        <div className="info">
          <CgMail size={24} style={{ marginRight: "8px" }} />
          <p>{contact?.email || "Email"}</p>
        </div>
      </div>

      <div className="midFooter">
        <h1>Himalayan Orchards</h1>
        <p>Fresh from farm</p>
        <p>Copyrights 2021 &copy; Himalayan Orchards</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <div className="socialIcons">
          <a
            href={contact?.facebook || "facebook"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black" }}
          >
            <CgFacebook size={24} style={{ marginRight: "8px" }} />
          </a>
          <a
            href={contact?.instagram || "instagram"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black" }}
          >
            <CgInstagram size={24} style={{ marginLeft: "8px" }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
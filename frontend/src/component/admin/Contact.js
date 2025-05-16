import React, { Fragment, useState } from "react";
import "./contact.css";
import { useDispatch } from "react-redux";
import { postContactDetails, getContactAdmin } from "../../actions/customDataAction";
import { useAlert } from "react-alert";

const Contact = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = { phone, email, facebook, instagram };

    try {
      // Dispatch the action to post contact details
      await dispatch(postContactDetails(contactData));
      alert.success("Contact details updated successfully!");

      // Fetch the updated contact details
      dispatch(getContactAdmin());
    } catch (error) {
      alert.error("Failed to update contact details. Please try again.");
    }
  };

  return (
    <Fragment>
      <div className="contactContainer">
        <form className="contactForm" onSubmit={handleSubmit}>
          <h1>Update Contact Details</h1>

          <div className="contactField">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="contactField">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="contactField">
            <input
              type="text"
              placeholder="Facebook URL"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>

          <div className="contactField">
            <input
              type="text"
              placeholder="Instagram URL"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>

          <button type="submit" className="contactSubmitBtn">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Contact;
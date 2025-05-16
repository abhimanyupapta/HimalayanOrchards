import { 
    ADMIN_CONTACT_REQUEST,
    ADMIN_CONTACT_SUCCESS,
    ADMIN_CONTACT_FAIL,
    POST_CONTACT_REQUEST,
    POST_CONTACT_SUCCESS,
    POST_CONTACT_FAIL,
    CLEAR_ERRORS,
  } from "../constants/customDataConstants";

  
import axios from "axios";


  axios.defaults.withCredentials = true;


  //Admin contacts
export const getContactAdmin = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_CONTACT_REQUEST });
      console.log("getting contact details");
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/contact`);
  
      dispatch({ type: ADMIN_CONTACT_SUCCESS, payload: data.contactDetails });
      console.log(data.contactDetails);
    } catch (error) {
      dispatch({
        type: ADMIN_CONTACT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //Post contact
  export const postContactDetails = (contactData) => async (dispatch) => {
    try {
      dispatch({ type: POST_CONTACT_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/contact`,
        contactData,
        config
      );
  
      dispatch({ type: POST_CONTACT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: POST_CONTACT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
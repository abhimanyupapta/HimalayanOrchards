import { 
    ADMIN_CONTACT_REQUEST,
    ADMIN_CONTACT_SUCCESS,
    ADMIN_CONTACT_FAIL,
    POST_CONTACT_REQUEST,
    POST_CONTACT_SUCCESS,
    POST_CONTACT_FAIL,
    CLEAR_ERRORS,
  } from "../constants/customDataConstants";

export const adminContactReducer = (state = {contact:{}}, action) => {
  switch (action.type) {
    case ADMIN_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false, // Preserve other objects in customData
        contact: action.payload // Update only the contact object
         
      };

    case ADMIN_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// filepath: c:\projects\him_apples_offshore_testing\HimalayanOrchards\frontend\src\reducers\userReducer.js
export const postContactReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case POST_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }

};
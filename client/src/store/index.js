import {} from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const initialState = {
  userLogin: [],
  statusRegister: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_LOGIN":
      return {
        ...state,
        userLogin: action.payload,
      };
    case "STATUS_REGISTER":
      return {
        ...state,
        statusRegister: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(userReducer, applyMiddleware(thunk));

export default store;
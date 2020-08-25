import {} from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const initialState = {
  userLogin: [],
  listRoom: [],
  dataLeaderboard: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_LOGIN":
      return {
        ...state,
        userLogin: action.payload,
      };

    case "SET_ROOM_GAME":
      return {
        ...state,
        listRoom: state.listRoom.concat(action.payload),
      };

    case "DATA_LEADERBOARD":
      return {
        ...state,
        dataLeaderboard: action.payload,
      };

    case "UPDATE_LEADERBOARD":
      return {
        ...state,
        dataLeaderboard: state.dataLeaderboard
          .filter((data) => data.username !== action.payload.username)
          .concat(action.payload),
      };

    default:
      return state;
  }
};

const store = createStore(userReducer, applyMiddleware(thunk));

export default store;

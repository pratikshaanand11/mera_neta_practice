import { LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from "../actions/actionsTypes";

const initialState = {
  userInfo: {},
  error: {},
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_FAIL:
      return {
        ...state,
        // userInfo: action.payload,
        error: action.error,
      };
    case LOGIN_USER_SUCCESS:
      console.log("reducer payload", action.payload);
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;

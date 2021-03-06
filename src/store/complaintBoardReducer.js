import {
  GETALLCOMPLAINT_REQUEST,
  GETALLCOMPLAINT_SUCCESS,
  GETALLCOMPLAINT_FAIL,
  DELETE_USER,
  ADD_USER,
  SINGLE_USER,
  UPDATE_USER,
  SEARCH_USER,
} from "./actions/actionsTypes";

const initialState = {
  loading: false,
  allComplaint: [],
  user: {},
  error: [],
};

export const getAllComplaintReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCOMPLAINT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GETALLCOMPLAINT_SUCCESS:
      return {
        ...state,
        loading: false,
        allComplaint: action.payload,
      };
    case GETALLCOMPLAINT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        loading: false,
        allComplaint: action.payload,
      };
    case SINGLE_USER:
      // console.log("action of edit user", action.payload);
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case UPDATE_USER:
      // console.log(state.allComplaint);
      return state;

    case SEARCH_USER:
      console.log("action of search user", action.payload);
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

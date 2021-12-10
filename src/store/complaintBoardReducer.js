import {
  GETALLCOMPLAINT_REQUEST,
  GETALLCOMPLAINT_SUCCESS,
  GETALLCOMPLAINT_FAIL,
} from "./actions/actionsTypes";

const initialState = {
  loading: false,
  allComplaint: [],
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
    default:
      return state;
  }
};

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { getAllComplaintReducer } from "./complaintBoardReducer";
import loginReducer from "./reducer/loginReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  complaint: getAllComplaintReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

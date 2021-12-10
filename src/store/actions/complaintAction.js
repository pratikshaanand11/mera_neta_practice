import axios from "axios";
import {
  GETALLCOMPLAINT_FAIL,
  GETALLCOMPLAINT_REQUEST,
  GETALLCOMPLAINT_SUCCESS,
} from "./actionsTypes";
const getAllComplaint = (dispatch) => {
  const token = localStorage.getItem("token");
  //   console.log("get all complaints", token);

  dispatch({ type: GETALLCOMPLAINT_REQUEST });

  axios
    .post(
      "https://api.1logic.in/complainbox/list/UNSOLVED",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("response==>", res.data);
      dispatch({ type: GETALLCOMPLAINT_SUCCESS, payload: res.data[0] });
    })
    .catch((error) => {
      console.log(error);
      //   console.log("error from reducer");
      dispatch({ type: GETALLCOMPLAINT_FAIL, payload: error });
    });
};

export { getAllComplaint };

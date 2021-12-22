import axios from "axios";
import {
  GETALLCOMPLAINT_FAIL,
  GETALLCOMPLAINT_REQUEST,
  GETALLCOMPLAINT_SUCCESS,
} from "./actionsTypes";

const getAllComplaint = (dispatch) => {
  console.log("get all complaintsssss", dispatch);

  const token = localStorage.getItem("token");

  dispatch({ type: GETALLCOMPLAINT_REQUEST });
  axios
    .post(
      "https://api.digitaloms.in/api/0023//complainbox/list/UNSOLVED",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log("response==>", res.data);
      dispatch({ type: GETALLCOMPLAINT_SUCCESS, payload: res.data[0] });
    })
    .catch((error) => {
      console.log(error);
      //   console.log("error from reducer");
      dispatch({ type: GETALLCOMPLAINT_FAIL, payload: error });
    });
};

export { getAllComplaint };

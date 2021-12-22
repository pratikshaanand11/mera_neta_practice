import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  SINGLE_USER,
} from "../actions/actionsTypes";
import axios from "axios";
import { getAllComplaint } from "./complaintAction";

const userDeleted = () => ({
  type: DELETE_USER,
});

const userAdded = () => ({
  type: ADD_USER,
});

const getUser = () => ({
  type: EDIT_USER,
});

const singleEditUser = () => ({
  type: SINGLE_USER,
});
export const deleteUser = (id, info, a) => {
  return function (dispatch) {
    // console.log("dispatch", dispatch);
    const token = localStorage.getItem("token");
    console.log("get del user token", token);
    console.log("del user info", info);
    axios
      .put(
        `https://api.digitaloms.in/api/0023//complainbox/softDelete/${id}`,
        info,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res for delete user", res);
        // a(userDeleted());
        getAllComplaint(a);
      })
      .catch((err) => console.log("error to delete user", err));
  };
};

export const addUser = (user) => {
  return function (dispatch) {
    const token = localStorage.getItem("token");
    console.log("get add user token", user);
    const body = {
      address: { cityType: null },
      complainer: {
        addressFields: {},
        extraFields: {},
        firstName: user.fname,
        lastName: user.lname,
        gender: "MALE",
        phone: user.contact,
        rationCard: null,
        cast: null,
        subcast: null,
      },
      isDirectEntry: true,
      commentCreatedBy: 1,
      actualComplainDate: "2021-11-30T18:30:00.000Z",
      isAddedByKiosk: false,
      category: {
        id: 2,
        name: "पब्लिक ट्रान्सपोर्ट",
        prefix: "PT",
        createdDate: "2019-12-03T07:07:12.376Z",
        updatedDate: "2019-12-03T07:07:12.376Z",
        createdBy: 0,
        updatedBy: 0,
        types: [
          {
            id: 4,
            name: "नवीन बस साठी निवेदन",
            createdDate: "2019-12-03T07:07:12.406Z",
            updatedDate: "2019-12-03T07:07:12.406Z",
            createdBy: 0,
            updatedBy: 0,
          },
          {
            id: 5,
            name: "गावात बसची नवीन फेरी",
            createdDate: "2019-12-03T07:07:12.406Z",
            updatedDate: "2019-12-03T07:07:12.406Z",
            createdBy: 0,
            updatedBy: 0,
          },
        ],
      },
      type: {
        id: 4,
        name: "नवीन बस साठी निवेदन",
        createdDate: "2019-12-03T07:07:12.406Z",
        updatedDate: "2019-12-03T07:07:12.406Z",
        createdBy: 0,
        updatedBy: 0,
      },
      office: 1,
      karyaKarta: [],
      adhikari: [],
    };
    axios
      .post("https://api.digitaloms.in/api/0023//complainbox", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("res for add user", res);
        // dispatch(userAdded());
        dispatch(getAllComplaint());
      })
      .catch((err) => console.log("error to add user", err));
  };
};

export const editUser = (id) => {
  return function (dispatch) {
    const token = localStorage.getItem("token");
    console.log("edit dispatch", dispatch);
    axios
      .get(`https://api.digitaloms.in/api/0023/complainbox/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res for edit user", res);
        getUser(res.data);
        console.log("response for edit user", res.data);
        // getAllComplaint(a);
      })
      .catch((err) => console.log("error to edit user", err));
  };
};

export const singleUser = (user) => {
  return function (dispatch) {
    const token = localStorage.getItem("token");
    console.log("single user data fetched", user);
    axios
      .post("https://api.1logic.in/complainbox", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("response for edit single user", res);
        dispatch(singleEditUser());
      })
      .catch((err) => console.log("error to edit the single user", err));
  };
};

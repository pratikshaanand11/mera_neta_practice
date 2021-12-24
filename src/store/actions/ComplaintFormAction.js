import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
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

const getUser = (user) => ({
  type: SINGLE_USER,
  payload: user,
});

const userUpdated = () => ({
  type: UPDATE_USER,
});
export const deleteUser = (id, info, a) => {
  return function (dispatch) {
    // console.log("dispatch", dispatch);
    const token = localStorage.getItem("token");
    console.log("get del user token", token);
    console.log("del user info", info);
    axios
      .put(`https://api.1logic.in/complainbox/softDelete/${id}`, info, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
    // console.log("get add user token", token);
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
        dispatch(userAdded());
        dispatch(getAllComplaint());
      })
      .catch((err) => console.log("error to add user", err));
  };
};

export const getSingleUser = (id) => {
  return function (dispatch) {
    console.log("edit dispatch");
    const token = localStorage.getItem("token");
    console.log("edit dispatch", token);
    axios
      .get(`https://api.1logic.in/complainbox/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res for edit user", res);
        dispatch(getUser(res.data));
        // console.log("response for edit user", res.data);
        // getAllComplaint(a);
      })
      .catch((err) => console.log("error to edit user", err));
  };
};

export const updateUser = (user, id) => {
  return function (dispatch) {
    const token = localStorage.getItem("token");
    console.log("single user data fetched", user);
    const body = {
      actualComplainDate: "2021-11-30T18:30:00.000Z",
      address: {
        assembly: null,
        cityType: null,
        createdBy: null,
        createdDate: "2021-12-23T11:24:17.254Z",
        gan_number: null,
        gaon: null,
        gat_number: null,
        id: 36,
        line1: null,
        locality: null,
        pincode: null,
        prabhag: null,
        prabhagArea: null,
        updatedBy: null,
        updatedDate: "2021-12-23T11:24:17.254Z",
        adhikari: [],
        category: {
          createdBy: 0,
          createdDate: "2019-12-03T07:07:12.376Z",
          id: 2,
          name: "पब्लिक ट्रान्सपोर्ट",
          prefix: "PT",
        },
        types: [
          {
            createdBy: 0,
            createdDate: "2019-12-03T07:07:12.406Z",
            id: 4,
            name: "नवीन बस साठी निवेदन",
            updatedBy: 0,
            updatedDate: "2019-12-03T07:07:12.406Z",
          },
          {
            createdBy: 0,
            createdDate: "2019-12-03T07:07:12.406Z",
            id: 5,
            name: "गावात बसची नवीन फेरी",
            updatedBy: 0,
            updatedDate: "2019-12-03T07:07:12.406Z",
            updatedBy: 0,
            updatedDate: "2019-12-03T07:07:12.376Z",
          },
        ],
        complainer: {
          ProfileImage: null,
          aadhar: null,
          acNumber: null,
          address: null,
          addressFields: {},
          address_v1: null,
          age: null,
          alternatePhone: null,
          assembly: null,
          boothName: null,
          boothNumber: null,
          cast: null,
          city: null,
          cityType: null,
          createdBy: null,
          createdDate: "2021-12-23T11:24:17.269Z",
          dob: null,
          drivingLicence: null,
          education: null,
          email: null,
          extraFields: {},
          firstName: user.fname,
          gan_number: null,
          gaon: null,
          gat_number: null,
          gender: "MALE",
          id: 260,
          isVoter: false,
          lastName: user.lname,
          lastName_v1: null,
          localFirstName: null,
          localLastName: null,
          localMiddleName: null,
          middleName: null,
          occupation: null,
          pancard: null,
          partNumber: null,
          phone: "1234567890",
          pincode: null,
          prabhag: null,
          prabhagArea: null,
          rationCard: null,
          rlnType: null,
          role: "VISITOR",
          sectionNumber: null,
          slnNumberInPart: null,
          subcast: null,
          totalVisits: 0,
          uniqueId: "ABC000260",
          updatedBy: null,
          updatedDate: "2021-12-23T11:24:17.000Z",
          vipEntry: false,
          voterID: null,
          ward: null,
          description: null,
          documents: null,
          id: 36,
          isAddedByKiosk: false,
          karyaKarta: [],
          office: 1,
          status: "UNSOLVED",
        },
        type: {
          createdBy: 0,
          createdDate: "2019-12-03T07:07:12.406Z",
          id: 4,
          name: "नवीन बस साठी निवेदन",
          updatedBy: 0,
          updatedDate: "2019-12-03T07:07:12.406Z",
        },
      },
    };
    axios
      .post("https://api.1logic.in/complainbox", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("response for edit single user", res);
        dispatch(userUpdated());
      })
      .catch((err) => console.log("error to edit the single user", err));
  };
};

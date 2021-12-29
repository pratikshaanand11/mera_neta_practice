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
    // const body = {
    //   address: { cityType: null },
    //   description: user.description,
    //   complainer: {
    //     addressFields: {},
    //     extraFields: {},
    //     firstName: user.fname,
    //     lastName: user.lname,
    //     gender: "MALE",
    //     phone: user.phone,
    //     rationCard: null,
    //     cast: null,
    //     subcast: null,
    //   },
    //   isDirectEntry: true,
    //   commentCreatedBy: 1,
    //   actualComplainDate: user.complaintDate,
    //   isAddedByKiosk: false,
    //   category: {
    //     id: 2,
    //     name: user.complaintCategory,
    //     prefix: "PT",
    //     createdDate: user.createdDate,
    //     updatedDate: "2019-12-03T07:07:12.376Z",
    //     createdBy: 0,
    //     updatedBy: 0,
    //     types: [
    //       {
    //         id: 4,
    //         name: user.complaintType,
    //         createdDate: "2019-12-03T07:07:12.406Z",
    //         updatedDate: "2019-12-03T07:07:12.406Z",
    //         createdBy: 0,
    //         updatedBy: 0,
    //       },
    //       {
    //         id: 5,
    //         name: user.complaintType,
    //         createdDate: "2019-12-03T07:07:12.406Z",
    //         updatedDate: "2019-12-03T07:07:12.406Z",
    //         createdBy: 0,
    //         updatedBy: 0,
    //       },
    //     ],
    //   },
    //   type: {
    //     id: 4,
    //     name: user.complaintType,
    //     createdDate: user.createdDate,
    //     updatedDate: "2019-12-03T07:07:12.406Z",
    //     createdBy: 0,
    //     updatedBy: 0,
    //   },
    //   office: 1,
    //   karyaKarta: [{ id: 12 }],

    //   adhikari: [],
    // };\
    const body = {
      address: { cityType: null },
      complainer: {
        addressFields: {},
        extraFields: {},
        firstName: "kajalllllll",
        lastName: "patil",
        gender: "FEMALE",
        phone: "4356789900",
        rationCard: null,
        cast: null,
        subcast: null,
      },
      isDirectEntry: true,
      commentCreatedBy: 1,
      actualComplainDate: "2021-12-06T18:30:00.000Z",
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
        id: 5,
        name: "गावात बसची नवीन फेरी",
        createdDate: "2019-12-03T07:07:12.406Z",
        updatedDate: "2019-12-03T07:07:12.406Z",
        createdBy: 0,
        updatedBy: 0,
      },
      office: 1,
      karyaKarta: [{ id: 12 }, { id: 9 }],
      adhikari: [],
    };
    console.log("karyakarta name", body);
    axios
      .post("https://api.1logic.in/complainbox", body, {
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
    console.log("edit dispatch", id);
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

export const updateUser = (user, updatedUser) => {
  return function (dispatch) {
    const token = localStorage.getItem("token");
    console.log("prv", user);
    console.log("next", updatedUser);
    user.complainer.firstName = updatedUser.fname;
    user.complainer.lastName = updatedUser.lname;
    user.complainer.middleName = updatedUser.mname;
    user.complainer.phone = updatedUser.phone;
    user.category.name = updatedUser.complaintCategory;
    user.type.name = updatedUser.complaintType;
    user.description = updatedUser.description;
    user.karyaKarta.firstName = updatedUser.assignedKaryakarta;

    const body = user;
    console.log("=====>>>>", body);
    // const body = {
    //   id: parseInt(user.id),
    //   description: null,
    //   address: {
    //     id: 57,
    //     locality: null,
    //     pincode: null,
    //     line1: null,
    //     cityType: null,
    //     createdDate: "2021-12-27T10:09:35.765Z",
    //     updatedDate: "2021-12-27T10:09:35.765Z",
    //     createdBy: null,
    //     updatedBy: null,
    //     assembly: null,
    //     gat_number: null,
    //     gan_number: null,
    //     gaon: null,
    //     prabhag: null,
    //     prabhagArea: null,
    //   },
    //   complainer: {
    //     id: 282,
    //     uniqueId: "ABC000282",
    //     firstName: user.fname,
    //     middleName: user.mname,
    //     lastName: user.lname,
    //     phone: user.phone,
    //     alternatePhone: null,
    //     email: null,
    //     dob: null,
    //     pancard: null,
    //     aadhar: null,
    //     voterID: null,
    //     drivingLicence: null,
    //     address: null,
    //     city: null,
    //     cityType: null,
    //     role: "VISITOR",
    //     pincode: null,
    //     gender: "MALE",
    //     rationCard: null,
    //     vipEntry: false,
    //     education: null,
    //     age: null,
    //     occupation: null,
    //     boothNumber: null,
    //     boothName: null,
    //     ward: null,
    //     localFirstName: null,
    //     localMiddleName: null,
    //     localLastName: null,
    //     addressFields: {},
    //     extraFields: {},
    //     totalVisits: 0,
    //     isVoter: false,
    //     acNumber: null,
    //     partNumber: null,
    //     sectionNumber: null,
    //     slnNumberInPart: null,
    //     address_v1: null,
    //     lastName_v1: null,
    //     rlnType: null,
    //     ProfileImage: null,
    //     createdDate: "2021-12-27T10:09:35.782Z",
    //     updatedDate: "2021-12-27T10:09:35.000Z",
    //     createdBy: null,
    //     updatedBy: null,
    //     assembly: null,
    //     cast: null,
    //     subcast: null,
    //     gat_number: null,
    //     gan_number: null,
    //     gaon: null,
    //     prabhag: null,
    //     prabhagArea: null,
    //   },
    //   karyaKarta: [],
    //   category: {
    //     id: 2,
    //     name: user.complaintCategory,
    //     prefix: "PT",
    //     createdDate: user.createdDate,
    //     updatedDate: "2019-12-03T07:07:12.376Z",
    //     createdBy: 0,
    //     updatedBy: 0,
    //     types: [
    //       {
    //         id: 4,
    //         name: user.complaintType,
    //         createdDate: "2019-12-03T07:07:12.406Z",
    //         updatedDate: "2019-12-03T07:07:12.406Z",
    //         createdBy: 0,
    //         updatedBy: 0,
    //       },
    //       {
    //         id: 5,
    //         name: user.complaintType,
    //         createdDate: "2019-12-03T07:07:12.406Z",
    //         updatedDate: "2019-12-03T07:07:12.406Z",
    //         createdBy: 0,
    //         updatedBy: 0,
    //       },
    //     ],
    //   },
    //   type: {
    //     id: 4,
    //     name: user.complaintType,
    //     createdDate: user.createdDate,
    //     updatedDate: "2019-12-03T07:07:12.406Z",
    //     createdBy: 0,
    //     updatedBy: 0,
    //   },
    //   status: "UNSOLVED",
    //   adhikari: [],
    //   documents: null,
    //   actualComplainDate: "2021-12-27T10:12:47.509Z",
    //   isAddedByKiosk: false,
    //   office: 1,
    // };
    console.log("==>>", body);
    axios
      .post("https://api.1logic.in/complainbox", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("response for edit single user", res);
        dispatch(userUpdated());
        dispatch(getAllComplaint());
      })
      .catch((err) => console.log("error to edit the single user", err));
  };
};

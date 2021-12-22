import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, singleUser } from "../store/actions/ComplaintFormAction";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    address: "",
    contact: "",
    complaintCategory: "",
    complaintType: "",
    complaintDate: "",
  });

  const dispatch = useDispatch();
  const {
    fname,
    lname,
    address,
    contact,
    complaintCategory,
    complaintType,
    complaintDate,
  } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
    // console.log("NAme and value of edit", state);
  };
  const allComplaint = useSelector((state) => state.data);

  useEffect(() => {
    console.log("dispppppp", dispatch);
    editUser(id, dispatch);
  }, []);

  useEffect(() => {
    if (allComplaint) {
      setState({ ...allComplaint });
    }
  }, [allComplaint]);

  const handleSubmit = (e, user) => {
    e.preventDefault();
    // dispatch(editUser(state));
    dispatch(singleUser(user, state));
    console.log("user details", user);
    console.log("edit user state", state);
    navigate("/SuperAdminComplaintForm");
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <h3>1.Complainer Detail</h3>
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={handleInputChange}
          name="fname"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={handleInputChange}
          name="lname"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={handleInputChange}
          name="address"
        />
        <input
          type="number"
          placeholder="Phone No."
          value={contact}
          onChange={handleInputChange}
          name="contact"
        />
        <h3>2.Complaint Details</h3>
        <div>
          <textarea
            id=""
            name="description"
            rows="4"
            cols="50"
            placeholder="Description"
          />
        </div>
        <div>
          Actual Complaint Date
          <input
            type="date"
            id=""
            name="complaintDate"
            value={complaintDate}
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          Complaint Category
          <select name="complaintCategory" id="">
            <option></option>
            <option value={complaintCategory}>
              पाणी व्यवस्थापन पाणी व्यवस्थापन
            </option>
            <option value={complaintCategory}>
              पब्लिक ट्रान्सपोर्ट पब्लिक ट्रान्सपोर्ट
            </option>
          </select>
        </div>
        <br />
        <div>
          Complaint Type
          <select name="complaintType" id="">
            <option></option>
            <option value={complaintType}>
              पाणी व्यवस्थापन पाणी व्यवस्थापन
            </option>
            <option value={complaintType}>
              पब्लिक ट्रान्सपोर्ट पब्लिक ट्रान्सपोर्ट
            </option>
          </select>
        </div>
        <br />
        <button type="submit" onChange={handleInputChange}>
          Edit User
        </button>
        <br />
        <button>Go Back</button>
      </form>
    </div>
  );
};

export default EditUser;

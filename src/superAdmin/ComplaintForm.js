import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/actions/ComplaintFormAction";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, singleUser } from "../store/actions/ComplaintFormAction";

const ComplaintForm = () => {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    gender: "",
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
    gender,
    address,
    contact,
    complaintCategory,
    complaintType,
    complaintDate,
  } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    editUser(id, dispatch);
    console.log("dispppppp", dispatch);
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e, user) => {
    e.preventDefault();

    dispatch(addUser(state, user));
    dispatch(singleUser(user, state));
    console.log("user details", user);
    console.log("edit user state", state);
    console.log(state, user);
    navigate("/superAdminComplaintBoard");
  };

  return (
    <div>
      <h1>Super Admin complaint form</h1>
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
        <p>Gender:</p>
        <input
          type="radio"
          value={gender}
          name="gender"
          onChange={handleInputChange}
        />
        Male
        <input
          type="radio"
          name="gender"
          value={gender}
          onChange={handleInputChange}
        />
        Female
        <input
          type="radio"
          name="gender"
          value={gender}
          onChange={handleInputChange}
        />
        Other
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
            onChange={handleInputChange}
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
          <select name="complaintCategory" id="" onChange={handleInputChange}>
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
          <select name="complaintType" id="" onChange={handleInputChange}>
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
          Submit
        </button>
        <br />
        <button>Go Back</button>
      </form>
    </div>
  );
};

export default ComplaintForm;

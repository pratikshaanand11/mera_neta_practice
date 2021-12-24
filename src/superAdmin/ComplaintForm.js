import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/actions/ComplaintFormAction";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateUser,
  getSingleUser,
} from "../store/actions/ComplaintFormAction";

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
  const [name, setFname] = useState(null);
  const [lname, setlname] = useState(null);
  const [gender, setGender] = useState("MALE");
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState("");

  const {
    fname,
    // lname,
    // gender,
    // address,
    // contact,
    complaintCategory,
    complaintType,
    complaintDate,
  } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.complaint);

  useEffect(() => {
    dispatch(getSingleUser(id));
    console.log("dispppppp", id);
  }, []);

  useEffect(() => {
    console.log({ user });
    if (user.id) {
      // setState({ ...user });
      setFname(user.complainer.firstName);
      console.log("name of the user is", user.complainer.firstName);
      setlname(user.complainer.lastName);
      setGender(user.complainer.gender);
      setAddress(user.complainer.address);
      setPhone(user.complainer.phone);
    }
  }, [user]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateUser(state, id));
    } else {
      dispatch(addUser(state));
    }
    console.log("edit user state", state);
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
          value={name}
          onChange={handleInputChange}
          name="name"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setlname(e.target.value)}
          name="lname"
        />
        <p>Gender:</p>
        <input
          type="radio"
          value={gender}
          name="gender"
          onChange={(e) => setGender(e.target.value)}
        />
        Male
        <input
          type="radio"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
        <input
          type="radio"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        Other
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          name="address"
        />
        <input
          type="number"
          placeholder="Phone No."
          // value={contact}
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

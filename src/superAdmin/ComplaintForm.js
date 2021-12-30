import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, searchUser } from "../store/actions/ComplaintFormAction";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateUser,
  getSingleUser,
} from "../store/actions/ComplaintFormAction";
import { DataGrid } from "@material-ui/data-grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, IconButton } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { SearchOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "20rem",
    width: "30rem",
  },
}));

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    // field: "age",
    // headerName: "Age",
    // type: "number",
    // width: 110,
    // editable: true,
  },
  {
    // field: "fullName",
    // headerName: "Full name",
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    // width: 160,
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, "firstName") || ""} ${
    //     params.getValue(params.id, "lastName") || ""
    //   }`,
  },
];

const rows = [
  { id: 1, lastName: "karyakarta", firstName: "sampark", age: 35 },
  { id: 2, lastName: "Test", firstName: "Anuja", age: 42 },
  { id: 3, lastName: "karyakarta", firstName: "demo", age: 45 },
];

const ComplaintForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mname, setMname] = useState("");
  const [phone, setPhone] = useState(null);
  const [complaintCategory, setComplaintCategory] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [complaintDate, setComplaintDate] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [assignedKaryakarta, setAssignedKaryakarta] = useState("");
  const [adhikari, setAdhikari] = useState("");
  const [gender, setGender] = useState("MALE");

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.complaint);

  // useEffect(() => {
  // dispatch(getSingleUser(id));
  // console.log("dispppppp", id);
  // }, [id]);

  useEffect(() => {
    // console.log({ user });
    if (user.id && id) {
      setFname(user.complainer.firstName);
      // console.log("name of the user is", user.complainer.firstName);
      setMname(user.complainer.middleName);
      setLname(user.complainer.lastName);
      setPhone(user.complainer.phone);
      setComplaintCategory(user.category.name);
      setComplaintType(user.type.name);
      setDescription(user.description);
      // setComments();
      setAssignedKaryakarta(user.karyaKarta[0].firstName);
      // setAdhikari(user.adhikari[0].firstName);
    }
  }, [user, id]);
  useEffect(() => {
    console.log({
      // fname,
      // mname,
      // lname,
      // phone,
      // complaintCategory,
      // complaintType,
      // complaintDate,
      // createdDate,
      // description,
      // comments,
      // assignedKaryakarta,
      // adhikari,
    });
  }, [
    fname,
    mname,
    lname,
    phone,
    complaintCategory,
    complaintType,
    complaintDate,
    createdDate,
    description,
    comments,
    assignedKaryakarta,
    adhikari,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fname || lname || phone === "") {
      alert("Please fill the feild");
      return;
    }

    if (id) {
      // console.log("id::::::", id, user);
      const updatedUser = {
        fname,
        mname,
        lname,
        id,
        phone,
        complaintCategory,
        complaintType,
        complaintDate,
        createdDate,
        description,
        comments,
        assignedKaryakarta,
        adhikari,
      };
      dispatch(updateUser(user, updatedUser));
    } else {
      dispatch(
        addUser({
          fname,
          mname,
          lname,
          phone,
          complaintCategory,
          complaintType,
          complaintDate,
          createdDate,
          description,
          comments,
          assignedKaryakarta,
          adhikari,
        })
      );
    }
    navigate("/superAdminComplaintBoard");
  };

  const searchHandler = () => {
    dispatch(searchUser());
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Super Admin complaint form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="button" onClick={handleOpen}>
            Search Voter
          </button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Voter Search</h2>
                <p id="transition-modal-description">
                  <TextField
                    fullWidth
                    id="standard-bare"
                    variant="outlined"
                    placeholder="Firstname"
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <SearchOutlined onClick={() => searchHandler()} />
                        </IconButton>
                      ),
                    }}
                  />
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">FirstName</TableCell>
                        <TableCell>LastName</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableRow>
                      {user[0]?.map((info) => {
                        // console.log("00000", info);
                        return (
                          <div>
                            <TableCell align="right">
                              {info?.firstName}
                            </TableCell>
                            <TableCell>{info?.lastName}</TableCell>
                          </div>
                        );
                      })}
                    </TableRow>
                  </Table>
                </p>
              </div>
            </Fade>
          </Modal>
        </div>
        {/* <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            value={assignedKaryakarta}
            onChange={(e) => setAssignedKaryakarta(e.target.value)}
          />
        </div> */}
        <h3>1.Complainer Detail</h3>
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          name="fname"
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={mname}
          onChange={(e) => setMname(e.target.value)}
          name="lname"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          name="lname"
        />
        <input
          type="number"
          placeholder="Phone No."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
        />
        <h3>2.Complaint Details</h3>
        <textarea
          name="description"
          rows="5"
          cols="50"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <textarea
          name="comments"
          rows="2"
          cols="50"
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <br />
        <div>
          Complaint Category
          <select
            value={complaintCategory}
            onChange={(e) => setComplaintCategory(e.target.value)}
          >
            <option value="पाणी व्यवस्थापन " name="complaintCategory">
              पाणी व्यवस्थापन
            </option>
            <option value="पब्लिक ट्रान्सपोर्ट" name="complaintCategory">
              पब्लिक ट्रान्सपोर्ट
            </option>
          </select>
        </div>
        <br />
        <div>
          Complaint Type
          <select onChange={(e) => setComplaintType(e.target.value)}>
            <option name="complaintType" value="पाईपलाईन टाकणे">
              पाईपलाईन टाकणे
            </option>
            <option name="complaintType" value="पाईपलाईन दुरुस्ती">
              पाईपलाईन दुरुस्ती
            </option>
          </select>
        </div>
        <br />
        <div>
          Actual Complaint Date
          <input
            type="date"
            name="complaintDate"
            value={complaintDate}
            onChange={(e) => setComplaintDate(e.target.value)}
          ></input>
        </div>
        <div>
          Created Date
          <input
            type="date"
            name="createdDate"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
          />
        </div>
        <h3>Assigned Karyakarta</h3>
        <input
          type="text"
          placeholder="Karyakarta Name"
          value={assignedKaryakarta}
          onChange={(e) => setAssignedKaryakarta(e.target.value)}
          name="assignedKaryakarta"
        />
        <h3>Assigned Adhikari</h3>
        <input
          type="text"
          placeholder="Assigned Adhikari"
          value={adhikari}
          onChange={(e) => setAdhikari}
          name="adhikari'"
        />
        <button type="submit">Submit</button>
        <br />
        <button>Go Back</button>
      </form>
    </div>
  );
};

export default ComplaintForm;

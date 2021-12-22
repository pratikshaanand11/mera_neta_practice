import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ComplaintDashboard } from "../utill/index";
import { getAllComplaint } from "../store/actions/complaintAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "@material-ui/core";
import { deleteUser } from "../store/actions/ComplaintFormAction";

const ComplaintBoard = () => {
  const [info, setInfo] = useState([]);

  let userInfo = localStorage.getItem("userInfo");
  let userName = JSON.parse(userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("-----", userName.firstName);
  const { allComplaint, loading, error } = useSelector(
    (state) => state.complaint
  );
  // console.log("reducer complaint details", allComplaint);
  useEffect(() => {
    getAllComplaint(dispatch);
  }, []);
  // useEffect(() => {
  //   getAllComplaint(dispatch)
  //   // ComplaintDashboard()
  //   //   .then((res) => {
  //   //     console.log("complaint details response");
  //   //     console.log(res.data);
  //   //     setInfo(res.data[0]);
  //   //     console.log(info, "info");
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log("Error for complaint dashboard");
  //   //     console.log(err);
  //   //   });
  // }, []);

  const navigateHandler = () => {
    navigate("/SuperAdminComplaintForm");
  };

  const handleDelete = (id, info) => {
    if (window.confirm("Are you sure you want to delete it ??")) {
      dispatch(deleteUser(id, info, dispatch));
    }
  };

  return (
    <div>
      <h1>Super Admin Complaint Board</h1>
      <button onClick={navigateHandler}>ADD</button>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Token Number</TableCell>
              <TableCell align="right">Complaint Category</TableCell>
              <TableCell align="right">Registered By</TableCell>
              <TableCell align="right">Assembly Locality:Address</TableCell>
              <TableCell align="right">Complainer</TableCell>
              <TableCell align="right">Assignee</TableCell>
              <TableCell align="right">Complaint Date</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allComplaint.map((info) => (
              <TableRow key={info.id}>
                <TableCell>{info.tokenNumber}</TableCell>

                <TableCell align="right">{info.category.name}</TableCell>
                <TableCell align="right">{info.registeredBy.role}</TableCell>
                <TableCell align="right">{info.address.locality}</TableCell>
                <TableCell align="right">
                  {info.complainer.uniqueId}
                  <br />
                  {info.complainer.firstName}
                  {info.complainer.lastName}
                  <br />
                  {info.complainer.phone}
                </TableCell>
                <TableCell align="right">{info.Assignee}</TableCell>
                <TableCell align="right">{info.ComplaintDate}</TableCell>
                <TableCell align="right">{info.createdDate}</TableCell>
                <TableCell align="right">{info.Actions}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button onClick={() => navigate(`/editUser/${info.id}`)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(info.id, info)}>
                      Del
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ComplaintBoard;

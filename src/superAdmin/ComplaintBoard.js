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
import {
  deleteUser,
  getSingleUser,
} from "../store/actions/ComplaintFormAction";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import "./style.css";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id, row) => {
    if (window.confirm("Are you sure you want to delete it ??")) {
      dispatch(deleteUser(id, row, dispatch));
    }
  };

  const navigateEditHandler = (row) => {
    navigate(`/editUser/${row.id}`);
    dispatch(getSingleUser(row.id));
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.tokenNumber}
        </TableCell>
        <TableCell align="right">
          {row.category.name}
          {row.type.name}
        </TableCell>
        <TableCell align="right">{row.registeredBy.role}</TableCell>
        {/* <TableCell align="right">{row.address.locality}</TableCell> */}
        <TableCell align="right">
          {row.complainer.uniqueId}
          <br />
          {row.complainer.firstName}
          {row.complainer.lastName}
          <br />
          {row.complainer.phone}
        </TableCell>
        {/* <TableCell align="right">{row.Assignee}</TableCell> */}
        <TableCell align="right">{row.ComplaintDate}</TableCell>
        <TableCell align="right">{row.createdDate}</TableCell>
        <TableCell align="right">{row.Actions}</TableCell>
        <TableCell>
          <ButtonGroup>
            <Button onClick={() => navigateEditHandler(row)}>Edit</Button>
            <Button onClick={() => handleDelete(row.id, row)}>Del</Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Comments</TableCell>
                    <TableCell align="left">Assigned Karyakarta</TableCell>
                    <TableCell align="left">Assigned Adhikari</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <div align="center" className="effects">
                        {row.description}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="effects">xyzz </div>
                    </TableCell>
                    <TableCell align="right">
                      <div align="center" className="effects">
                        {row?.karyaKarta[0]?.firstName}
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div align="center" className="effects">
                        {row?.adhikari[0]?.firstName}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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

  return (
    <div>
      <h1>Super Admin Complaint Board</h1>
      <button onClick={navigateHandler}>ADD</button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Token Number</TableCell>
              <TableCell align="right">Complaint Category</TableCell>
              <TableCell align="right">Registered By</TableCell>
              {/* <TableCell align="right">Assembly Locality:Address</TableCell> */}
              <TableCell align="right">Complainer</TableCell>
              {/* <TableCell align="right">Assignee</TableCell> */}
              <TableCell align="right">Complaint Date</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {showPanel && (
                    <div className="toggleBoard">
                      {info
                        ? info.karyaKarta?.map((data) => {
                            return (
                              <div>
                                {<TableCell>{info.description}</TableCell>}
                                <TableCell>{data.firstName}</TableCell>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  )} */}
          </TableBody>
          <TableBody>
            {allComplaint?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ComplaintBoard;

import React from "react";
import "./login.css";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginCall } from "../utill";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
} from "../store/actions/actionsTypes";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("username is required."),
  password: Yup.string().required("Password is required."),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  console.log({ userInfo });
  return (
    <div className="bground">
      <h1>Office Management System</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
          deviceId: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);

          LoginCall(values)
            .then((res) => {
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              localStorage.setItem("token", res.data?.accessToken);
              console.log("ress", res.data?.role);
              let role = res.data?.role;
              if (role === "SUPER_ADMIN") {
                navigate("/superAdminComplaintBoard");
              } else if (role === "KARYA_KARTA") {
                navigate("/KaryakartaComplaintForm");
              } else if (role === "VIEWER") {
                navigate("/viewerComplaintBoard");
              } else if (role === "OFFICE_ADMIN") {
                navigate("/officeAdminComplaintBoard");
              }
              dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: res.data,
              });
            })
            .catch((err) => {
              console.log("error", err);
              dispatch({
                type: LOGIN_USER_FAIL,
                error: err,
              });
            });
        }}
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <label for="username">username</label>
            <Field name="username" type={"text"} />
            <ErrorMessage name="username" component="div" />
            <label for="examplePassword">Password</label>
            <Field name="password" type={"password"} />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
      {/* <CircularProgress /> */}
    </div>
  );
};

export default Login;

import axios from "axios";

const LoginCall = (payload) => {
  console.log("payload:::", payload);
  const url = "https://api.1logic.in/user/auth/login";
  return axios.post(url, payload);
};

const ComplaintDashboard = () => {
  let payload = { kiosk: false, page: { number: 0, size: 10 } };
  console.log("Complaint Board");
  const token = localStorage.getItem("token");
  console.log(token);
  const baseURL = "https://api.1logic.in/complainbox/list/UNSOLVED";
  return axios.post(baseURL, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { LoginCall, ComplaintDashboard };

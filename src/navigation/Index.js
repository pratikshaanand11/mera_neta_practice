import React from "react";
import Login from "../login/Login";
import SuperAdminComplaintBoard from "../superAdmin/ComplaintBoard";
import OfficeAdminComplaintBoard from "../officeAdmin/ComplaintBoard";
import ViewerComplaintBoard from "../viewer/ComplaintBoard";
import KaryakartaComplaintBoard from "../karyakarta/screens/ComplaintBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/KaryakartaComplaintBoard"
            element={<KaryakartaComplaintBoard />}
          />
          <Route
            path="/superAdminComplaintBoard"
            element={<SuperAdminComplaintBoard />}
          />
          <Route
            path="/officeAdminComplaintBoard"
            element={<OfficeAdminComplaintBoard />}
          />
          <Route
            path="/viewerComplaintBoard"
            element={<ViewerComplaintBoard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;

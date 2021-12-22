import React from "react";
import Login from "../login/Login";
import SuperAdminComplaintBoard from "../superAdmin/ComplaintBoard";
import OfficeAdminComplaintBoard from "../officeAdmin/ComplaintBoard";
import ViewerComplaintBoard from "../viewer/ComplaintBoard";
import KaryakartaComplaintBoard from "../karyakarta/screens/ComplaintBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminComplaintForm from "../superAdmin/ComplaintForm";
import ComplaintForm from "../superAdmin/ComplaintForm";

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
          <Route
            path="/SuperAdminComplaintForm"
            element={<SuperAdminComplaintForm />}
          />
          <Route path="/editUser/:id" element={<ComplaintForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;

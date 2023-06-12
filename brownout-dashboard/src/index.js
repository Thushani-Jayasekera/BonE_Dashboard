import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";


import "assets/scss/bone-dashboard-react.scss";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/BonE/*" element={<AdminLayout />} />
          <Route
            path="*"
            element={<Navigate to="/BonE/dashboard" replace />}
          />
        </Routes>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);

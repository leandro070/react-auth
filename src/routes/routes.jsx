import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Login = lazy(() => import("../components/Login"));
const Register = lazy(() => import("../components/Register"));
const Profile = lazy(() => import("../components/Profile"));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate replace to="/login" />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route element={<PrivateRoute />}>
      <Route path="profile" element={<Profile />} />
    </Route>
    <Route element={() => <p>Page not found</p>} />
  </Routes>
);

export default AppRoutes;

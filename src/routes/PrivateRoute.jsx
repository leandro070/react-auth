import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { authenticated } = useAuth();
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

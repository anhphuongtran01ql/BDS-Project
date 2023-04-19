import React from "react";
import { Outlet, Navigate } from "react-router-dom";
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { loading, user } = useSelector((store) => store.user);

  return user ? <Navigate to={"/assistant"} replace /> : children;
};

export default PublicRoutes;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) return <Navigate to={"/"} replace />;
  if (user) {
    if (!user.assistantImage)
      return <Navigate to={"/customize/image"} replace />;
    if (!user.assistantName) return <Navigate to={"/customize/name"} replace />;
    return children;
  }
};

export default PrivateRoutes;

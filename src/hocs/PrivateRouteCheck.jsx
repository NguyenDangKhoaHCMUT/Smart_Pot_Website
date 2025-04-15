import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import AuthContext from "../context/UserauthContext";

import checkPrivateRoute from "../functions/routeCheck/checkPrivateRoute";

const PrivateRouteCheck = () => {
  const navigate = useNavigate();

  let { accessToken } = useContext(AuthContext);

  const location = useLocation();
  useEffect(() => {
    const result = checkPrivateRoute(location.pathname);
    if (result == "private") {
      if (!accessToken) {
        navigate("/");
      }
    } else if (result == "public") {
      if (accessToken) {
        navigate("/dashboard");
      }
    }
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRouteCheck;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("Login");
    if (!login) {
      navigate("/");
    }
  });

  return <div>privateRoute</div>;
}

export default PrivateRoute;


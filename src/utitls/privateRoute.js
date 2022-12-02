import React, { useState, useEffect } from "react";
import { Route, redirect, useLocation } from "react-router-dom";
import { validateJwtTokenCall } from "../utitls/tokenValidation";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authed, setAuthed] = useState({ loading: false, token: null });
  const location = useLocation();
  const verifyToken = async (token) => {
    if (token === null) {
      setAuthed({ token: null, loading: false });
    } else {
      let response = await validateJwtTokenCall({
        jwttoken: token?.toString(),
      });

      const persistToken = localStorage.getItem("token");

      if (response && response?.data?.responseCode === 200) {
        setAuthed({ token: persistToken, loading: false });
      } else {
        localStorage.removeItem("token");
        setAuthed({ token: null, loading: false });
        alert("Session Expired", "error", "TOP_CENTER");
      }
    }
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    // return verifyToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return authed.loading ? (
    <div className="">
      <h5>loading...</h5>
    </div>
  ) : (
    <Route
      {...rest}
      render={(props) =>
        authed.token ? (
          <Component {...props} />
        ) : (
          <redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

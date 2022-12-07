import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import SideBar from "./SideBar/SideBar";

import { redirect } from "react-router-dom";
const Layout = (props) => {
  const [isCollasped, setIsCollasped] = useState(false);
  const persistToken = localStorage.getItem("token");
  if (!persistToken) {
    redirect("/");
  }

  return (
    <div className={`global-wrapper ${!isCollasped ? "theme-collapsed" : ""}`}>
      <SideBar
        setIsCollasped={() => setIsCollasped(!isCollasped)}
        isCollasped={isCollasped}
        childprops={props?.element?.props?.children}
      />
      <div className="right-area-content">
        <main className="main-content">
          <Fragment></Fragment>
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default Layout;

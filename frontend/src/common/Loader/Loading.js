import React from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner"
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="full-loader d-flex align-items-center justify-content-center">
      <Loader type="Oval" color="#013f58" height={100} width={100} />
    </div>
  );
};

export default Loading;

import React, { useState } from "react";

export const FileValidaiton = ({
  form,
  field,
  errors,
  setImageOnChange,
  handleInvalidFileErr,
}) => {
  const [imageUploadErrors, setImageUploadErrors] = useState({
    errorShow: false,
    errorMsg: [],
  });

  const supportedImages = ["image/png", "image/jpeg", "image/png"];

  const handleChange = (fileImg) => {
    if (supportedImages.includes(fileImg?.type) && fileImg?.size <= 10240000) {
      setImageOnChange(fileImg);
      setImageUploadErrors({
        errorShow: false,
        errorMsg: [],
      });
      handleInvalidFileErr(false);
    } else {
      handleInvalidFileErr(true);
      setImageUploadErrors({
        errorShow: true,
        errorMsg: [
          "File size maximum 10 mb Allowed",
          "Only the following formats are accepted: jpeg, jpg ,png",
        ],
      });
    }
  };
  return (
    <div className=" me-3 overflow-hidden">
      <input
        name={field?.name}
        type="file"
        accept="image/"
        onChange={(e) => handleChange(e.target.files[0])}
      />
      <div>
        {imageUploadErrors?.errorShow && (
          <div className="select-error-style">
            {imageUploadErrors?.errorMsg[0]}
            <br />
            {imageUploadErrors?.errorMsg[1]}
          </div>
        )}
      </div>
    </div>
  );
};

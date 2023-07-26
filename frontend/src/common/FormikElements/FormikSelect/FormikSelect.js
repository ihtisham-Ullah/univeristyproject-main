import React from "react";
import { useField } from "formik";
import "./FormikSelect.css";

function getStyles() {
  return {
    border: "1px solid red",
  };
}

const FormikSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? true : false;
  return (
    <div className="form-floating">
      <select
        className="form-select"
        {...field}
        {...props}
        style={{ ...(error ? getStyles() : "") }}
      />
      <label
        htmlFor={props.id || props.name}
        className="text-capitalize text-muted"
      >
        {label}
      </label>
    </div>
  );
};

export default FormikSelect;

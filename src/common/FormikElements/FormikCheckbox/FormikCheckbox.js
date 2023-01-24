import React from "react";
import { useField } from "formik";
import "./FormikCheckbox.css";

function getStyles() {
  return {
    border: "1px solid red",
  };
}

const FormikCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  const error = meta.touched && meta.error ? true : false;
  return (
    <div>
      <label className="checkbox-input">
        <input
          type="checkbox"
          {...field}
          {...props}
          style={{ ...(error ? getStyles() : "") }}
          className="p-4"
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="checkbox-error-style">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikCheckbox;

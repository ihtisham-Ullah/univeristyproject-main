import React from "react";
import "./FormikInputFloating.scss";
import { FloatingLabel, Form } from "react-bootstrap";
import { useField } from "formik";
import { TickLogo } from "../../../assets/SVGs/SVGs";

const FormikInputFloating = ({ showerror, icon, label, ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? true : false;
  function getStyles() {
    return {
      border: "1px solid red",
    };
  }
  return (
    <>
      {icon && (
        <>
          <span className="youtube-icon">{icon}</span>asd
          <TickLogo color="#013F58" />
        </>
      )}
      <FloatingLabel
        controlId={props.Id}
        label={<span className="text-capitalize text-muted">{label}</span>}
        className={props.className}
        name={props.name}
      >
        <Form.Control
          {...field}
          {...props}
          style={{ ...(error ? getStyles() : "") }}
          className="shadow-sm"
        />
        {!showerror && meta.touched && meta.error ? (
          <div className="input-error-style">{meta.error}</div>
        ) : null}
      </FloatingLabel>
    </>
  );
};
export default FormikInputFloating;

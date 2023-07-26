import React from "react";

export const CustomInputComponent = ({
  field,
  form: { touched, errors },
  formik,
  items,
  ...props
}) => (
  <div>
    <textarea {...field} {...props}>
      At w3schools.com you will learn how to make a website. They offer free
      tutorials in all web development technologies.
    </textarea>

    {touched[field.name] && errors[field.name] && (
      <div className="input-error-style"></div>
    )}
  </div>
);

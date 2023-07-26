import FormikSelect from "common/FormikElements/FormikSelect/FormikSelect";
import React from "react";

export const FormikSelectonChange = (props) => {
  return (
    <div className="genericForm-select w-100">
      <FormikSelect
        label={props?.label}
        name={props?.name}
        className={`form-control form-select ${props.extraclasses}`}
        value={props.value}
        onChange={(e) => {
          props.handleChange &&
            props.handleChange(
              props?.isString ? e.target.value : parseInt(e.target.value)
            );
        }}
        disabled={props.disabled}
      >
        <option value="">{props?.defaultValue}</option>
        {props?.DropDownList &&
          props?.DropDownList.map((items, index) => {
            return (
              <option value={items.name} key={index} disabled={items.state}>
                {items}
              </option>
            );
          })}
      </FormikSelect>
    </div>
  );
};

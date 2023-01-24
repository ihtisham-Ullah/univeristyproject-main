import React from 'react'
import {useField} from 'formik'
import './FormikDatePicker.css'

function getStyles() {
  return {
    border: '1px solid red'
  }
}

const FormikDatePicker = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    const error = meta.touched && meta.error ? true : false

    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input  type="datetime-local" {...field} {...props} 
        style= {{...error ? getStyles() : '' }}/>
        { meta.touched && meta.error ? (
          <div className="date-picker-error-style">{meta.error}</div>
        ) : null}
      </>
    );
  };

export default FormikDatePicker
import FormikSelect from "common/FormikElements/FormikcatalogSelect/FormikSelect";
export const FormikSelectComponent = (props) => {
  return (
    <div className="genericForm-select w-100">
      <FormikSelect
        label={props?.label}
        name={props?.name}
        className={`form-control form-select ${props.className}`}
      >
        <option value="">{props?.defaultValue}</option>
        {props?.DropDownList &&
          props?.DropDownList.map((items, index) => {
            return (
              <option value={items} key={index}>
                {items}
              </option>
            );
          })}
      </FormikSelect>
    </div>
  );
};

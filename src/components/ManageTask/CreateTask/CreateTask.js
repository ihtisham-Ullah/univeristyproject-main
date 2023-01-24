import React, { useState, useEffect } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./CreateTask.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Field } from "formik";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { CustomInputComponent } from "common/FormikElements/FormikTextArea/TextArea";
import {
  TextField,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Swal from "sweetalert2";
import * as Yup from "yup";
function CreateTask() {
  const [taskType, setTaskType] = useState("");
  const [taskPriority, setTaskPriority] = useState("--Select priority--");
  const [singleDateFetch, setSingleDataFetch] = useState({});
  const { id } = useParams();
  const [salesperson, setSalesPerson] = useState("");
  const [Loader, setLoadder] = useState(false);
  const [submitformLoader, setSubmitformLoader] = useState(false);
  const [state, setState] = useState({ address: "" });
  let navigate = useNavigate();

  useEffect(() => {
    updateTasks();
  }, [id]);

  const updateTasks = async () => {
    let { data } = await axios.get(`http://localhost:5000/getTasks/${id}`);
    setSingleDataFetch(data);
  };

  useEffect(() => {
    fetchDropDownLists();
  }, []);

  const fetchDropDownLists = async () => {
    try {
      setLoadder(true);
      let getSalesperson = await axios.get(
        "http://localhost:5000/getsalesperson"
      );
      let getTaskpriority = await axios.get(
        "http://localhost:5000/gettaskpriority"
      );
      let getTaskType = await axios.get("http://localhost:5000/gettasktype");

      setSalesPerson(getSalesperson?.data);
      setTaskPriority(getTaskpriority.data);
      setTaskType(getTaskType?.data);
      setLoadder(false);
    } catch (error) {
      console.log("catch error", error);
    }
  };
  let handleSubmitForm = async (data) => {
    try {
      if (id) {
        handleUpdateTask(data);
        return;
      }
      await fetch("http://localhost:5000/createTask", {
        method: "POST",
        crossDomain: true,
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-origin": "*",
        },
        body: JSON.stringify({
          ...data,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== "ok") {
            Swal.fire("Task Cannot be Created !", "", "error");
          } else {
            navigate("/ViewTasks");
            Swal.fire("Task Created Successfully!", "", "success");
          }
        });
    } catch (error) {
      console.log("errors", error);
    }
  };

  let handleUpdateTask = async (Data) => {
    // e.preventDefault();
    let result = await fetch(`http://localhost:5000/updateTasks/${id}`, {
      method: "PUT",
      crossDomain: true,
      body: JSON.stringify({
        ...Data,
      }),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-origin": "*",
      },
    });
    result = await result.json();

    if (result) {
      Swal.fire("Updated Successfully!", "", "success");
      navigate("/ViewTasks");
    } else {
      Swal.fire("Cannot be Updated!", "", "error");
    }
  };
  let requiredErrorShow = (fieldName, touched, errors) => {
    return (
      <>
        {touched[fieldName] && Boolean(errors[fieldName]) && (
          <FormHelperText
            style={{
              margin: " 3px 14px 0px",
              color: " #d32f2f",
              fontSize: "12px",
            }}
          >
            *Required
          </FormHelperText>
        )}
      </>
    );
  };

  const handleLocationSelect = (address) => {
    setState({ address });

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };
  const handleChangeLocation = (address) => {
    setState({ address });
  };

  return (
    <div className="auth-wrapper p-5">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Loader || submitformLoader}
      >
        <CircularProgress />
      </Backdrop>
      <div className="row row-grid mx-3 p-3">
        <h3> {id ? "Update Task" : "Create Task"}</h3>
        <div className="main">
          <Formik
            initialValues={
              id
                ? singleDateFetch
                : {
                    taskName: "",
                    targetLocation: "",
                    taskDescription: "",
                    startDate: "",
                    endDate: "",
                    taskPriority: "",
                    taskType: "",
                    salespersonId: "",
                  }
            }
            onSubmit={(values) => {
              handleSubmitForm(values);
            }}
            validationSchema={Yup.object({
              taskName: Yup.string("Enter your taskName")
                .min(2, "Min 2 length required")
                .required("*Required"),
              targetLocation: Yup.string("Enter Target Location")
                .min(5, "Min 5 length required")
                .required("*Required"),
              startDate: Yup.string("Enter Start Date")
                .min(2, "Min 2 length required")
                .required("*Required"),
              endDate: Yup.string("Enter End Date")
                .min(2, "Min 2 length required")
                .required("*Required"),
              taskPriority: Yup.string("Enter Task Priority")
                .min(2, "Min 2 length required")
                .required("*Required"),
              taskType: Yup.string("Enter your Task Type")
                .min(2, "Min 2 length required")
                .required("*Required"),
              salespersonId: Yup.string("Enter Sales Person ID")
                .min(2, "Min 2 length required")
                .required("*Required"),
              taskDescription: Yup.string("Enter taskDescription")
                .min(2, "Min 2 length required")
                .required("*Required"),
            })}
            enableReinitialize
          >
            {({
              handleSubmit,
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row ">
                  <div className="col-sm-6 col-md-4 form-group mb-3">
                    <TextField
                      fullWidth
                      id="taskName"
                      name="taskName"
                      label="Task Name"
                      value={values.taskName}
                      onChange={handleChange}
                      error={touched["taskName"] && Boolean(errors["taskName"])}
                      helperText={touched["taskName"] && errors["taskName"]}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="col-sm-6 col-md-4 form-group mb-3">
                    <FormControl
                      fullWidth
                      error={touched["taskType"] && Boolean(errors["taskType"])}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Task Type
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        name="taskType"
                        value={values.taskType || ""}
                        label="Task Type"
                        onChange={handleChange}
                      >
                        {Object.values(taskType).map((task, index) => (
                          <MenuItem value={task.type} key={index}>
                            {task.type}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched["taskType"] && Boolean(errors["taskType"]) && (
                        <FormHelperText>*Required</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="col-sm-6 col-md-4 form-group mb-3">
                    <FormControl
                      fullWidth
                      error={
                        touched["taskPriority"] &&
                        Boolean(errors["taskPriority"])
                      }
                    >
                      <InputLabel id="demo-simple-select-label">
                        Task Priority
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        name="taskPriority"
                        value={values.taskPriority || ""}
                        label="Task Priority"
                        onChange={handleChange}
                      >
                        {Object.values(taskPriority).map((task) => (
                          <MenuItem key={task.priority} value={task.priority}>
                            {task.priority}
                          </MenuItem>
                        ))}
                      </Select>

                      {requiredErrorShow("endDate", touched, errors)}
                    </FormControl>
                  </div>

                  <div className="col-sm-6 col-md-4 form-group mb-3">
                    <FormControl
                      fullWidth
                      error={
                        touched["salespersonId"] &&
                        Boolean(errors["salespersonId"])
                      }
                    >
                      <InputLabel id="demo-simple-select-label">
                        Sales Person
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        name="salespersonId"
                        value={values.salespersonId || ""}
                        defaultValue={
                          Object.values(salesperson).filter((items) => {
                            return items._id === values.salespersonId;
                          })[0]?.firstName || ""
                        }
                        label="Sales Person"
                        onChange={handleChange}
                      >
                        {Object.values(salesperson).map((task) => (
                          <MenuItem key={task._id} value={task._id}>
                            {task.firstName}
                          </MenuItem>
                        ))}
                      </Select>

                      {requiredErrorShow("endDate", touched, errors)}
                    </FormControl>
                  </div>
                  <div className="col-sm-6 col-md-4 form-group mb-3">
                    <TextField
                      fullWidth
                      id="startDate"
                      label="Start Date"
                      type="date"
                      name={"startDate"}
                      value={values.startDate}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={
                        touched["startDate"] && Boolean(errors["startDate"])
                      }
                    />
                    {requiredErrorShow("startDate", touched, errors)}
                  </div>
                  <div className="col-sm-6 col-md-4 form-group mb-3">
                    <TextField
                      fullWidth
                      id="dateEnd"
                      label="End Date"
                      type="date"
                      name="endDate"
                      value={values.endDate}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={touched["endDate"] && Boolean(errors["endDate"])}
                    />
                    {requiredErrorShow("endDate", touched, errors)}
                  </div>

                  <div className="col-sm-6 col-md-4 form-group mb-3">
                    <PlacesAutocomplete
                      // value={state.address}
                      value={values.targetLocation || ""}
                      onChange={(evt) => {
                        handleChangeLocation(evt);
                        if (!evt) {
                          setFieldValue("targetLocation", "");
                        } else {
                          setFieldValue("targetLocation", evt);
                        }
                        console.log("evt", evt);
                      }}
                      onSelect={(evnt) => {
                        handleLocationSelect(evnt);
                        console.log(">>>>>", evnt);
                        setFieldValue("targetLocation", evnt);
                      }}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <TextField
                            fullWidth
                            id="targetLocation"
                            name="targetLocation"
                            label="Target Location"
                            value={values.targetLocation || ""}
                            onChange={(evnt) => {
                              console.log(":da", evnt.target.value);
                              setFieldValue("targetLocation", state.address);
                            }}
                            error={
                              touched["targetLocation"] &&
                              Boolean(errors["targetLocation"])
                            }
                            helperText={
                              touched["targetLocation"] &&
                              errors["targetLocation"]
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            {...getInputProps({
                              placeholder: "Search Places ...",
                              className: "location-search-input",
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                  <div className="col-sm-6 col-md-4 form-group mb-3">
                    <Field
                      name="taskDescription"
                      component={CustomInputComponent}
                      value={values["taskDescription"]}
                      placeholder="Description"
                      className="form-control "
                      rows="2"
                      onChange={handleChange}
                      style={{
                        height: "55px",
                        border:
                          touched["taskDescription"] &&
                          Boolean(errors["taskDescription"])
                            ? "1px solid red"
                            : "",
                      }}
                    />

                    {requiredErrorShow("taskDescription", touched, errors)}
                  </div>
                </div>

                <div className="mt-3 d-flex justify-content-center">
                  <Button variant="contained" type="submit">
                    {id ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;

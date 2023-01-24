import React, { useState, useEffect } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./CreateTask.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Field } from "formik";

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
  let navigate = useNavigate();

  useEffect(() => {
    updateTasks();
  }, [id]);

  const updateTasks = async () => {
    let { data } = await axios.get(`http://localhost:5000/getTasks/${id}`);
    console.log("data", data);
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
            // navigate("/ViewTasks");
            Swal.fire("Task Created Successfully!", "", "success");
            console.log("your task");
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
            {({ handleSubmit, values, errors, touched, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <div className="row ">
                  {[
                    "task_Name",
                    "start_Date",
                    "end_Date",
                    "task_Priority",
                    "task_Type",
                    "sales_personId",
                    "target_Location",
                    "task_Description",
                  ].map((items, index) => {
                    return (
                      <>
                        {items === "task_Description" ? (
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

                            {requiredErrorShow("endDate", touched, errors)}
                          </div>
                        ) : items === "task_Priority" ? (
                          <div className="col-sm-6 col-md-4 form-group mb-3">
                            <FormControl
                              fullWidth
                              error={
                                touched["taskPriority"] &&
                                Boolean(errors["taskPriority"])
                              }
                            >
                              <InputLabel id="demo-simple-select-label">
                                {items?.replace(/_/g, " ")}
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-error-label"
                                id="demo-simple-select-error"
                                name="taskPriority"
                                value={values.taskPriority || ""}
                                label={items?.replace(/_/g, " ")}
                                onChange={handleChange}
                              >
                                {Object.values(taskPriority).map((task) => (
                                  <MenuItem
                                    key={task.priority}
                                    value={task.priority}
                                  >
                                    {task.priority}
                                  </MenuItem>
                                ))}
                              </Select>

                              {requiredErrorShow("endDate", touched, errors)}
                            </FormControl>
                          </div>
                        ) : items === "task_Type" ? (
                          <div className="col-sm-6 col-md-4 form-group mb-3">
                            <FormControl
                              fullWidth
                              error={
                                touched["taskType"] &&
                                Boolean(errors["taskType"])
                              }
                            >
                              <InputLabel id="demo-simple-select-label">
                                {items?.replace(/_/g, " ")}
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-error-label"
                                id="demo-simple-select-error"
                                name="taskType"
                                value={values.taskType || ""}
                                label={items?.replace(/_/g, " ")}
                                onChange={handleChange}
                              >
                                {Object.values(taskType).map((task, index) => (
                                  <MenuItem value={task.type} key={index}>
                                    {task.type}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched["taskType"] &&
                                Boolean(errors["taskType"]) && (
                                  <FormHelperText>*Required</FormHelperText>
                                )}
                            </FormControl>
                          </div>
                        ) : items === "sales_personId" ? (
                          <div className="col-sm-6 col-md-4 form-group mb-3">
                            <FormControl
                              fullWidth
                              error={
                                touched["salespersonId"] &&
                                Boolean(errors["salespersonId"])
                              }
                            >
                              <InputLabel id="demo-simple-select-label">
                                sales person
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
                                label="sales person"
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
                        ) : items === "start_Date" ? (
                          <div className="col-sm-6 col-md-4 form-group mb-3">
                            <TextField
                              fullWidth
                              id="dateStart"
                              label={items?.replace(/_/g, " ")}
                              type="date"
                              name={items?.replace(/_/g, "")}
                              value={values[items?.replace(/_/g, "")]}
                              onChange={handleChange}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={
                                touched["startDate"] &&
                                Boolean(errors["startDate"])
                              }
                            />
                            {requiredErrorShow("endDate", touched, errors)}
                          </div>
                        ) : items === "end_Date" ? (
                          <div className="col-sm-6 col-md-4 form-group mb-3">
                            <TextField
                              fullWidth
                              id="dateEnd"
                              label={items?.replace(/_/g, " ")}
                              type="date"
                              name={items?.replace(/_/g, "")}
                              value={values[items?.replace(/_/g, "")]}
                              onChange={handleChange}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={
                                touched["endDate"] && Boolean(errors["endDate"])
                              }
                            />
                            {requiredErrorShow("endDate", touched, errors)}
                          </div>
                        ) : (
                          <div className="col-sm-6 col-md-4 form-group mb-3">
                            <TextField
                              fullWidth
                              id={items}
                              name={items?.replace(/_/g, "")}
                              label={items?.replace(/_/g, " ")}
                              value={values[items?.replace(/_/g, "")]}
                              onChange={handleChange}
                              error={
                                touched[items?.replace(/_/g, "")] &&
                                Boolean(errors[items?.replace(/_/g, "")])
                              }
                              helperText={
                                touched[items?.replace(/_/g, "")] &&
                                errors[items?.replace(/_/g, "")]
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </div>
                        )}
                      </>
                    );
                  })}
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

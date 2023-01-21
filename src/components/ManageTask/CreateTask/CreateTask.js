import React from "react";
// import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./CreateTask.css";

import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";

function CreateTask() {
  const [dateStart, setDateStart] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskPriority, setTaskPriority] = useState("--Select priority--");

  const [salesperson, setSalesPerson] = useState("");
  const [targetLocation, setTargetLocation] = useState("");

  useEffect(() => {
    const getTaskType = async () => {
      const res = await fetch("http://localhost:5000/gettasktype");
      const data = await res.json();
      console.log(data);
      setTaskType(await data);
    };
    getTaskType();
  }, []);

  // useEffect(() => {
  //   const getTaskpriority = async () => {
  //     const res = await fetch("http://localhost:5000/gettaskpriority");
  //     const data = await res.json();
  //     console.log(data);
  //     setTaskPriority(await data);
  //   };
  //   getTaskpriority();
  // }, []);

  useEffect(() => {
    const getTaskpriority = async () => {
      try {
        const res = await fetch("http://localhost:5000/gettaskpriority");
        const data = await res.json();
        setTaskPriority(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTaskpriority();
  }, []);

  useEffect(() => {
    const getSalesperson = async () => {
      const res = await fetch("http://localhost:5000/getsalesperson");
      const data = await res.json();
      console.log(data);
      setSalesPerson(await data);
    };
    getSalesperson();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("helooooo");
    await fetch("http://localhost:5000/createTask", {
      method: "POST",
      crossDomain: true,
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-origin": "*",
      },
      body: JSON.stringify({
        taskName: taskName,
        targetLocation: targetLocation,
        taskDescription: description,
        startDate: dateStart,
        endDate: dateEnd,
        taskPriority: taskPriority,
        taskType: taskType,
        salespersonId: salesperson,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "ok") {
          Swal.fire("Task Cannot be Created !", "", "error");
        }
      });
  };
  console.log(taskPriority);
  return (
    <div className="auth-wrapper p-5">
      <div className="continer mx-3 p-3">
        <div className="  main">
          <h3>Create Task</h3>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className=" col-md-6 form-group mb-3">
                <label htmlFor="taskName">Task Name</label>
                <input
                  type="text"
                  id="taskName"
                  className="form-control"
                  autoComplete="off"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                />
              </div>

              {/* <div className=" col-md-6 mb-3">
                <label htmlFor="priority">Priority</label>
                <select
                  className="form-select"
                  value=""
                  multiple={false}
                  onChange={(e) => setTaskPriority(e.target.value)}
                >
                  <option value="">--Select priority--</option>
                  {Object.values(taskPriority).map((task) => (
                    <option key={task._id}>{task.priority}</option>
                  ))}
                </select>
              </div> */}

              <div className="col-md-6 mb-3">
                <label htmlFor="priority">Priority</label>
                <select
                  className="form-select"
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                >
                  {Object.values(taskPriority).map((task) => (
                    <option key={task._id} value={task.priority}>
                      {task.priority}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" col-md-6 mb-3">
                <label htmlFor="taskType">Task Type</label>
                <select
                  className="form-select"
                  value={taskType}
                  multiple={false}
                  onChange={(e) => setTaskType(e.target.value)}
                >
                  <option value="">--Select Task--</option>
                  {Object.values(taskType).map((task) => (
                    <option key={task._id}>{task.type}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Target Location</label>
                <input
                  type="location"
                  name="location"
                  className="form-control"
                  autoComplete="off"
                  value={targetLocation}
                  onChange={(e) => setTargetLocation(e.target.value)}
                  required
                />
              </div>
              <div className=" col-md-6 mb-3">
                <label htmlFor="selectSalesperson">Select Salesperson</label>
                <select
                  className="form-select"
                  value={salesperson}
                  multiple={false}
                  onChange={(e) => setSalesPerson(e.target.value)}
                >
                  <option value="">--Select Salesperson--</option>
                  {Object.values(salesperson).map((salesperson) => (
                    <option key={salesperson._id}>
                      {salesperson.firstName}
                      {salesperson._id}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" col-md-2 mb-2">
                <TextField
                  id="dateStart"
                  label="Start Date"
                  type="date"
                  // defaultValue="dd MMM yyyy"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className=" col-md-2 mb-2">
                <TextField
                  id="dateEnd"
                  label="End Date"
                  type="date"
                  // defaultValue="dd MMM yyyy"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className=" col-md-6 mb-3">
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="Description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className=" justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Create Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;

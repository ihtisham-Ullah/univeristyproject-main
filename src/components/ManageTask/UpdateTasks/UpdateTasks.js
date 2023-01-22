import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./UpdateTask.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function UpdateTasks() {
  const [startDate, setDateStart] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setDescription] = useState("");
  const [endDate, setDateEnd] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskPriority, setTaskPriority] = useState("--Select priority--");
  const [salespersonId, setSalesPerson] = useState("");
  const [targetLocation, setTargetLocation] = useState("");
  const params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const getTaskType = async () => {
      const res = await fetch("http://localhost:5000/gettasktype");
      const data = await res.json();
      console.log(data);
      setTaskType(await data);
    };
    getTaskType();
  }, []);

  useEffect(() => {
    const getTaskpriority = async () => {
      try {
        const res = await fetch("http://localhost:5000/gettaskpriority");
        const data = await res.json();
        setTaskPriority(await data);
      } catch (err) {
        console.error(err);
      }
    };
    getTaskpriority();
  }, []);

  useEffect(() => {
    getSalesperson();
  }, []);
  const getSalesperson = async () => {
    const res = await fetch("http://localhost:5000/getsalesperson");
    const data = await res.json();
    setSalesPerson(await data);
  };
  useEffect(() => {
    updateTasks();
  }, []);

  const updateTasks = async () => {
    const res = await fetch(`http://localhost:5000/getTasks/${params.id}`);

    const data = await res.json();
    setTaskName(data.taskName);
    setDescription(data.taskDescription);
    setTargetLocation(data.targetLocation);
    setSalesPerson(data.salespersonId);
    setDateStart(data.startDate);
    setDateEnd(data.endDate);
    setTaskPriority(data.taskPriority);
    setTaskType(data.taskType);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:5000/updateTasks/${params.id}`, {
      method: "PUT",
      crossDomain: true,
      body: JSON.stringify({
        taskName,
        targetLocation,
        taskDescription,
        startDate,
        endDate,
        taskPriority,
        taskType,
        salespersonId,
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

  return (
    <div className="auth-wrapper p-5">
      <div className="continer mx-3 p-3">
        <div className="  main">
          <h3>Update Task</h3>

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
                  <option htmlFor="Task">--Select Task--</option>
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
                <label htmlFor="Salesperson">Select Salesperson</label>
                <select
                  className="form-select"
                  value={salespersonId}
                  multiple={false}
                  onChange={(e) => setSalesPerson(e.target.value)}
                >
                  <option htmlFor="salesperson">--Select Salesperson--</option>
                  {Object.values(salespersonId).map((salesperson) => (
                    <option value={salesperson._id} key={salesperson._id}>
                      {salesperson.firstName}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" col-md-2 mb-2">
                <TextField
                  id="dateStart"
                  label="Start Date"
                  type="date"
                  value={startDate}
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
                  value={endDate}
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
                  value={taskDescription}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className=" justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Update Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTasks;

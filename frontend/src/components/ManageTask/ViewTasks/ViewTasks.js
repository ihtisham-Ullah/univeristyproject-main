import React, { useState, useEffect } from "react";
import { FaUser, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Table, Image, Button } from "react-bootstrap";

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/getTasks", {
        method: "GET",
        crossDomain: true,
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-origin": "*",
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  function deleteTasks(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`http://localhost:5000/getTasks/${id}`, {
        method: "DELETE",
        crossDomain: true,
      })
        .then((result) => {
          result.json().then((resp) => {
            getTasks();
          });
        })
        .catch((error) => console.log(error));
    }
  }
  const getBadgeColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "danger";
      case "normal":
        return "warning";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const tasksBySalesperson = groupBy(tasks, "firstName");

  return (
    <div className="container py-5">
      <h2
        className="text-center mb-5"
        style={{
          fontFamily: "Arial",
          fontWeight: "bold",
          fontSize: "32px",
          marginTop: "5rem",
        }}
      >
        Assigned Tasks
      </h2>
      {Object.entries(tasksBySalesperson).map(([salesperson, tasks]) => (
        <div key={salesperson}>
          <hr className="my-4" />
          <div className="row align-items-center">
            {tasks[0].firstName === salesperson && (
              <div className="col-12 col-md-2 text-center d-flex flex-column align-items-center">
                <img
                  src={tasks[0].photo}
                  alt={tasks[0].firstName}
                  className="rounded-circle img-fluid mb-3"
                  style={{ maxWidth: "100px", marginLeft: "60rem" }}
                />
                <h3
                  className="fw-bold"
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "24px",
                    marginLeft: "60rem",
                  }}
                >
                  {salesperson} Tasks
                </h3>
              </div>
            )}
            <div className="col-md-11">
              <div className="table-responsive w-100">
                <table className="table table-striped table-hover">
                  <thead className="nowrap">
                    <tr>
                      <th
                        scope="col"
                        style={{
                          fontFamily: "Arial",
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#555555",
                        }}
                      >
                        Task Name
                      </th>
                      <th
                        scope="col"
                        style={{
                          fontFamily: "Arial",
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#555555",
                        }}
                      >
                        Task Type
                      </th>
                      <th
                        scope="col"
                        style={{
                          fontFamily: "Arial",
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#555555",
                        }}
                      >
                        Task Priority
                      </th>
                      <th
                        scope="col"
                        style={{
                          fontFamily: "Arial",
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#555555",
                        }}
                      >
                        Start Date
                      </th>
                      <th
                        scope="col"
                        style={{
                          fontFamily: "Arial",
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#555555",
                        }}
                      >
                        End Date
                      </th>
                      <th
                        scope="col"
                        style={{
                          fontFamily: "Arial",
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#555555",
                        }}
                      >
                        Target Location
                      </th>
                      <th
                        scope="col"
                        style={{
                          fontFamily: "Arial",
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#555555",
                        }}
                      >
                        Task Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.taskName}>
                        <td
                          className="px-4"
                          style={{ fontFamily: "Verdana", fontSize: "16px" }}
                        >
                          {task.taskName}
                        </td>
                        <td
                          className="px-4"
                          style={{ fontFamily: "Verdana", fontSize: "16px" }}
                        >
                          {task.taskType}
                        </td>
                        <td
                          className="px-4"
                          style={{ fontFamily: "Verdana", fontSize: "16px" }}
                        >
                          <span
                            className={`badge bg-${getBadgeColor(
                              task.taskPriority
                            )}`}
                            style={{
                              fontFamily: "Verdana",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            {task.taskPriority}
                          </span>
                        </td>
                        <td
                          className="px-4"
                          style={{ fontFamily: "Verdana", fontSize: "16px" }}
                        >
                          {task.startDate}
                        </td>
                        <td
                          className="px-4"
                          style={{ fontFamily: "Verdana", fontSize: "16px" }}
                        >
                          {task.endDate}
                        </td>
                        <td
                          className="px-4"
                          style={{ fontFamily: "Verdana", fontSize: "16px" }}
                        >
                         {task.targetLocation?.location}
                        </td>
                        <td
                          className="px-4"
                          style={{ fontFamily: "Verdana", fontSize: "16px" }}
                        >
                          {task.taskDescription}
                        </td>
                        <td>
                          <Link
                            // style={{ marginLeft: "0px", marginBottom: "1rem" }}
                            to={`/updateTasks/${task.taskId}`}
                          >
                            <FaEdit /> Edit
                          </Link>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => deleteTasks(task.taskId)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-slider">
                <div className="slider-wrapper">
                  <div className="slider"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <hr className="my-4" />
    </div>
  );
}

export default ViewTasks;

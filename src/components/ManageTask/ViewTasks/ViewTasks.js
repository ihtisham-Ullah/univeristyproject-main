import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ViewTasks() {
  const [list, setList] = useState([]);

  const getTasks = async () => {
    fetch("http://localhost:5000/getTasks", {
      method: "GET",
      crossDomain: true,

      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-origin": "*",
      },
    }).then((result) => {
      result.json().then((resp) => {
        setList(resp);
      });
    });
  };
  useEffect(() => {
    getTasks();
  }, []);

  function deleteTasks(id) {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      crossDomain: true,
    }).then((result) => {
      result.json().then((resp) => {
        getTasks();
      });
    });
  }

  return (
    <>
      <nav
        className="nav nav-pills flex-column flex-sm-row"
        style={{ marginTop: "5rem", marginLeft: "5rem" }}
      >
        <a
          className="flex-sm-fill text-sm-center nav-link active"
          aria-current="page"
          href="!#"
        >
          Active
        </a>
        <a className="flex-sm-fill text-sm-center nav-link" href="!#">
          Longer nav link
        </a>
        <a class="flex-sm-fill text-sm-center nav-link" href="!#">
          Link
        </a>
        <a
          className="flex-sm-fill text-sm-center nav-link disabled"
          href="!#"
          tabindex="-1"
          aria-disabled="true"
        >
          Disabled
        </a>
      </nav>
      <p className="h3" style={{ marginTop: "7rem", marginLeft: "35rem" }}>
        Assigned Tasks
      </p>
      <div style={{ marginLeft: "5rem" }}>
        <div className="container">
          <div className=" row mb-2">
            {list?.map((d) => (
              <div className="col-md-3">
                <div class="card-deck">
                  <div
                    class="card mb-1 bg-primary text-white"
                    style={{ width: "15rem" }}
                  >
                    <h5 class="card-header">{d.taskName}</h5>
                    <div class="card-body">
                      <p class="card-text">
                        <h6 style={{ display: "inline", color: "black" }}>
                          Description:
                        </h6>{" "}
                        {d.taskDescription}
                      </p>
                      <p>
                        <h6 style={{ display: "inline", color: "black" }}>
                          Type:
                        </h6>{" "}
                        {d.taskType}
                      </p>
                      <p>
                        <h6 style={{ display: "inline", color: "black" }}>
                          Priority:
                        </h6>{" "}
                        {d.taskPriority}
                      </p>
                      <p class="card-text">
                        <h6 style={{ display: "inline", color: "black" }}>
                          Location:
                        </h6>{" "}
                        {d.targetLocation}
                      </p>
                      <p class="card-text">
                        <h6 style={{ display: "inline", color: "black" }}>
                          End Date:
                        </h6>{" "}
                        {d.endDate}
                      </p>
                    </div>
                    <Link
                      to={"/updateTasks/" + d._id}
                      className="btn btn-outline-warning"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => deleteTasks(d._id)}
                      type="button"
                      class="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewTasks;

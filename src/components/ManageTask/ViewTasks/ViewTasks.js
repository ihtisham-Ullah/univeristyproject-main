import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

function ViewTasks() {
  const [list, setList] = useState([]);
  const [Loader, setLoadder] = useState(false);

  const getTasks = async () => {
    try {
      setLoadder(true);
      await fetch("http://localhost:5000/getTasks", {
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
          setLoadder(false);
        });
      });
      setLoadder(false);
    } catch (error) {
      console.log("error", error);
      setLoadder(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  function deleteTasks(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`http://localhost:5000/getTasks/${id}`, {
        method: "DELETE",
        crossDomain: true,
      }).then((result) => {
        result.json().then((resp) => {
          getTasks();
        });
      });
    }
  }

  return (
    <>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Loader}
      >
        <CircularProgress />
      </Backdrop> */}

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

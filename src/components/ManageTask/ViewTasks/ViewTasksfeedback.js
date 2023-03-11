import React, { useState, useEffect } from "react";

function ViewTasksfeedback() {
  const [list, setList] = useState([]);
  const [Loader, setLoadder] = useState(false);

  const getTasksFeedback = async () => {
    try {
      setLoadder(true);
      await fetch("http://localhost:5000/getTasksFeedback", {
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
    getTasksFeedback();
  }, []);
  function deleteTasks(id) {
    if (window.confirm("Are you sure you want to delete this Feedback?")) {
      fetch(`http://localhost:5000/getTasksFeedback/${id}`, {
        method: "DELETE",
        crossDomain: true,
      }).then((result) => {
        result.json().then((resp) => {
          getTasksFeedback();
        });
      });
    }
  }

  return (
    <>
      <p className="h3" style={{ marginTop: "7rem", marginLeft: "35rem" }}>
        Completed Tasks
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
                          Task Status:
                        </h6>{" "}
                        {d.taskStatus}
                      </p>
                      <p>
                        <h6 style={{ display: "inline", color: "black" }}>
                          Completion Date:
                        </h6>{" "}
                        {d.CompletedTask}
                      </p>
                      <p>
                        <h6 style={{ display: "inline", color: "black" }}>
                          Feedback:
                        </h6>{" "}
                        {d.feedback}
                      </p>
                      <p class="card-text">
                        <h6 style={{ display: "inline", color: "black" }}>
                          Location:
                        </h6>{" "}
                        {d.CurrentLocation}
                      </p>
                    </div>
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

export default ViewTasksfeedback;

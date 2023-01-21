import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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

  const tasks = [{ taskName: list.taskName, startDate: list.startDate }];

  return (
    <>
      <p className="h3" style={{ marginTop: "7rem", marginLeft: "35rem" }}>
        Assigned Tasks
      </p>
      <div style={{ marginLeft: "5rem" }}>
        {/* <Row xs={1} md={3} className="g-4">
          {Array.from({ length: 9 }).map((_, idx) => (
            <Col>
              <Card>
               

                <Card.Body>
                  {list?.map((d) => (
                    <>
                      <Card.Title>{d.taskName}</Card.Title>
                      <Card.Text>{d.startDate}</Card.Text>
                      <Card.Text>{d.endDate}</Card.Text>
                      <Card.Text>{d.taskDescription}</Card.Text>
                    </>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row> */}
        {list?.map((d) => (
          <div className="container">
            <div className=" row-md-2 mb-2">
              <div class="card-deck">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{d.taskName}</h5>
                    <p class="card-text">{d.taskDescription}</p>
                    <p class="card-text">{d.targetLocation}</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted" >{d.startDate}</small>
                    
                    <small class="text-muted" style={{marginLeft:"5px" }}>{d.endDate}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewTasks;

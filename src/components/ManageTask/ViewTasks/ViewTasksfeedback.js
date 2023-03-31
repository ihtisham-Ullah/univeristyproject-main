import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";

function ViewTasksfeedback() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasksFeedback = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/getTasksFeedback", {
        method: "GET",
        crossDomain: true,
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-origin": "*",
        },
      });
      const data = await response.json();
      setList(data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
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
      }).then(() => {
        getTasksFeedback();
      });
    }
  }

  return (
    <>
      <p className="h3" style={{ marginTop: "7rem", marginLeft: "35rem" }}>
        Completed Tasks
      </p>
      <Container className="mt-5">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {list.map((d) => (
              <Col key={d._id}>
                <Card className="mb-3">
                  <Card.Header>{d.taskName}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <strong>Task Status:</strong> {d.taskStatus}
                    </Card.Text>
                    <Card.Text>
                      <strong>Completion Date:</strong> {d.CompletedTask}
                    </Card.Text>
                    <Card.Text>
                      <strong>Feedback:</strong> {d.feedback}
                    </Card.Text>
                    <Card.Text>
                      <strong>Location:</strong> {d.CurrentLocation}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteTasks(d._id)}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default ViewTasksfeedback;

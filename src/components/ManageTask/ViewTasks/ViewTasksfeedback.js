import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function ViewTasksfeedback() {
  const [list, setList] = useState([]);
  const [userPhoto, setUserPhoto] = useState("");
  const [showImage, setShowImage] = useState("");

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const firstName = location.state.firstName;

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

      const user = data.find((d) => d.firstName === firstName);
      if (user) {
        setUserPhoto(user.photo);
      }

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

  const filteredList = list.filter((d) => d.firstName === firstName);

  return (
    <>
      <div className="avatar-container text-center">
        {
          <img
            src={userPhoto}
            alt={filteredList.firstName}
            className="avatar"
            style={{
              maxWidth: "100px",
              borderRadius: "50%",
              marginTop: "8rem",
            }}
          />
        }
        <h2 className="salesperson-name">{firstName} </h2>
      </div>

      <p className="h3" style={{ marginTop: "3rem", marginLeft: "35rem" }}>
        Completed Tasks
      </p>
      <Container className="mt-5">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredList.map((d) => (
              <Col key={d._id}>
                <Card className="mb-3">
                  <Card.Header>{d.taskName}</Card.Header>
                  <Card.Body>
                  <Button variant="primary" onClick={() => setShowImage(!showImage)}>
            {showImage ? 'Hide Image' : 'Show Image'}
          </Button>
          {showImage && <Card.Img variant="top" src={d.image} />}
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
                      onClick={() => deleteTasks(d.feedbackId)}
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
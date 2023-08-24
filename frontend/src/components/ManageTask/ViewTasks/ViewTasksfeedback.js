import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import * as XLSX from "xlsx";
import { useLocation } from "react-router-dom";

function ViewTasksfeedback() {
  const [list, setList] = useState([]);
  const [userPhoto, setUserPhoto] = useState("");
  const [showImageMap, setShowImageMap] = useState({});
  const [showImage, setShowImage] = useState({});
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const firstName = location.state.firstName;

  const getTasksFeedback = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://workforce-web-backend.up.railway.app/getTasksFeedback", {
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
      fetch(`https://workforce-web-backend.up.railway.app/getTasksFeedback/${id}`, {
        method: "DELETE",
        crossDomain: true,
      }).then(() => {
        getTasksFeedback();
        setShowImage(prevState => {
          const newState = { ...prevState };
          delete newState[id];
          return newState;
        });
      });
    }
    
  }
  const filteredList = list.filter((d) => d.firstName === firstName);

  const exportToExcel = () => {
    const formattedData = filteredList.map((d) => ({
      TaskName: d.taskName,
      TaskStatus: d.taskStatus,
      CompletionDate: d.CompletedTask,
      Feedback: d.feedback,
      Location: d.CurrentLocation,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks Feedback");
    XLSX.writeFile(wb, "tasks_feedback.xlsx");
  };

  const handleShowImage = (id) => {
    setShowImageMap((prevShowImageMap) => ({
      ...prevShowImageMap,
      [id]: !prevShowImageMap[id],
    }));
  };

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
        <h2 className="salesperson-name">{firstName}</h2>
      </div>

      <p className="h3" style={{ marginTop: "3rem", marginLeft: "35rem" }}>
        Completed Tasks ({filteredList.length})
      </p>
      <button
        onClick={exportToExcel}
        style={{
          marginLeft: "80%",
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          background: "#f50057",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Export to Excel
      </button>

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
                    <Button
                      variant="primary"
                      onClick={() => handleShowImage(d._id)}
                    >
                      {showImageMap[d._id] ? "Hide Image" : "Show Image"}
                    </Button>
                    {showImageMap[d._id] && (
                      <Card.Img variant="top" src={d.image} />
                    )}
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

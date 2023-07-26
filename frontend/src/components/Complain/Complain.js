import React, { useState, useEffect } from "react";
import { Table, Image, Button } from "react-bootstrap";

function Complain() {
  const [complains, setComplains] = useState([]);

  async function fetchComplains() {
    const response = await fetch("http://localhost:5000/getComplain");
    const data = await response.json();
    setComplains(data);
  }

  useEffect(() => {
    fetchComplains();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this complain?")) {
      fetch(`http://localhost:5000/getComplain/${id}`, {
        method: "DELETE",
        crossDomain: true,
      })
        .then((result) => {
          result.json().then((resp) => {
            fetchComplains();
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <h2 style={{ marginLeft: "6rem", marginTop: "7rem" }}>Complaints</h2>
      <Table bordered hover style={{ marginLeft: "6rem", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Complain Type</th>
            <th>Complain</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {complains.map((complain) => (
            <tr key={complain.id}>
              <td>
                <Image
                  src={complain.photo}
                  roundedCircle
                  width={50}
                  height={50}
                  alt={complain.firstName}
                />
              </td>
              <td>{complain.firstName}</td>
              <td>{complain.type}</td>
              <td>{complain.message}</td>
              <td>{formatDateString(complain.date)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(complain.complainId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Complain;

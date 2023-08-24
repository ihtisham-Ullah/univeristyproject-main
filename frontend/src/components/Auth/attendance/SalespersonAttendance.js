import React, { useState, useEffect } from "react";
import "./attendance.css";
import { useLocation } from "react-router-dom";

function SalespersonAttendance() {
  const [rows, setRows] = useState([]);
  const [photo, setPhoto] = useState("");
  const location = useLocation();
  const selectedFirstName = location.state.firstName;

  const handleDeleteRow = async (id, index) => {
    try {
      await fetch(`https://workforce-web-backend.up.railway.app/viewattendance/${id}`, {
        method: "DELETE",
      }).then((result) => {
        result.json().then((resp) => {
          fetchData();
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalHours = (clockInTime, clockOutTime) => {
    const startTime = new Date(clockInTime);
    const endTime = new Date(clockOutTime);
    const diffTime = Math.abs(endTime - startTime);
    const diffSeconds = Math.ceil(diffTime / 1000);
    const diffHours = Math.floor(diffSeconds / 3600);
    const diffMinutes = Math.ceil((diffSeconds % 3600) / 60);

    if (diffHours === 0) {
      return `${diffMinutes} min`;
    } else {
      return `${diffHours} h ${diffMinutes} min`;
    }
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/viewattendance");
    const data = await response.json();
    const filteredData = data.filter(
      (row) => row.firstName === selectedFirstName
    );
    setRows(filteredData);
    const selectedSalesperson = data.find(
      (row) => row.firstName === selectedFirstName
    );
    if (selectedSalesperson) {
      setPhoto(selectedSalesperson.photo);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedFirstName]);

  return (
    <div>
      <div className="avatar-container text-center">
        {photo && (
          <img
            src={photo}
            alt={selectedFirstName}
            className="avatar"
            style={{
              maxWidth: "100px",
              borderRadius: "50%",
              marginTop: "8rem",
            }}
          />
        )}
        <h2 className="salesperson-name">{selectedFirstName} </h2>
      </div>

      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Clock In Time</th>
              <th>Clock Out Time</th>
              <th>Total Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rows) &&
              rows.map((row, index) => (
                <tr key={index}>
                  <td>{new Date(row.clockInTime).toLocaleDateString()}</td>
                  <td>{new Date(row.clockInTime).toLocaleTimeString()}</td>
                  <td>{new Date(row.clockOutTime).toLocaleTimeString()}</td>
                  <td>{getTotalHours(row.clockInTime, row.clockOutTime)}</td>
                  <td>
                    <button onClick={() => handleDeleteRow(row.attId, index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalespersonAttendance;

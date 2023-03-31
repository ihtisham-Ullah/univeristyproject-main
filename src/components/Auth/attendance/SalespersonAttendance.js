import React, { useState, useEffect } from "react";
import "./attendance.css";
import { useLocation } from "react-router-dom";

function SalespersonAttendance() {
  const [rows, setRows] = useState([]);
  const location = useLocation();
  const selectedFirstName = location.state.firstName;

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/viewattendance");
      const data = await response.json();
      const filteredData = data.filter(
        (row) => row.firstName === selectedFirstName
      );
      setRows(filteredData);
    };
    fetchData();
  }, [selectedFirstName]);

  return (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Name</th>
            <th>Date</th>
            <th>Clock In Time</th>
            <th>Clock Out Time</th>
            <th>Total Hours</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rows) &&
            rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <img src={row.photo} alt="User avatar" className="avatar" />
                </td>
                <td>{row.firstName}</td>
                <td>{new Date(row.clockInTime).toLocaleDateString()}</td>
                <td>{new Date(row.clockInTime).toLocaleTimeString()}</td>
                <td>{new Date(row.clockOutTime).toLocaleTimeString()}</td>
                <td>{getTotalHours(row.clockInTime, row.clockOutTime)}</td>
                <td>
                  <button onClick={() => handleDeleteRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalespersonAttendance;

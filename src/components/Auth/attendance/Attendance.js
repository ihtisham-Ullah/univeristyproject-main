import React, { useState, useEffect } from "react";
import "./attendance.css";
import { useNavigate, Link } from "react-router-dom";

function Attendance() {
  const [rows, setRows] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/viewattendance");
      const data = await response.json();
      setRows(data);
    };
    fetchData();
  }, []);

  const handleAttendanceClick = (firstName) => {
    navigate("/SalespersonAttendance", { state: { firstName } });
  };

  return (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Name</th>
            <th>View Attendance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <img src={row.photo} alt="User avatar" className="avatar" />
              </td>
              <td>{row.firstName}</td>
              <td>
                <button onClick={() => handleAttendanceClick(row.firstName)}>
                  Attendance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;

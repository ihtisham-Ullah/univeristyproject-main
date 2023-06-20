import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";

function ViewAllTasks() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getTasksFeedback");
        const data = await response.json();
        setRows(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const handleTaskClick = (firstName) => {
    navigate("/ViewTasksfeedback", { state: { firstName } });
  };

  const exportToExcel = () => {
    const formattedRows = rows.map((row) => ({
      firstName: row.firstName,
      taskName: row.taskName,
      taskStatus: row.taskStatus,
      CompletedTask: row.CompletedTask,
      CurrentLocation: row.CurrentLocation,
      feedback: row.feedback,
      email: row.email,
      address: row.address,
      phoneNo: row.phoneNo,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    XLSX.writeFile(wb, "tasks.xlsx");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const uniqueRows = rows.filter((row, index, self) => {
    return index === self.findIndex((r) => r.firstName === row.firstName);
  });

  return (
    <>
      <h3 className="text-center mb-4" style={{ marginTop: "5rem" }}>
        All Completed Tasks
      </h3>

      <button
  onClick={exportToExcel}
  style={{
    marginLeft: "85%",
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

      
      <div className="attendance-table-container" style={{marginTop:"-1rem"}}>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Salesperson</th>
              <th>Name</th>
              <th>View Task</th>
            </tr>
          </thead>
          <tbody>
            {uniqueRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <img src={row.photo} alt="User avatar" className="avatar" />
                </td>
                <td>{row.firstName}</td>
                <td>
                  <button onClick={() => handleTaskClick(row.firstName)}>
                    Tasks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewAllTasks;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function ViewAllTasks() {
  const [rows, setRows] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/getTasksFeedback");
      const data = await response.json();
      setRows(data);
    };
    fetchData();
  }, []);

  const handleTaskClick = (firstName) => {
    navigate("/ViewTasksfeedback", { state: { firstName } });
  };

  const uniqueRows = rows.filter((row, index, self) => {
    return index === self.findIndex((r) => r.firstName === row.firstName);
  });

  return (
    <>
      <h3 className="text-center mb-4" style={{ marginTop: "5rem" }}>
       All Completed Tasks
      </h3>

      <div className="attendance-table-container">
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

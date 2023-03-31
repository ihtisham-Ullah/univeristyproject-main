import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Table, Spinner, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";

function ViewTasks() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/getTasks", {
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
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  function deleteTasks(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`http://localhost:5000/getTasks/${id}`, {
        method: "DELETE",
        crossDomain: true,
      })
        .then((result) => {
          result.json().then((resp) => {
            getTasks();
          });
        })
        .catch((error) => console.log(error));
    }
  }
  const getBadgeColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "danger";
      case "normal":
        return "warning";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };
  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "tasks_data";
    const filteredList = list.map(
      ({
        taskDescription,
        taskType,
        targetLocation,
        taskPriority,
        startDate,
        endDate,
        taskName,
      }) => ({
        taskName,
        taskDescription,
        taskType,
        taskPriority,
        targetLocation,
        startDate,
        endDate,
      })
    );
    console.log(filteredList);
    const ws = XLSX.utils.json_to_sheet(filteredList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = window.URL.createObjectURL(data);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName + fileExtension;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ marginTop: "7rem" }}>
      <h1 className="text-center mb-4">Assigned Tasks</h1>

      <Button
        variant="primary"
        onClick={() => exportToExcel()}
        style={{ marginLeft: "75px" }}
      >
        Export to Excel
      </Button>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          style={{ marginLeft: "4.5rem" }}
        >
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Priority</th>

              <th>Location</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((d, i) => (
              <tr key={d._id}>
                <td>{d.taskName}</td>
                <td>{d.taskDescription}</td>
                <td>{d.taskType}</td>
                <td>
                  <span className={`badge bg-${getBadgeColor(d.taskPriority)}`}>
                    {d.taskPriority}
                  </span>
                </td>

                <td>{d.targetLocation}</td>
                <td>{new Date(d.endDate).toLocaleDateString()}</td>
                <td>
                  <Link
                    style={{ marginLeft: "0px", marginBottom: "1rem" }}
                    to={`/updateTasks/${d._id}`}
                    // className="btn btn-primary btn-sm"
                  >
                    <FaEdit /> Edit
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => deleteTasks(d._id)}
                    style={{ marginTop: "6px" }}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ViewTasks;

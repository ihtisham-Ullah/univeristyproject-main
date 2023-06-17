import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

function Dashboard() {
  const [taskCount, setTaskCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/getTasks")
      .then((response) => response.json())
      .then((data) => {
        const totalCount = data.length;
        setTaskCount(totalCount);
        createChart("taskChart", totalCount, "Assigned tasks", 'rgba(85, 85, 255, 0.9)', 'rgba(151, 90, 255, 0.9)');
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });

    fetch("http://localhost:5000/getTasksFeedback")
      .then((response) => response.json())
      .then((data) => {
        const totalCount = data.length;
        setFeedbackCount(totalCount);
        createChart("feedbackChart", totalCount, "Completed tasks", 'rgba(255, 99, 132, 0.9)', 'rgba(255, 159, 64, 0.9)');
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }, []);

  const createChart = (chartId, count, label, color1, color2) => {
    const ctx = document.getElementById(chartId).getContext("2d");
  
    // Create a gradient
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [label],
        datasets: [
          {
            label: "Count",
            data: [count],
            backgroundColor: gradient,
            borderColor: ["rgba(75, 192, 192, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                var label = context.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y; // Remove the currency formatting
                }
                return label;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

return (
  <div style={{ display: "flex", justifyContent: "space-around", marginTop:"7rem" }}>
    <div>
      <h3>Assigned Tasks</h3>
      <div style={{ width: "500px", height: "500px" }}>
        <canvas id="taskChart"></canvas>
      </div>
      <p>Total: {taskCount}</p>
    </div>
    <div>
      <h3>Completed Tasks</h3>
      <div style={{ width: "500px", height: "500px" }}>
        <canvas id="feedbackChart"></canvas>
      </div>
      <p>Total: {feedbackCount}</p>
    </div>
  </div>
);
}

export default Dashboard;
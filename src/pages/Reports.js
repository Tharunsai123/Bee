import React, { useState } from "react";
import "../CSS/Reports.css"; // Import the CSS file
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Reports = () => {
  // Sample historical data
  const dataSets = {
    "Hive Activity of Bees": { label: "Hive Activity (%)", data: [60, 65, 70, 68, 75], borderColor: "blue", fill: false },
    "Honey Production": { label: "Honey Production (kg)", data: [5, 8, 12, 10, 15], borderColor: "gold", fill: false },
    "Resource Consumption": { label: "Resource Consumption", data: [30, 40, 35, 50, 45], borderColor: "green", fill: false }
  };

  const labels = ["Jan", "Feb", "Mar", "Apr", "May"];

  // State for selected metrics
  const [selectedMetrics, setSelectedMetrics] = useState(["Hive Activity of Bees"]); // Match exact key names

  // Function to toggle metric selection
  const toggleMetric = (metric) => {
    setSelectedMetrics((prevMetrics) =>
      prevMetrics.includes(metric)
        ? prevMetrics.filter((m) => m !== metric)
        : [...prevMetrics, metric]
    );
  };

  // Function to get chart data based on selected metrics
  const getSelectedChartData = () => {
    return {
      labels,
      datasets: selectedMetrics
        .filter((metric) => dataSets[metric]) // Ensure only valid metrics are used
        .map((metric) => dataSets[metric])
    };
  };

  return (
    <div className="reports-container">
      <h1>📊 Hive Reports & Analysis</h1>

      {/* Performance Metrics (Clickable) */}
      <div className="performancemetrics">
        <h2>📈 Performance Metrics</h2>
        {Object.keys(dataSets).map((metric) => (
          <p
            key={metric}
            onClick={() => toggleMetric(metric)}
            className={`metric-box clickable ${selectedMetrics.includes(metric) ? "selected" : ""}`}
          >
            {metric}: {dataSets[metric].data[dataSets[metric].data.length - 1]}
          </p>
        ))}
      </div>

      {/* Trend Analysis Graphs */}
      <div className="charts">
        <h2>📊 Trends Over Time</h2>
        <Line data={getSelectedChartData()} />
      </div>

      <div className="section2">
        <div className="anomaly-detection">
          <h2>⚠️ Anomaly Alerts</h2>
          <p>⚠️ Anomaly detected in April: Sudden drop in bee activity!</p>
        </div>

        {/* Data Export */}
        <div className="data-export">
          <h2>📥 Export Reports</h2>
          <button>Download CSV</button>
          <button>Download PDF</button>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="feedback">
        <h2>💡 Suggestions & Feedback</h2>
        <textarea placeholder="Share insights or feedback..."></textarea>
        <button>Submit Feedback</button>
      </div>
    </div>
  );
};

export default Reports;

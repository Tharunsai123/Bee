import React, { useState, useEffect } from "react";
import "../CSS/HiveHealth.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const HiveHealth = () => {
  const [hiveHealth, setHiveHealth] = useState({
    temperature: 33.6,
    humidity: 63.0,
    co2: 389.4,
    pollen: 75.1,
    nectar: 73.3,
  });

  const [selectedMetrics, setSelectedMetrics] = useState(["temperature"]);

  const toggleMetric = (metric) => {
    setSelectedMetrics((prevMetrics) =>
      prevMetrics.includes(metric)
        ? prevMetrics.filter((m) => m !== metric)
        : [...prevMetrics, metric]
    );
  };

  const calculateHealthScore = () => {
    let score = 100;
    if (hiveHealth.temperature > 38 || hiveHealth.humidity < 40) score -= 20;
    if (hiveHealth.co2 > 600) score -= 15;
    if (hiveHealth.pollen < 50 || hiveHealth.nectar < 50) score -= 10;
    return Math.max(score, 0);
  };

  const healthScore = calculateHealthScore();
  const healthStatus =
    healthScore > 80 ? "Healthy ✅" : healthScore > 50 ? "Warning ⚠️" : "Critical 🚨";

  const historicalData = {
    temperature: [30, 32, 34, 33, 35],
    humidity: [55, 58, 60, 63, 61],
    co2: [380, 400, 420, 410, 430],
    pollen: [70, 75, 80, 78, 85],
    nectar: [65, 70, 75, 72, 80],
  };

  const getChartData = () => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: selectedMetrics.map((metric) => ({
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: historicalData[metric],
      borderColor:
        metric === "temperature"
          ? "red"
          : metric === "humidity"
          ? "blue"
          : metric === "co2"
          ? "green"
          : metric === "pollen"
          ? "orange"
          : "purple",
      fill: false,
    })),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setHiveHealth({
        temperature: (33 + Math.random() * 3).toFixed(1),
        humidity: (58 + Math.random() * 5).toFixed(1),
        co2: (380 + Math.random() * 50).toFixed(1),
        pollen: (70 + Math.random() * 10).toFixed(1),
        nectar: (65 + Math.random() * 15).toFixed(1),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hive-health-container">
      <h1>🐝 Hive Health Dashboard</h1>
      <div className="hive-health-status">
        <h2>
          Hive Health: <span className={healthStatus.includes("Critical") ? "critical" : healthStatus.includes("Warning") ? "warning" : "healthy"}>{healthStatus}</span>
        </h2>
        <p>Colony Health Score: {healthScore}/100</p>
      </div>
      <div className="live-monitoring">
        {["temperature", "humidity", "co2", "pollen", "nectar"].map((metric) => (
          <div
            key={metric}
            className={`metric-box ${selectedMetrics.includes(metric) ? "selected" : ""}`}
            onClick={() => toggleMetric(metric)}
          >
            <p><strong>{metric.charAt(0).toUpperCase() + metric.slice(1)}</strong></p>
            <p>{hiveHealth[metric]}{metric === "temperature" ? "°C" : metric === "co2" ? " ppm" : "%"}</p>
          </div>
        ))}
      </div>
      <div className="chart">
        <h2>📊 Selected Metrics Trends</h2>
        <Line data={getChartData()} />
      </div>
      <div className="bottom-sections">
        <div className="optimization-tips">
          <h2>🛠️ Optimization Tips</h2>
          <p>
            {selectedMetrics.includes("temperature") && hiveHealth.temperature > 38
              ? "🔥 High temperature detected! Improve ventilation."
              : selectedMetrics.includes("humidity") && hiveHealth.humidity < 40
              ? "💧 Low humidity! Increase water supply nearby."
              : selectedMetrics.includes("pollen") && hiveHealth.pollen < 50
              ? "🌼 Pollen shortage! Consider supplemental feeding."
              : "✅ Hive conditions are optimal!"}
          </p>
        </div>
        <div className="disease-detection">
          <h2>⚠️ Disease Detection</h2>
          <p>No signs of disease detected. Keep monitoring regularly!</p>
        </div>
      </div>
      <div className="community-forum">
        <h2>💬 Community Health Forum</h2>
        <p>Join the discussion and share your experiences with other beekeepers!</p>
        <button>Go to Forum</button>
      </div>
    </div>
  );
};

export default HiveHealth;

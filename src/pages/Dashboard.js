import React, { useState, useEffect } from "react";
import "../CSS/Dashboard.css";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

// Utility Functions
const generateRandomData = (baseValue, range) => {
  return (baseValue + Math.random() * range).toFixed(1);
};

// Register Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
  // State Management
  const [hiveData, setHiveData] = useState({
    temperature: 34,
    humidity: 60,
    weight: 20,
    co2: 400,
    light: 500,
    sound: 45
  });
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const navigate = useNavigate();

  // Historical Data Mapping
  const historicalDataMap = {
    temperature: { 
      label: "Temperature (°C)", 
      data: [30, 32, 34, 33, 35], 
      borderColor: "red",
      chartType: "line",
      fill: false,
      icon: "🌡️"
    },
    humidity: { 
      label: "Humidity (%)", 
      data: [55, 58, 60, 63, 61], 
      borderColor: "blue",
      chartType: "area",
      fill: true,
      icon: "💧"
    },
    weight: { 
      label: "Weight (kg)", 
      data: [18.5, 19.2, 20, 20.8, 21], 
      borderColor: "green",
      chartType: "bar",
      fill: false,
      icon: "⚖️"
    },
    co2: { 
      label: "CO2 Levels (ppm)", 
      data: [380, 390, 400, 410, 420], 
      borderColor: "purple",
      chartType: "line",
      fill: false,
      icon: "🛑"
    },
    light: { 
      label: "Light (lux)", 
      data: [450, 480, 500, 520, 490], 
      borderColor: "orange",
      chartType: "area",
      fill: true,
      icon: "💡"
    },
    sound: { 
      label: "Sound (dB)", 
      data: [40, 42, 45, 43, 47], 
      borderColor: "brown",
      chartType: "bar",
      fill: false,
      icon: "🔊"
    }
  };

  // Metric Toggle Function
  const toggleMetric = (metric) => {
    setSelectedMetrics((prevMetrics) => {
      return prevMetrics.includes(metric)
        ? prevMetrics.filter((m) => m !== metric)
        : [...prevMetrics, metric];
    });
  };

  // Chart Data Generation
  const generateChartData = (metrics) => {
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: metrics.map((metric) => ({
        label: historicalDataMap[metric].label,
        data: historicalDataMap[metric].data,
        borderColor: historicalDataMap[metric].borderColor,
        backgroundColor: historicalDataMap[metric].borderColor,
        fill: metrics.length > 1 ? false : historicalDataMap[metric].fill,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4
      })),
    };
  };

  // Chart Rendering
  const renderChart = () => {
    if (selectedMetrics.length === 0) {
      return <p>Select a metric to display chart</p>;
    }

    const metric = selectedMetrics[0];
    const chartData = generateChartData(selectedMetrics);
    
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: selectedMetrics.length > 1 
            ? 'Metric Comparison' 
            : `Avg ${historicalDataMap[metric].label} vs. Days`
        }
      }
    };

    // Render appropriate chart type
    switch (historicalDataMap[metric]?.chartType) {
      case "line":
        return <Line data={chartData} options={chartOptions} />;
      case "bar":
        return <Bar data={chartData} options={chartOptions} />;
      default:
        return <Line data={chartData} options={chartOptions} />;
    }
  };

  // Hive Health Status
  const calculateHealthStatus = () => {
    const { temperature, humidity } = hiveData;
    if (temperature > 38 || humidity < 40) return "Critical 🚨";
    if (temperature > 35) return "Warning ⚠️";
    return "Healthy ✅";
  };

  // Hive Locations
  const hiveLocations = [
    { id: 1, lat: 37.7749, lng: -122.4194, name: "Hive A" },
    { id: 2, lat: 40.7128, lng: -74.006, name: "Hive B" },
  ];

  // Export Data Function
  const exportData = (format) => {
    // Implement export logic
    console.log(`Exporting data in ${format} format`);
    // You can add actual export implementation here
  };

  // Real-time Data Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setHiveData({
        temperature: generateRandomData(34, 3),
        humidity: generateRandomData(60, 5),
        weight: generateRandomData(20, 2),
        co2: generateRandomData(400, 50),
        light: generateRandomData(500, 100),
        sound: generateRandomData(45, 10),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Render Dashboard
  return (
    <div className="dashboard-grid">
      {/* Header */}
      <div className="dashboard-header">
        <h1>🐝 Hive Monitoring Dashboard</h1>
      </div>

      {/* Parameters Section */}
      <div className="dashboard-parameters">
        <div className="sensor-boxes">
          {Object.keys(historicalDataMap).map((metric) => (
            <div 
              key={metric} 
              className={`sensor-box ${selectedMetrics.includes(metric) ? "selected" : ""}`} 
              onClick={() => toggleMetric(metric)}
            >
              <p>
                {historicalDataMap[metric].icon} {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </p>
              <h3>
                {hiveData[metric]} 
                {metric === "weight" ? "kg" : 
                 metric === "co2" ? "ppm" : 
                 metric === "temperature" ? "°C" : 
                 metric === "light" ? "lux" : 
                 metric === "sound" ? "dB" : "%"}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row - Graph and Map */}
      <div className="dashboard-second-row">
        {/* Charts Section */}
        <div className="dashboard-chart">
          <h2>📊 {selectedMetrics.length > 1 ? 'Metric Comparisons' : 'Historical Data'}</h2>
          <div className="chart-container">
            {renderChart()}
          </div>
        </div>

        {/* Map Container */}
        <div className="dashboard-map">
          <h2>📍 Hive Locations</h2>
          <MapContainer center={[37.7749, -122.4194]} zoom={4} className="map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {hiveLocations.map((hive) => (
              <Marker key={hive.id} position={[hive.lat, hive.lng]}>
                <Popup>{hive.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
          <button onClick={() => navigate("/fullmap")} className="fullmap-button">
            🔍 Open Full Map
          </button>
        </div>
      </div>

      {/* Third Row - Additional Information */}
      <div className="dashboard-third-row">
        {/* Hive Status */}
        <div className="dashboard-hive-status">
          <h2>Hive Health</h2>
          <div className="hive-status">
            <span className={
              calculateHealthStatus().includes("Critical") ? "critical" : 
              calculateHealthStatus().includes("Warning") ? "warning" : "healthy"
            }>
              {calculateHealthStatus()}
            </span>
          </div>
        </div>

        {/* Predictive Analytics */}
        <div className="dashboard-predictive-analytics">
          <h2>🔮 Predictive Analytics</h2>
          <p>Based on current trends, hive conditions are expected to remain stable.</p>
        </div>

        {/* Weather Forecast */}
        <div className="dashboard-weather">
          <h2>⛅ Weather Forecast</h2>
          <p>🌡️ Temperature: 30°C | ☀️ Clear Sky | 💨 Wind: 5 km/h</p>
        </div>

        {/* Data Export */}
        <div className="dashboard-export">
          <h2>📥 Export Data</h2>
          <div className="export-buttons">
            <button onClick={() => exportData('csv')}>Download CSV</button>
            <button onClick={() => exportData('pdf')}>Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
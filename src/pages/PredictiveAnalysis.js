import React, { useState, useEffect } from "react";
import "../CSS/PredictiveAnalysis.css";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PredictiveAnalysis = () => {
  // Live and Predicted Values
  const [liveData, setLiveData] = useState({
    temperature: 34,
    humidity: 60,
    weight: 20,
    co2: 400,
    light: 500,
    sound: 45,
  });

  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData({
        temperature: (30 + Math.random() * 10).toFixed(1),
        humidity: (50 + Math.random() * 20).toFixed(1),
        weight: (18 + Math.random() * 5).toFixed(1),
        co2: (350 + Math.random() * 100).toFixed(1),
        light: (400 + Math.random() * 200).toFixed(1),
        sound: (40 + Math.random() * 20).toFixed(1),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  const generateChartData = (metric) => {
    const actual = parseFloat(liveData[metric]);
    const predicted = actual + Math.random() * 5;

    return {
      labels: ["Actual", "Predicted"],
      datasets: [
        {
          label: `${metric.charAt(0).toUpperCase() + metric.slice(1)} Values`,
          data: [actual, predicted],
          backgroundColor: ["#3498db", "#e74c3c"],
        },
      ],
    };
  };

  const renderChart = () => {
    if (!selectedMetric) return null;

    const chartData = generateChartData(selectedMetric);
    return (
      <div className="chart-container">
        <div className="chart-wrapper">
          <h2>Predicted Graph for {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}</h2>
          <Bar 
            data={chartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }} 
          />
        </div>
      </div>
    );
  };

  return (
    <div className="predictive-analysis-container">
      <h1>🔮 Predictive Analysis Dashboard</h1>

      {/* Live and Predicted Values Grid */}
      <div className="live-predicted-grid">
        {Object.keys(liveData).map((metric, index) => (
          <div 
            key={index} 
            className="live-predicted-box" 
            onClick={() => handleMetricClick(metric)}
          >
            <h3>{metric.charAt(0).toUpperCase() + metric.slice(1)}</h3>
            <div className="value-box real-value">
              <p>Live Value</p>
              <h3>{liveData[metric]}</h3>
            </div>
            <div className="value-box predicted-value">
              <p>Predicted Value</p>
              <h3>{(parseFloat(liveData[metric]) + Math.random() * 5).toFixed(1)}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Render Chart */}
      {selectedMetric && renderChart()}

      {/* Main Section */}
      <div className="mainsection">
        {/* Confidence Interval Visualization */}
        <div className="confidenceinterval">
          <h2>📈 Confidence Intervals</h2>
          <p>Range: 21 - 27 kg honey production</p>
        </div>

        {/* Feedback for Model Improvement */}
        <div className="feedbacks">
          <h2>💡 Improve Predictive Models</h2>
          <textarea 
            placeholder="Share feedback on prediction accuracy..."
            maxLength={500}
          ></textarea>
          <button>Submit Feedback</button>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="calendar-bottom-section">
        <div className="calendar-container">
          <h2>📅 Select Date</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="custom-calendar"
          />
        </div>
        <div className="date-avg-parameters">
          <h2>📊 Average Parameters for {selectedDate.toDateString()}</h2>
          <div className="avg-parameters-row">
            <div className="avg-parameter-box">
              <h3>Avg Temperature</h3>
              <div className="avg-value">34.5°C</div>
            </div>
            <div className="avg-parameter-box">
              <h3>Avg Humidity</h3>
              <div className="avg-value">62%</div>
            </div>
            <div className="avg-parameter-box">
              <h3>Avg Weight</h3>
              <div className="avg-value">22 kg</div>
            </div>
            <div className="avg-parameter-box">
              <h3>Avg CO2</h3>
              <div className="avg-value">420 ppm</div>
            </div>
            <div className="avg-parameter-box">
              <h3>Avg Light</h3>
              <div className="avg-value">480 lux</div>
            </div>
            <div className="avg-parameter-box">
              <h3>Avg Sound</h3>
              <div className="avg-value">45 dB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalysis;
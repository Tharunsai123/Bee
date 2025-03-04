import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HiveHealth from "./pages/HiveHealth";
import Reports from "./pages/Reports";
import PredictiveAnalysis from "./pages/PredictiveAnalysis";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FullMap from "./pages/FullMap";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Public Routes (No Navbar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Private Routes (With Navbar) */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/hivehealth" element={<HiveHealth />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/predictive-analysis" element={<PredictiveAnalysis />} />
                <Route path="/fullmap" element={<FullMap />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

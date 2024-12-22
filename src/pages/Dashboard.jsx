import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-description">
          Welcome to your dashboard! This is a protected route. Only authenticated users can see this.
        </p>
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <p className="dashboard-stat-title">Total Users</p>
            <p className="dashboard-stat-value">1,234</p>
          </div>
          <div className="dashboard-stat-card">
            <p className="dashboard-stat-title">Active Sessions</p>
            <p className="dashboard-stat-value">567</p>
          </div>
          <div className="dashboard-stat-card">
            <p className="dashboard-stat-title">New Signups</p>
            <p className="dashboard-stat-value">89</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

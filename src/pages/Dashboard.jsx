// src/pages/Dashboard.jsx

import React from "react";

const Dashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>This is a protected route. Only authenticated users can see this.</p>
      {/* Add more dashboard content as needed */}
    </div>
  );
};

export default Dashboard;

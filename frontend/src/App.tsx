import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./pages/TaskList";
import SyncStatus from "./pages/SyncStatus";

const App: React.FC = () => {
  const appStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fef08a, #f472b6)", // bright gradient
    padding: "0",
    margin: "0",
    fontFamily: "'Inter', sans-serif",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />
        <div style={containerStyle}>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/sync" element={<SyncStatus />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

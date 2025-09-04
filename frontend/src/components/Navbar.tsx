import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkStyle = {
    position: "relative" as "relative",
    fontSize: "1.125rem",
    fontWeight: 600,
    textDecoration: "none",
    color: "#fff",
    marginRight: "1.5rem",
    transition: "color 0.3s ease",
    cursor: "pointer",
  };

  const underlineStyle = {
    content: '""',
    position: "absolute" as "absolute",
    left: 0,
    bottom: "-0.25rem",
    width: 0,
    height: "0.15rem",
    backgroundColor: "#f43f5e",
    transition: "width 0.3s ease",
  };

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #4f46e5 0%, #6366f1 100%)",
        color: "#fff",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          letterSpacing: "1px",
          userSelect: "none",
          textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        TaskSync <span style={{ color: "#f43f5e" }}>App</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            ...linkStyle,
            color: location.pathname === "/" ? "#f43f5e" : "#fff",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget.children[0] as HTMLSpanElement).style.width = "100%";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget.children[0] as HTMLSpanElement).style.width = "0";
          }}
        >
          Tasks
          <span style={{ ...underlineStyle, display: "block" }}></span>
        </Link>
        <Link
          to="/sync"
          style={{
            ...linkStyle,
            color: location.pathname === "/sync" ? "#f43f5e" : "#fff",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget.children[0] as HTMLSpanElement).style.width = "100%";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget.children[0] as HTMLSpanElement).style.width = "0";
          }}
        >
          Sync Status
          <span style={{ ...underlineStyle, display: "block" }}></span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

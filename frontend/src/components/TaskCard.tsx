import React, { useState } from "react";

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, completed, onEdit, onDelete }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        background: hover
          ? "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)"
          : "linear-gradient(135deg, #fcd1d1 0%, #fbc2eb 100%)",
        boxShadow: hover ? "0 10px 20px rgba(0,0,0,0.25)" : "0 4px 8px rgba(0,0,0,0.15)",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          color: completed ? "#9ca3af" : "#1f2937",
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ color: "#4b5563", marginTop: "0.5rem", lineHeight: "1.5" }}>
          {description}
        </p>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
        <button
          onClick={() => onEdit?.(id)}
          style={{
            backgroundColor: "#3b82f6", // bright blue
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2563eb")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3b82f6")}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(id)}
          style={{
            backgroundColor: "#f43f5e", // bright pink/red
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e11d48")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f43f5e")}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

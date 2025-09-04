import React, { useState } from "react";

interface TaskFormProps {
  onSubmit: (title: string, description?: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  submitText?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  submitText = "Add Task",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [hoverSubmit, setHoverSubmit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return alert("Title is required");
    onSubmit(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        marginBottom: "1.5rem",
        transition: "all 0.3s ease",
      }}
    >
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "8px",
          border: "2px solid #e5e7eb",
          marginBottom: "1rem",
          fontSize: "1rem",
          outline: "none",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
      />
      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "8px",
          border: "2px solid #e5e7eb",
          marginBottom: "1rem",
          fontSize: "1rem",
          outline: "none",
          transition: "all 0.3s ease",
          resize: "vertical",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
      />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "10px",
          border: "none",
          fontWeight: 600,
          fontSize: "1rem",
          color: "#fff",
          background: hoverSubmit
            ? "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)"
            : "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
          boxShadow: hoverSubmit
            ? "0 6px 12px rgba(34,197,94,0.5)"
            : "0 6px 12px rgba(59,130,246,0.5)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={() => setHoverSubmit(true)}
        onMouseLeave={() => setHoverSubmit(false)}
      >
        {submitText}
      </button>
    </form>
  );
};

export default TaskForm;

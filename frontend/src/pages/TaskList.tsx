import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Use environment variable for API base URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // for Vite


  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title: string, description?: string) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const editTask = async (id: string) => {
    const title = prompt("Enter new title");
    const description = prompt("Enter new description");
    if (!title) return;

    try {
      const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed: false }),
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #fef08a, #f472b6)", // vibrant gradient
    minHeight: "100vh",
    padding: "2rem",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
  };

  return (
    <div style={containerStyle}>
      <TaskForm onSubmit={addTask} />
      <div style={gridStyle}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

import express from "express";
import * as taskService from "../services/taskService";

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
});

router.get("/:id", async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({
      error: "Task not found",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
  }
  res.json(task);
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({
      error: "Title is required",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
  }
  const task = await taskService.createTask(title, description);
  res.status(201).json(task);
});

router.put("/:id", async (req, res) => {
  const updated = await taskService.updateTask(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({
      error: "Task not found",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
  }
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await taskService.deleteTask(req.params.id);
  res.status(204).send();
});

export default router;

import express from "express";
import { syncTasks, getSyncStatus } from "../services/syncService";

const router = express.Router();

router.post("/", async (req, res) => {
  const result = await syncTasks();
  res.json(result);
});

router.get("/status", async (req, res) => {
  const status = await getSyncStatus();
  res.json(status);
});

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks";
import syncRouter from "./routes/sync";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);
app.use("/api/sync", syncRouter);
app.use("/api/status", syncRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

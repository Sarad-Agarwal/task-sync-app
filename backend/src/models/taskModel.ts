import { initDB } from "../db";
import { Task } from "../types/task";

export const getDB = async () => {
  return initDB();
};

export const createTask = async (task: Task) => {
  const db = await getDB();
  await db.run(
    `INSERT INTO tasks 
      (id, title, description, completed, created_at, updated_at, is_deleted, sync_status, server_id, last_synced_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      task.id,
      task.title,
      task.description,
      task.completed ? 1 : 0,
      task.created_at,
      task.updated_at,
      task.is_deleted ? 1 : 0,
      task.sync_status,
      task.server_id,
      task.last_synced_at,
    ]
  );
  return task;
};

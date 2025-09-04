import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/task";
import { getDB } from "../models/taskModel";

export const getAllTasks = async (): Promise<Task[]> => {
  const db = await getDB();
  const rows = await db.all(`SELECT * FROM tasks WHERE is_deleted = 0`);
  return rows.map((r: any) => ({
    ...r,
    completed: !!r.completed,
    is_deleted: !!r.is_deleted,
  }));
};

export const getTaskById = async (id: string): Promise<Task | null> => {
  const db = await getDB();
  const row = await db.get(`SELECT * FROM tasks WHERE id = ?`, [id]);
  return row
    ? { ...row, completed: !!row.completed, is_deleted: !!row.is_deleted }
    : null;
};

export const createTask = async (title: string, description?: string) => {
  const db = await getDB();
  const now = new Date().toISOString();
  const task: Task = {
    id: uuidv4(),
    title,
    description: description || "",
    completed: false,
    created_at: now,
    updated_at: now,
    is_deleted: false,
    sync_status: "pending",
    server_id: null,
    last_synced_at: null,
  };

  await db.run(
    `INSERT INTO tasks 
    (id, title, description, completed, created_at, updated_at, is_deleted, sync_status, server_id, last_synced_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      task.id,
      task.title,
      task.description,
      0,
      task.created_at,
      task.updated_at,
      0,
      "pending",
      null,
      null,
    ]
  );

  return task;
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  const db = await getDB();
  const now = new Date().toISOString();

  await db.run(
    `UPDATE tasks SET title=?, description=?, completed=?, updated_at=?, sync_status=? WHERE id=?`,
    [updates.title, updates.description, updates.completed ? 1 : 0, now, "pending", id]
  );

  return getTaskById(id);
};

export const deleteTask = async (id: string) => {
  const db = await getDB();
  await db.run(`UPDATE tasks SET is_deleted=1, sync_status='pending' WHERE id=?`, [id]);
};

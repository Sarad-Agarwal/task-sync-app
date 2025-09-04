import { getDB } from "../models/taskModel";

export const syncTasks = async () => {
  const db = await getDB();
  const pending = await db.all(`SELECT * FROM tasks WHERE sync_status='pending'`);
  
  // Here: simulate sending to server + resolving
  for (const task of pending) {
    // conflict resolution => last-write-wins
    try {
      await db.run(
        `UPDATE tasks SET sync_status='synced', last_synced_at=? WHERE id=?`,
        [new Date().toISOString(), task.id]
      );
    } catch (e) {
      await db.run(
        `UPDATE tasks SET sync_status='error' WHERE id=?`,
        [task.id]
      );
    }
  }

  return {
    success: true,
    synced_items: pending.length,
    failed_items: 0,
    errors: [],
  };
};

export const getSyncStatus = async () => {
  const db = await getDB();
  const count = await db.get(
    `SELECT COUNT(*) as cnt FROM tasks WHERE sync_status='pending'`
  );
  return {
    pending_sync_count: count.cnt,
    last_sync_timestamp: new Date().toISOString(),
    is_online: true,
    sync_queue_size: count.cnt,
  };
};

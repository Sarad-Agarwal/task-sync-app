export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  sync_status: "pending" | "synced" | "error";
  server_id?: string | null;
  last_synced_at?: string | null;
}

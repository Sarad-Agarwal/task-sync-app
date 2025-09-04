import React, { useEffect, useState } from "react";

interface SyncStatusType {
  pending_sync_count: number;
  last_sync_timestamp: string;
  is_online: boolean;
  sync_queue_size: number;
}

const SyncStatus: React.FC = () => {
  const [status, setStatus] = useState<SyncStatusType | null>(null);

  // Use environment variable for API base URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/api/status`);
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch sync status");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const triggerSync = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sync`, { method: "POST" });
      const data = await res.json();
      alert(`✅ Synced ${data.synced_items} items, ⚠️ ${data.failed_items} failed`);
      fetchStatus();
    } catch (err) {
      console.error(err);
    }
  };

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #fef08a, #f472b6)",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#4f46e5",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <div style={cardStyle}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem", color: "#111827", textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}>
        Sync Status
      </h1>
      {status ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", color: "#111827", fontWeight: 500 }}>
          <p><strong>Pending Sync:</strong> {status.pending_sync_count}</p>
          <p><strong>Last Sync:</strong> {new Date(status.last_sync_timestamp).toLocaleString()}</p>
          <p><strong>Online:</strong> {status.is_online ? "✅ Yes" : "❌ No"}</p>
          <p><strong>Sync Queue Size:</strong> {status.sync_queue_size}</p>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6366f1")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
            onClick={triggerSync}
          >
            Trigger Sync
          </button>
        </div>
      ) : (
        <p style={{ color: "#374151", fontWeight: 500 }}>Loading...</p>
      )}
    </div>
  );
};

export default SyncStatus;

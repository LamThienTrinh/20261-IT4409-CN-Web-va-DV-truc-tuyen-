import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error("Dữ liệu người dùng không hợp lệ");
        if (active) setUsers(data);
      })
      .catch(err => {
        if (active && err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  if (loading) return <p role="status">Đang tải danh sách người dùng...</p>;
  if (error) return <p role="alert" className="error">Không tải được người dùng: {error}</p>;
  if (users.length === 0) return <p role="status">Chưa có người dùng.</p>;
  return <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}

createRoot(document.getElementById("root")).render(<UserList />);

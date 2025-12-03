import React, { useState } from "react";
import axios from "axios";

// Automatically switch between local dev and production
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/admin/login`, form);

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        window.location.href = "/admin";
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ width: 300, margin: "80px auto" }}>
      <h2>Admin Login</h2>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Login
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

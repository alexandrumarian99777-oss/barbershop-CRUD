export const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// Fix base URL to reach /admin (because admin is NOT under /api)
const ADMIN_BASE = API_BASE.replace("/api", "");

export async function updateAppointment(id, payload) {
  const res = await fetch(`${ADMIN_BASE}/admin/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

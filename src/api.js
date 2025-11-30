// src/api.js

export const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// Helper for making requests
export async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": process.env.REACT_APP_ADMIN_SECRET || "", // admin token if needed
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

// Create appointment (user)
export async function postAppointment(payload) {
  return request(`/appointments`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Get all appointments (admin)
export async function getAppointments() {
  return request(`/appointments`, { method: "GET" });
}

// Get booked times for a specific date
export async function getBookedTimes(date) {
  return request(`/appointments/booked/${date}`, { method: "GET" });
}

// Update appointment (admin)
export async function updateAppointment(id, data) {
  return request(`/appointments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// Delete appointment (admin)
export async function deleteAppointment(id) {
  return request(`/appointments/${id}`, {
    method: "DELETE",
  });
}

export default {
  postAppointment,
  getAppointments,
  getBookedTimes,
  updateAppointment,
  deleteAppointment,
  request,
};

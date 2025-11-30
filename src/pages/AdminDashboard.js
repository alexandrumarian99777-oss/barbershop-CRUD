import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortedAppointments, setSortedAppointments] = useState([]);
  const [editing, setEditing] = useState(null);

  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    status: "pending",
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    applySorting();
  }, [appointments, sortField, sortOrder]);

  const loadAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/appointments`);
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error("Error loading appointments:", err);
    }
  };

  const applySorting = () => {
    let sorted = [...appointments];

    sorted.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "date") {
        valA = new Date(`${a.date} ${a.time}`);
        valB = new Date(`${b.date} ${b.time}`);
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setSortedAppointments(sorted);
  };

  const startEdit = (appt) => {
    setEditing(appt._id);
    setForm({
      name: appt.name,
      phone: appt.phone,
      email: appt.email,
      service: appt.service,
      date: appt.date,
      time: appt.time,
      status: appt.status,
    });
  };

  const saveEdit = async () => {
    if (!editing) return;

    try {
      const res = await axios.put(`${API_BASE}/appointments/${editing}`, form);

      if (res.data.success) {
        setEditing(null);
        loadAppointments();
        alert("Updated");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating");
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete appointment?")) return;
    await axios.delete(`${API_BASE}/appointments/${id}`);
    loadAppointments();
  };

  // -------------------------------------------------
  // CONFIRM APPOINTMENT (EMAIL)
  // -------------------------------------------------
  const confirmAppointment = async (id) => {
    try {
      await axios.put(`${API_BASE}/appointments/confirm/${id}`);
      alert("Appointment confirmed & email sent.");
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert("Error confirming appointment");
    }
  };

  // -------------------------------------------------
  // ADDED: SMS CONFIRMATION FUNCTION
  // -------------------------------------------------
  const sendSMSConfirmation = async (id) => {
    try {
      await axios.put(`${API_BASE}/admin/approve/${id}`);
      alert("SMS sent successfully.");
      loadAppointments();
    } catch (err) {
      console.error(err);
      alert("Error sending SMS");
    }
  };

  return (
    <div className="admin-container" style={{ padding: "20px" }}>
      <Link to="/">Home</Link>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="date">Date + Time</option>
          <option value="name">Name</option>
          <option value="service">Service</option>
          <option value="status">Status</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {sortedAppointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th width="260">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedAppointments.map((appt) => (
                <tr key={appt._id}>
                  <td>{appt.name}</td>
                  <td>{appt.email}</td>
                  <td>{appt.phone}</td>
                  <td>{appt.service}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>{appt.status}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => startEdit(appt)}
                    >
                      Edit
                    </button>

                    <button
                      style={{
                        background: "#28a745",
                        color: "white",
                        padding: "6px 10px",
                        marginRight: "6px",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => confirmAppointment(appt._id)}
                    >
                      Confirm Email
                    </button>



                    <button
                      className="btn-delete"
                      onClick={() => deleteAppointment(appt._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* MOBILE CARDS */}
          <div className="admin-cards">
            {sortedAppointments.map((appt) => (
              <div key={appt._id} className="admin-card">
                <p><strong>Name:</strong> {appt.name}</p>
                <p><strong>Email:</strong> {appt.email}</p>
                <p><strong>Phone:</strong> {appt.phone}</p>
                <p><strong>Service:</strong> {appt.service}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Status:</strong> {appt.status}</p>

                <div className="card-actions">
                  <button className="btn-edit" onClick={() => startEdit(appt)}>
                    Edit
                  </button>

                  <button
                    style={{
                      background: "#28a745",
                      color: "white",
                      padding: "6px 10px",
                      marginRight: "6px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => confirmAppointment(appt._id)}
                  >
                    Confirm Email
                  </button>

                  {/* NEW SMS BUTTON MOBILE */}
                  

                  <button
                    className="btn-delete"
                    onClick={() => deleteAppointment(appt._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MODAL STAYS SAME */}
      {editing && (
        <div className="edit-modal-backdrop">
          <div className="edit-modal">
            <h3>Edit Appointment</h3>

            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />

            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
            />

            <input
              type="text"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              placeholder="Service"
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="done">Done</option>
            </select>

            <button className="btn-save" onClick={saveEdit}>Save</button>
            <button className="btn-cancel" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <style>{`
        body, html {
          overflow-y: auto !important;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .admin-table th, .admin-table td {
          padding: 10px;
          border: 1px solid #ccc;
        }

        .btn-edit {
          background: #2196F3;
          color: white;
          padding: 6px 10px;
          border: none;
          margin-right: 6px;
          cursor: pointer;
        }
        .btn-delete {
          background: #d9534f;
          color: white;
          padding: 6px 10px;
          border: none;
          cursor: pointer;
        }

        .admin-cards {
          display: none;
        }

        .admin-card {
          background: white;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 8px;
          box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
        }

        .edit-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          overflow-y: auto;
        }

        .edit-modal {
          background: white;
          padding: 20px;
          width: 90%;
          max-width: 400px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 90vh;
          overflow-y: auto;
        }

        @media (max-width: 800px) {
          .admin-table {
            display: none;
          }
          .admin-cards {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;

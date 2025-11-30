import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";

export default function BookingModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: ""
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]); // IMPORTANT
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate slots
  const generateSlots = () => {
    const slots = [];
    for (let h = 9; h <= 18; h++) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
      slots.push(`${String(h).padStart(2, "0")}:30`);
    }
    return slots;
  };

  // Load available slots when date selected
  useEffect(() => {
    if (form.date) {
      setAvailableTimes(generateSlots());
      loadBookedTimes(form.date); // <-- Load booked times on date change
    }
  }, [form.date]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: ""
      });
      setMsg("");
    }
  }, [isOpen]);

  // Load confirmed booked times from backend
  const loadBookedTimes = async (selectedDate) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/booked/${selectedDate}`);
      const data = await res.json();

      // Expecting: ["10:00", "17:30"]
      setBookedTimes(data);
    } catch (err) {
      console.error("Failed to load booked times", err);
    }
  };

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await api.postAppointment(form);
      setMsg("Appointment request sent. Await confirmation.");
    } catch (err) {
      setMsg(err?.error || "Slot Already Taken");
    }

    setLoading(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/70" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-gray-900 w-full max-w-md p-6 rounded-2xl"
      >
        <h3 className="text-xl font-bold">Book an Appointment</h3>

        <form onSubmit={submit} className="grid gap-3 mt-4">
          <input
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Your name"
            required
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={change}
            placeholder="Your email"
            required
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={change}
            placeholder="Phone"
            required
            className="p-3 rounded bg-gray-800"
          />

          <select
            name="service"
            value={form.service}
            onChange={change}
            required
            className="p-3 rounded bg-gray-800"
          >
            <option value="">Select service</option>
            <option value="Haircut">Haircut</option>
            <option value="Beard Trim">Beard Trim</option>
            <option value="Haircut + Beard">Haircut + Beard</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={change}
            required
            className="p-3 rounded bg-gray-800"
          />

          <select
            name="time"
            value={form.time}
            onChange={change}
            required
            disabled={!form.date}
            className="p-3 rounded bg-gray-800"
          >
            <option value="">Select time</option>

            {availableTimes.map((t) => (
              <option key={t} value={t} disabled={bookedTimes.includes(t)}>
                {t} {bookedTimes.includes(t) ? "(Booked)" : ""}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-black p-3 rounded"
          >
            Request
          </button>

          <button
            type="button"
            onClick={onClose}
            className="border border-gray-600 p-3 rounded"
          >
            Cancel
          </button>

          {msg && <p className="text-sm text-gray-300">{msg}</p>}
        </form>
      </motion.div>
    </div>
  );
}

import React, {useState} from 'react';
import api from '../api';
function generateTimeSlots(start = "09:00", end = "18:00") {
  const slots = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  while (h < endH || (h === endH && m <= endM)) {
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    slots.push(`${hh}:${mm}`);

    m += 30;
    if (m >= 60) {
      h++;
      m = 0;
    }
  }
  return slots;
}


export default function BookingForm(){
const [form, setForm] = useState({name:'', phone:'', date:'', time:''});
const [loading, setLoading] = useState(false);
const [msg, setMsg] = useState('');
const [email, setEmail] = useState("");
  


const change = (e) => setForm({...form, [e.target.name]: e.target.value});


const submit = async (e) =>{
e.preventDefault();
setLoading(true); setMsg('');
try{
await api.request('/appointments', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)});
setMsg('Appointment requested — waiting admin confirmation.');
setForm({name:'',phone:'',date:'',time:''});
}catch(err){
setMsg(err?.error || 'Error creating appointment');
}finally{setLoading(false)}
}


return (
<form onSubmit={submit} style={{display:'grid', gap:8}}>
<input name="name" placeholder="Your name" value={form.name} onChange={change} required />
<input 
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<input name="phone" placeholder="Phone" value={form.phone} onChange={change} required />
<input name="date" type="date" name="date" value={form.date} onChange={change} required />
<input name="time" type="time" name="time" value={form.time} onChange={change} required />
<button disabled={loading} type="submit">Request Booking</button>
{msg && <p>{msg}</p>}
</form>
)
}
// src/pages/Landing.jsx
import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Barbers from '../components/Barbers';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import BookingModal from '../components/BookingModal';


export default function Landing(){
const [open, setOpen] = useState(false);
return (
<div>
<Navbar onOpenBooking={()=>setOpen(true)} />
<main>
<Hero onOpenBooking={()=>setOpen(true)} />
<Services />
<Pricing />
<Barbers />
<Gallery />
<Testimonials />
</main>
<footer className="py-8 text-center text-gray-400">
<div className="container">© {new Date().getFullYear()} PrimeCut Barbershop — 123 Main St</div>
</footer>
<BookingModal isOpen={open} onClose={()=>setOpen(false)} />
</div>
)
}
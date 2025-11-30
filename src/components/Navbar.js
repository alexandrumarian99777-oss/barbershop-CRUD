import React from 'react';
export default function Navbar({onOpenBooking}){
return (
<header className="border-b border-gray-800 py-4 bg-gradient-to-b from-lux-gray/60 to-transparent">
<div className="container flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-2 flex items-center justify-center text-lux-black font-bold">PC</div>
<div>
<div className="text-lg font-bold">PrimeCut</div>
<div className="text-xs text-gray-400">Luxury Barbershop</div>
</div>
</div>
<nav className="hidden md:flex items-center gap-6 text-sm">
<a href="#services" className="hover:text-gold">Services</a>
<a href="#pricing" className="hover:text-gold">Pricing</a>
<a href="#barbers" className="hover:text-gold">Barbers</a>
<a href="#gallery" className="hover:text-gold">Gallery</a>
<button onClick={onOpenBooking} className="ml-4 bg-gold text-lux-black px-4 py-2 rounded-xl font-semibold">Book Now</button>
</nav>
<div className="md:hidden">
<button onClick={onOpenBooking} className="bg-gold text-lux-black px-3 py-2 rounded-lg">Book</button>
</div>
</div>
</header>
);
}
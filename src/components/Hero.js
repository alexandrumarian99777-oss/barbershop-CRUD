import React from 'react';
import { motion } from 'framer-motion';
export default function Hero({onOpenBooking}){
return (
<section className="py-20">
<div className="container grid md:grid-cols-2 gap-10 items-center">
<motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{duration:0.6}}>
<h1 className="text-5xl font-extrabold leading-tight">Look Sharp, Feel Unstoppable</h1>
<p className="mt-6 text-gray-300 max-w-xl">PrimeCut delivers precision haircuts and timeless grooming in an upscale, comfortable environment. Book a premium experience.</p>
<div className="mt-8 flex gap-4">
<button onClick={onOpenBooking} className="bg-gold px-6 py-3 rounded-full font-semibold text-lux-black shadow-lg">Book Appointment</button>
<a href="#gallery" className="border border-gray-700 px-6 py-3 rounded-full text-sm hover:border-gold">View Gallery</a>
</div>
<div className="mt-8 flex items-center gap-6 text-sm text-gray-400">
<div><strong className="text-black">20+</strong> Years of craft</div>
<div><strong className="text-black">Top-rated</strong> barbers</div>
<div><strong className="text-black">Easy</strong> online booking</div>
</div>
</motion.div>
<motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-lux-gray p-6">
{/* Mockup — replace with image or video */}
<div className="h-72 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center text-2xl text-gray-400">Barber shop hero image</div>
</motion.div>
</div>
</section>
);
}
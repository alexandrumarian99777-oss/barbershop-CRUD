// src/components/Barbers.jsx
import React from 'react';
const barbers = [
{name:'Marco', title:'Master Barber', desc:'15 years experience', img:''},
{name:'Alex', title:'Stylist', desc:'Fade specialist', img:''},
{name:'Jon', title:'Beard Expert', desc:'Straight razor master', img:''}
];
export default function Barbers(){
return (
<section id="barbers" className="py-14">
<div className="container">
<h3 className="text-3xl font-bold">Our Barbers</h3>
<div className="mt-6 grid md:grid-cols-3 gap-6">
{barbers.map(b=> (
<div key={b.name} className="bg-lux-gray p-6 rounded-2xl text-center">
<div className="w-32 h-32 mx-auto rounded-full bg-gray-800 mb-4 flex items-center justify-center text-xl text-white">{b.name[0]}</div>
<h4 className="font-semibold">{b.name}</h4>
<div className="text-sm text-gray-400">{b.title}</div>
<p className="mt-3 text-gray-300 text-sm">{b.desc}</p>
</div>
))}
</div>
</div>
</section>
)
}
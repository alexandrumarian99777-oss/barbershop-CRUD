import React from 'react';
const services = [
{title:'Classic Cut', desc:'Precision scissor and clipper cut. Tailored to your style.'},
{title:'Beard Trim', desc:'Razor finish for clean lines and soft edges.'},
{title:'Hot Towel Shave', desc:'Traditional straight-razor shave with hot towels.'},
{title:'Package — Groom & Style', desc:'Combo haircut + beard + styling.'}
];
export default function Services(){
return (
<section id="services" className="py-14">
<div className="container">
<h3 className="text-3xl font-bold">Services</h3>
<p className="mt-2 text-gray-400 max-w-2xl">Craftsmanship, attention to detail, and a premium experience.</p>
<div className="mt-8 grid md:grid-cols-2 gap-6">
{services.map(s=> (
<div key={s.title} className="bg-lux-gray p-6 rounded-2xl border border-gray-800 hover:border-gold transition">
<h4 className="font-semibold text-xl">{s.title}</h4>
<p className="mt-2 text-gray-300">{s.desc}</p>
</div>
))}
</div>
</div>
</section>
)
}
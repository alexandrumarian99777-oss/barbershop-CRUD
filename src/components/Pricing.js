import React from 'react';
const plans = [
{title:'Signature', price:'25', items:['Classic Cut','Neck shave','Styling']},
{title:'Deluxe', price:'40', items:['Signature + Beard Trim','Hot Towels']},
{title:'Premium', price:'65', items:['Full Grooming','Hot Towel Shave','Scalp Treatment']}
];
export default function Pricing(){
return (
<section id="pricing" className="py-14 bg-gradient-to-b from-transparent to-gray-950">
<div className="container">
<h3 className="text-3xl font-bold">Pricing</h3>
<div className="mt-8 grid md:grid-cols-3 gap-6">
{plans.map(p=> (
<div key={p.title} className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
<div className="flex items-baseline justify-between">
<h4 className="text-xl font-semibold text-white">{p.title}</h4>
<div className="text-3xl font-bold text-white">€{p.price}</div>
</div>
<ul className="mt-4 text-gray-400 space-y-2">
{p.items.map(i=> <li key={i}>• {i}</li>)}
</ul>
</div>
))}
</div>
</div>
</section>
)
}
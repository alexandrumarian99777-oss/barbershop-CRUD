import React from 'react';
const items = [
{text:'Great cut, absolutely recommend!', author:'Samuel'},
{text:'Best shave I have had in years.', author:'Peter'},
{text:'Clean shop and top-notch service.', author:'Ivan'}
];
export default function Testimonials(){
return (
<section className="py-14 bg-gradient-to-b from-transparent to-gray-950">
<div className="container">
<h3 className="text-3xl font-bold">What clients say</h3>
<div className="mt-6 grid md:grid-cols-3 gap-6">
{items.map((t,i)=> (
<div key={i} className="bg-gray-900 p-6 rounded-2xl">
<p className="text-gray-300">“{t.text}”</p>
<div className="mt-4 text-sm text-gray-400">— {t.author}</div>
</div>
))}
</div>
</div>
</section>
)
}
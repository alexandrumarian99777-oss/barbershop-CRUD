import React from 'react';
export default function Gallery(){
return (
<section id="gallery" className="py-14">
<div className="container">
<h3 className="text-3xl font-bold">Gallery</h3>
<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
{Array.from({length:8}).map((_,i)=> (
<div key={i} className="h-40 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-end p-3">
<div className="text-sm text-gray-300">Shot {i+1}</div>
</div>
))}
</div>
</div>
</section>
)
}
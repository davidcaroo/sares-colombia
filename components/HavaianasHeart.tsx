import React from 'react';

const HavaianasHeart = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
    <circle cx="100" cy="100" r="100" fill="#E31C2C" />
    {/* Left Sandal - Rotated */}
    <g transform="translate(75, 100) rotate(-20) scale(0.9)">
       {/* Sole: Wider at top, narrower at bottom */}
       <path d="M0,-50 C-18,-50 -18,0 -10,40 C-5,50 5,50 10,40 C18,0 18,-50 0,-50" fill="white" />
       {/* Strap: Y shape */}
       <path d="M-8,-25 Q0,5 0,15 Q0,5 8,-25" stroke="#E31C2C" strokeWidth="6" fill="none" strokeLinecap="round" />
       <circle cx="0" cy="15" r="3" fill="#E31C2C" />
    </g>
    {/* Right Sandal - Rotated */}
    <g transform="translate(125, 100) rotate(20) scale(0.9)">
       <path d="M0,-50 C-18,-50 -18,0 -10,40 C-5,50 5,50 10,40 C18,0 18,-50 0,-50" fill="white" />
       <path d="M-8,-25 Q0,5 0,15 Q0,5 8,-25" stroke="#E31C2C" strokeWidth="6" fill="none" strokeLinecap="round" />
       <circle cx="0" cy="15" r="3" fill="#E31C2C" />
    </g>
  </svg>
);

export default HavaianasHeart;
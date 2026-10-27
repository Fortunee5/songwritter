const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
export default function Icon({ name }) {
  const s = { viewBox: '0 0 24 24', width: 24, height: 24, 'aria-hidden': true, ...p }
  switch (name) {
    case 'spotify': return <svg {...s}><circle cx="12" cy="12" r="9.5" /><path d="M7 9.5c3.5-1 7-.7 10 1M7.5 12.5c3-.8 6-.5 8.5 1M8 15.5c2.5-.6 5-.4 7 .8" /></svg>
    case 'apple': return <svg {...s}><path d="M9 18V6l9-2v12" /><circle cx="7" cy="18" r="2" /><circle cx="16" cy="16" r="2" /></svg>
    case 'youtube': return <svg {...s}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" /></svg>
    case 'instagram': return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" /></svg>
    case 'tiktok': return <svg {...s}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.5 2 4 4.5 4.2" /></svg>
    case 'x': return <svg {...s}><path d="M4 4l16 16M20 4L4 20" /></svg>
    default: return null
  }
}

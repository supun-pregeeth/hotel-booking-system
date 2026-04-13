import { Link } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-950/80" />
      </div>
      <div className="relative text-center max-w-lg">
        <Compass size={32} className="text-gold-300 mx-auto mb-6 opacity-80" />
        <p className="text-gold-300 text-xs tracking-widest uppercase font-sans mb-4">Lost at Sea</p>
        <h1 className="font-display text-7xl text-white font-normal mb-4">404</h1>
        <p className="font-display text-2xl text-white/80 italic mb-4">This page has drifted away.</p>
        <p className="text-white/50 font-sans text-sm leading-relaxed mb-10">
          The page you're looking for may have been moved, or perhaps it never existed. Let us guide you back to calmer waters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            Return Home <ArrowRight size={14} />
          </Link>
          <Link to="/rooms" className="btn-ghost-white">
            Explore Rooms
          </Link>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Maximize, ArrowRight, Images } from 'lucide-react'

export default function RoomCard({ room, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group bg-white overflow-hidden card-hover cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-64" onClick={onClick}>
        {/* Main image */}
        <img
          src={room.gallery ? room.gallery[0] : room.image}
          alt={room.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />

        {/* Badge */}
        {room.badge && (
          <div className="absolute top-4 left-4 bg-gold-400 text-forest-950 text-[10px] tracking-widest uppercase px-3 py-1 font-sans font-medium">
            {room.badge}
          </div>
        )}

        {/* Photo count pill — top right */}
        {room.gallery && room.gallery.length > 1 && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 text-white px-2.5 py-1 text-[10px] font-sans backdrop-blur-sm">
            <Images size={11} />
            {room.gallery.length} photos
          </div>
        )}

        {/* Hover overlay — "View Photos" CTA */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? 'bg-forest-950/40' : 'bg-transparent'}`}>
          <span className={`flex items-center gap-2 text-white text-xs tracking-widest uppercase font-sans border border-white px-4 py-2.5 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <Images size={13} />View Photos
          </span>
        </div>

        {/* Price — bottom right */}
        <div className="absolute bottom-4 right-4 text-right">
          <p className="text-white/60 text-xs font-sans">from</p>
          <p className="text-white font-display text-2xl">${room.price}</p>
          <p className="text-white/60 text-xs font-sans">per night</p>
        </div>
      </div>

      {/* Thumbnail strip */}
      {room.gallery && room.gallery.length > 1 && (
        <div className="flex gap-1 px-1 pt-1 bg-forest-950" onClick={onClick}>
          {room.gallery.slice(0, 4).map((img, i) => (
            <div key={i} className="flex-1 h-10 overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <p className="section-tag mb-1">{room.category}</p>
          <h3 className="font-display text-xl text-forest-900">{room.title}</h3>
        </div>

        <p className="text-sm text-forest-600 leading-relaxed mb-4 line-clamp-2">{room.description}</p>

        <div className="flex items-center gap-5 text-xs text-forest-500 mb-4 font-sans">
          <span className="flex items-center gap-1.5"><Maximize size={12} />{room.size}</span>
          <span className="flex items-center gap-1.5"><Users size={12} />{room.guests} Guests</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {room.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-[10px] tracking-wider uppercase px-2.5 py-1 bg-forest-50 text-forest-600 font-sans border border-forest-100">
              {a}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-sand">
          <button onClick={onClick}
            className="text-xs tracking-widest uppercase font-sans text-forest-900 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2 font-medium">
            View Details <ArrowRight size={12} />
          </button>
          <Link to="/booking" onClick={e => e.stopPropagation()}
            className="text-xs text-forest-400 hover:text-forest-700 font-sans transition-colors border border-sand px-3 py-1.5 hover:border-forest-300">
            Reserve
          </Link>
        </div>
      </div>
    </div>
  )
}

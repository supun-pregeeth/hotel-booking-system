import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight, Users, Maximize, Star, ArrowRight, Check, ZoomIn } from 'lucide-react'

export default function RoomModal({ room, onClose }) {
  const [activeImg, setActiveImg] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const prev = useCallback(() => setActiveImg(i => (i - 1 + room.gallery.length) % room.gallery.length), [room.gallery.length])
  const next = useCallback(() => setActiveImg(i => (i + 1) % room.gallery.length), [room.gallery.length])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') { if (zoomed) setZoomed(false); else onClose() }
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose, prev, next, zoomed])

  // Zoom lightbox
  if (zoomed) return (
    <div className="fixed inset-0 z-[60] bg-forest-950/98 flex items-center justify-center" onClick={() => setZoomed(false)}>
      <button onClick={() => setZoomed(false)} className="absolute top-5 right-5 text-white/60 hover:text-white p-2 z-10">
        <X size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3">
        <ChevronLeft size={28} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3">
        <ChevronRight size={28} />
      </button>
      <img
        src={room.gallery[activeImg]}
        alt={`${room.title} ${activeImg + 1}`}
        className="max-w-5xl w-full mx-12 max-h-[88vh] object-contain"
        onClick={e => e.stopPropagation()}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {room.gallery.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImg ? 'bg-gold-300 w-4' : 'bg-white/30'}`} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-forest-950/75 backdrop-blur-sm" />

      <div
        className="relative bg-cream w-full md:max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/95 flex items-center justify-center text-forest-700 hover:bg-white hover:text-forest-900 transition-colors shadow-md"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="grid md:grid-cols-2 min-h-0">
          {/* ── LEFT: Photo Gallery ── */}
          <div className="relative bg-forest-950 flex flex-col">
            {/* Main image */}
            <div className="relative overflow-hidden" style={{ height: '360px' }}>
              <img
                key={activeImg}
                src={room.gallery[activeImg]}
                alt={`${room.title} ${activeImg + 1}`}
                className="w-full h-full object-cover"
                style={{ animation: 'fadeIn 0.35s ease' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 to-transparent pointer-events-none" />

              {/* Arrows */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight size={18} />
              </button>

              {/* Counter + Zoom */}
              <div className="absolute bottom-3 left-0 right-0 px-4 flex items-center justify-between">
                <span className="bg-black/50 text-white text-xs font-sans px-2.5 py-1">
                  {activeImg + 1} / {room.gallery.length}
                </span>
                <button
                  onClick={() => setZoomed(true)}
                  className="flex items-center gap-1.5 bg-black/50 text-white text-xs font-sans px-2.5 py-1 hover:bg-black/70 transition-colors"
                >
                  <ZoomIn size={12} />Expand
                </button>
              </div>

              {/* Badge */}
              {room.badge && (
                <div className="absolute top-4 left-4 bg-gold-400 text-forest-950 text-[10px] tracking-widest uppercase px-3 py-1 font-sans font-medium">
                  {room.badge}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-1.5 p-2.5 bg-forest-950">
              {room.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative flex-1 overflow-hidden transition-all duration-200 ${activeImg === idx ? 'ring-2 ring-gold-400 ring-offset-1 ring-offset-forest-950' : 'opacity-50 hover:opacity-80'}`}
                  style={{ height: '52px' }}
                  aria-label={`Photo ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5 py-2 bg-forest-950">
              {room.gallery.map((_, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`rounded-full transition-all duration-200 ${i === activeImg ? 'bg-gold-400 w-4 h-1.5' : 'bg-white/20 w-1.5 h-1.5'}`} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="p-7 md:p-8 flex flex-col overflow-y-auto bg-cream">
            <div className="mb-4">
              <p className="text-gold-500 text-[10px] tracking-widest uppercase font-sans font-medium mb-1">{room.category}</p>
              <h2 className="font-display text-3xl text-forest-900 leading-tight mb-2">{room.title}</h2>
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#c9932a" className="text-gold-500" />)}
                <span className="text-xs text-forest-400 font-sans ml-1.5">Luxury Collection</span>
              </div>

              <div className="flex items-center gap-6 text-sm font-sans text-forest-500 mb-4">
                <span className="flex items-center gap-1.5"><Maximize size={13} />{room.size}</span>
                <span className="flex items-center gap-1.5"><Users size={13} />{room.guests} Guests</span>
              </div>

              <p className="text-forest-600 font-sans text-sm leading-relaxed">
                {room.longDescription || room.description}
              </p>
            </div>

            <div className="h-px bg-sand my-5" />

            {/* Amenities */}
            <div className="mb-5">
              <p className="text-[10px] tracking-widest uppercase text-forest-400 font-sans mb-3">Room Features</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {room.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2 text-sm font-sans text-forest-700">
                    <Check size={13} className="text-gold-500 shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-sand mb-5" />

            {/* Price + includes */}
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-forest-400 text-xs font-sans">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl text-forest-900">${room.price}</span>
                  <span className="text-forest-400 text-sm font-sans">/ night</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-forest-400 text-xs font-sans mb-1">Includes</p>
                <p className="text-forest-700 text-xs font-sans leading-relaxed">
                  Breakfast · Wi-Fi<br />Airport Transfers
                </p>
              </div>
            </div>

            <Link
              to={`/booking?room=${encodeURIComponent(room.title)}`}
              onClick={onClose}
              className="btn-primary justify-center"
            >
              Reserve This Room <ArrowRight size={14} />
            </Link>

            <p className="text-center text-xs text-forest-400 font-sans mt-3">
              Free cancellation · Best rate guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

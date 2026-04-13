import { useState } from 'react'
import RoomCard from '../components/RoomCard'
import Lightbox from '../components/Lightbox'
import RoomModal from '../components/RoomModal'
import { rooms, galleryImages } from '../data'
import { useReveal } from '../hooks'

const CATEGORIES = ['All', 'Deluxe', 'Suite', 'Ocean View']

export default function Rooms() {
  const [filter, setFilter] = useState('All')
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [tab, setTab] = useState('rooms')
  const headerRef = useReveal()

  const filtered = filter === 'All' ? rooms : rooms.filter(r => r.category === filter)

  return (
    <div className="grain">
      <section className="relative h-[50vh] min-h-72 flex items-end pb-16">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=85" alt="Rooms" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gold-300 text-xs tracking-widest uppercase font-sans mb-3">Rooms & Suites</p>
          <h1 className="font-display text-5xl md:text-6xl text-white font-normal">Your Sanctuary Awaits</h1>
        </div>
      </section>

      <div className="bg-white border-b border-sand sticky top-[60px] z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex gap-8">
          {[['rooms', 'Rooms & Suites'], ['gallery', 'Gallery']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`py-4 text-xs tracking-widest uppercase font-sans border-b-2 transition-colors duration-200 ${tab === key ? 'border-forest-900 text-forest-900' : 'border-transparent text-forest-400 hover:text-forest-700'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'rooms' && (
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div ref={headerRef} className="reveal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="section-tag mb-1">The Collection</p>
              <h2 className="font-display text-3xl text-forest-900">
                {filter === 'All' ? `All ${rooms.length} Rooms` : `${filtered.length} ${filter} Room${filtered.length > 1 ? 's' : ''}`}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setFilter(c)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase font-sans border transition-all duration-200 ${filter === c ? 'bg-forest-900 text-white border-forest-900' : 'border-sand text-forest-600 hover:border-forest-400'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-forest-400 font-sans mb-8 italic">Click any room to explore photos and details.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(r => (
              <RoomCard key={r.id} room={r} onClick={() => setSelectedRoom(r)} />
            ))}
          </div>
        </section>
      )}

      {tab === 'gallery' && (
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-tag mb-1">Our World</p>
            <h2 className="font-display text-3xl text-forest-900">Through the Lens</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((img, idx) => (
              <div key={img.id}
                className={`overflow-hidden cursor-pointer group relative ${idx === 0 || idx === 5 ? 'col-span-2' : ''}`}
                onClick={() => setLightboxIdx(idx)}>
                <img src={img.src} alt={img.alt}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${idx === 0 || idx === 5 ? 'h-72 md:h-96' : 'h-48 md:h-64'}`} />
                <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-xs tracking-widest uppercase font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white px-4 py-2">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedRoom && <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}

      {lightboxIdx !== null && (
        <Lightbox images={galleryImages} current={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => (i - 1 + galleryImages.length) % galleryImages.length)}
          onNext={() => setLightboxIdx(i => (i + 1) % galleryImages.length)} />
      )}
    </div>
  )
}

import { useReveal } from '../hooks'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const missionCards = [
  { tag: 'Our Mission', title: 'Unhurried luxury', body: 'We believe the finest gift we can offer our guests is time — time freed from haste, from noise, from expectation. Every decision we make, from staffing to planting, honours this.' },
  { tag: 'Our Vision', title: 'A living heritage', body: 'To be the custodian of Galle\'s historic fort, employing its artisans, championing its cuisine, and ensuring that future generations inherit something worth preserving.' },
  { tag: 'Our Promise', title: 'Personal always', body: 'No script. No rote greeting. We train our people to listen — to the rhythm of each guest — and respond with something genuine, something only The Grand Galle can offer.' },
]

function MissionCard({ card }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal">
      <p className="text-gold-300 text-xs tracking-widest uppercase font-sans mb-3">{card.tag}</p>
      <h3 className="font-display text-2xl text-white font-normal mb-4">{card.title}</h3>
      <div className="w-8 h-px bg-gold-400 mb-5" />
      <p className="text-white/60 font-sans text-sm leading-relaxed">{card.body}</p>
    </div>
  )
}

export default function About() {
  const storyRef = useReveal()
  const propertyRef = useReveal()
  const ctaRef = useReveal()

  return (
    <div className="grain">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-80 flex items-end pb-16">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=85" alt="Grand Galle" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gold-300 text-xs tracking-widest uppercase font-sans mb-3">Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl text-white font-normal">The Grand Galle</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={storyRef} className="reveal">
            <p className="section-tag mb-4">Heritage</p>
            <h2 className="section-title mb-6">A Story Over<br />A Century Old</h2>
            <div className="flex items-center gap-4 mb-6">
              <span className="line-accent"></span>
              <span className="text-gold-400">✦</span>
            </div>
            <p className="text-forest-600 font-sans leading-relaxed">
              Built within the ramparts of Galle Fort — a UNESCO World Heritage Site — The Grand Galle began as a governor's residence in 1897. Through Portuguese, Dutch, and British colonial chapters, this coral-stone estate absorbed the culture and craft of each era. In 2010, it was carefully restored by a family of architects and hoteliers who believed that luxury and legacy could coexist. Today, it stands as the southern coast's most quietly revered address.
            </p>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=85" alt="Heritage" className="w-full h-[480px] object-cover" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-100 -z-10 hidden md:block" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-forest-900 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {missionCards.map(card => <MissionCard key={card.tag} card={card} />)}
          </div>
        </div>
      </section>

      {/* Property */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center md:flex-row-reverse">
          <div className="relative md:order-2">
            <img src="https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=85" alt="Property" className="w-full h-[480px] object-cover" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-forest-100 -z-10 hidden md:block" />
          </div>
          <div ref={propertyRef} className="reveal md:order-1">
            <p className="section-tag mb-4">The Property</p>
            <h2 className="section-title mb-6">18 Rooms.<br /><em>One Soul.</em></h2>
            <div className="flex items-center gap-4 mb-6">
              <span className="line-accent"></span>
              <span className="text-gold-400">✦</span>
            </div>
            <p className="text-forest-600 font-sans leading-relaxed mb-8">
              Each of our 18 rooms and suites occupies a distinct character — some face the Dutch canal, others peer through centuries-old mango trees at the ocean beyond. All share hand-embroidered linens from a family workshop in Kandy, handmade ceramic bathroomware from Matara potters, and a silence that city hotels cannot manufacture.
            </p>
            <Link to="/rooms" className="btn-outline flex items-center gap-2 w-fit">
              Explore All Rooms <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&q=80',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80',
            'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&q=80',
          ].map((src, i) => (
            <img key={i} src={src} alt="Property" className="w-full h-48 md:h-64 object-cover hover:opacity-90 transition-opacity duration-300" />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-50 py-20 px-6 text-center">
        <div ref={ctaRef} className="reveal max-w-2xl mx-auto">
          <p className="section-tag mb-4">Ready to Arrive?</p>
          <h2 className="section-title mb-6">We are waiting<br /><em>to welcome you.</em></h2>
          <Link to="/booking" className="btn-primary">Make a Reservation</Link>
        </div>
      </section>
    </div>
  )
}

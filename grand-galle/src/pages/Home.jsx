import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Star, Waves, Utensils, Sparkles, Wind } from 'lucide-react'
import { useReveal } from '../hooks'
import { testimonials, amenities } from '../data'

function BookingBar() {
  const [form, setForm] = useState({ checkin: '', checkout: '', guests: '2' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="bg-white/95 backdrop-blur-md shadow-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end max-w-4xl mx-auto">
      <div>
        <label className="block text-xs tracking-widest uppercase text-forest-500 mb-2 font-sans">Check In</label>
        <input type="date" className="input-luxury" value={form.checkin} onChange={e => set('checkin', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs tracking-widest uppercase text-forest-500 mb-2 font-sans">Check Out</label>
        <input type="date" className="input-luxury" value={form.checkout} onChange={e => set('checkout', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs tracking-widest uppercase text-forest-500 mb-2 font-sans">Guests</label>
        <select className="input-luxury" value={form.guests} onChange={e => set('guests', e.target.value)}>
          {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
        </select>
      </div>
      <Link to="/booking" className="btn-primary justify-center h-[46px]">
        Check Availability
      </Link>
    </div>
  )
}

function TestimonialCard({ t }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal bg-white p-8 relative">
      <div className="flex gap-1 mb-4">
        {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={12} fill="#c9932a" className="text-gold-500" />)}
      </div>
      <p className="font-display text-lg text-forest-800 leading-relaxed mb-6 italic">"{t.text}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-sand">
        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-sans text-sm font-medium text-forest-900">{t.name}</p>
          <p className="font-sans text-xs text-forest-400">{t.location} · {t.stay}</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const highlightRef = useReveal()
  const amRef = useReveal()
  const testimonialRef = useReveal()

  return (
    <div className="grain">
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[680px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1800&q=90"
            alt="The Grand Galle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-950/50 to-forest-950/50" />
        </div>

        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-300 text-xs tracking-widest uppercase font-sans mb-6 animate-fade-in">
            Galle, Sri Lanka · Est. 1897
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-tight animate-fade-up mb-6 opacity-10">
            A Timeless Escape<br />
            <em className="font-heading italic text-4xl md:text-6xl opacity-85">in Galle</em>
          </h1>
          <p className="text-white/90 font-sans text-base md:text-lg ...">
            Where the ancient fort meets the Indian Ocean — a sanctuary of calm, culture, and tropical splendour.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-10 justify-center animate-fade-up">
            <Link to="/booking" className="btn-primary shadow-lg hover:scale-105 transition duration-300 ">Book Your Stay</Link>
            <Link to="/rooms" className="btn-ghost-white">Explore Rooms</Link>
          </div>
        </div>

        <a href="#booking" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce">
          <ChevronDown size={24} />
        </a>
      </section>

      {/* ── QUICK BOOKING ── */}
      <section id="booking" className="relative -mt-8 z-10 px-6">
        <BookingBar />
      </section>

      {/* ── INTRO STRIP ── */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <div ref={highlightRef} className="reveal">
          <p className="section-tag mb-4">Our Philosophy</p>
          <h2 className="section-title mb-6">A rare kind of quiet.<br />A rare kind of beauty.</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="line-accent"></span>
            <span className="text-gold-400 text-lg">✦</span>
            <span className="line-accent"></span>
          </div>
          <p className="text-forest-600 font-sans leading-relaxed text-base max-w-2xl mx-auto">
            Nestled behind the ramparts of Galle's 16th-century Dutch fort, The Grand Galle is not merely a hotel.
            It is a living heritage — restored colonial architecture, tropical gardens descending to the sea,
            and the unhurried grace that only truly exclusive places possess.
          </p>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="bg-forest-900 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-300 text-xs tracking-widest uppercase font-sans mb-3">The Collection</p>
            <h2 className="font-display text-4xl md:text-5xl text-white font-normal">Curated Experiences</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            {[
              {
                icon: <Waves size={20} className="text-gold-300" />,
                label: 'Rooms & Suites',
                title: '18 Exceptional Sanctuaries',
                desc: 'From garden retreats to clifftop villas, each space is a world unto itself.',
                img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
                link: '/rooms',
              },
              {
                icon: <Utensils size={20} className="text-gold-300" />,
                label: 'Dining',
                title: 'Ceylonese Cuisine Reimagined',
                desc: 'Our chef weaves spice routes and family memory into every plate.',
                img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
                link: '/about',
              },
              {
                icon: <Sparkles size={20} className="text-gold-300" />,
                label: 'Wellness',
                title: 'Ancient Healing, Modern Calm',
                desc: 'A full Ayurvedic spa program guided by resident wellness practitioners.',
                img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
                link: '/about',
              },
            ].map((h) => (
              <Link key={h.label} to={h.link} className="group relative overflow-hidden h-96 block">
                <img src={h.img} alt={h.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 mb-2">{h.icon}<p className="text-gold-300 text-xs tracking-widest uppercase font-sans">{h.label}</p></div>
                  <h3 className="font-display text-2xl text-white font-normal mb-2">{h.title}</h3>
                  <p className="text-white/60 text-sm font-sans leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{h.desc}</p>
                  <span className="text-gold-300 text-xs tracking-widest uppercase font-sans flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Discover <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={amRef} className="reveal">
              <p className="section-tag mb-4">At The Grand Galle</p>
              <h2 className="section-title mb-6">Every detail,<br /><em>considered.</em></h2>
              <p className="text-forest-600 font-sans leading-relaxed mb-10">
                From the quality of your pillow to the curvature of the infinity pool — we obsess over every element so that you never have to.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((a) => (
                  <div key={a.title} className="flex gap-3">
                    <div className="w-1 bg-gold-400 shrink-0 mt-1" style={{height: '40px'}}></div>
                    <div>
                      <p className="font-sans text-sm font-medium text-forest-900">{a.title}</p>
                      <p className="font-sans text-xs text-forest-500 mt-0.5">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&q=80" alt="Pool" className="w-full h-64 object-cover" />
              <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80" alt="Spa" className="w-full h-64 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-forest-50">
        <div className="max-w-7xl mx-auto">
          <div ref={testimonialRef} className="reveal text-center mb-16">
            <p className="section-tag mb-4">Guest Stories</p>
            <h2 className="section-title">Words from those<br /><em>who have stayed</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => <TestimonialCard key={t.id} t={t} />)}
          </div>
        </div>
      </section>

      {/* ── BANNER CTA ── */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85" alt="Hotel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-forest-950/75" />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <Wind size={24} className="text-gold-300 mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl text-white font-normal mb-4">Begin Your Journey</h2>
          <p className="text-white/60 font-sans text-base mb-8">Reservations for 2025 are now open. We invite you to stay.</p>
          <Link to="/booking" className="btn-primary">Reserve Your Stay</Link>
        </div>
      </section>
    </div>
  )
}

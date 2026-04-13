import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { rooms } from '../data'
import { CheckCircle, Calendar, User, Mail, Users } from 'lucide-react'
import { useToast } from '../hooks'
import { Link } from 'react-router-dom'

const INIT = { name: '', email: '', checkin: '', checkout: '', room: '', guests: '2', requests: '' }

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs tracking-widest uppercase text-forest-500 mb-2 font-sans">
        {Icon && <Icon size={11} />}{label}
      </label>
      {children}
    </div>
  )
}

function nights(a, b) {
  if (!a || !b) return 0
  return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000))
}

export default function Booking() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({ ...INIT, room: searchParams.get('room') || '' })
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const { show } = useToast()

  // Update room if query param changes (e.g. coming from RoomModal)
  useEffect(() => {
    const roomParam = searchParams.get('room')
    if (roomParam) setForm(f => ({ ...f, room: decodeURIComponent(roomParam) }))
  }, [searchParams])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const selectedRoom = rooms.find(r => r.title === form.room)
  const n = nights(form.checkin, form.checkout)
  const total = selectedRoom ? selectedRoom.price * n : 0

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.checkin || !form.checkout || !form.room) {
      show('Please fill in all required fields.', 'error'); return
    }
    if (n <= 0) { show('Check-out must be after check-in.', 'error'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setConfirmed(true)
  }

  if (confirmed) return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-32">
      <div className="bg-white p-12 max-w-lg w-full text-center shadow-xl">
        <div className="w-16 h-16 bg-forest-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-forest-600" />
        </div>
        <p className="section-tag mb-3">Reservation Confirmed</p>
        <h2 className="font-display text-3xl text-forest-900 mb-4">We look forward<br /><em>to welcoming you.</em></h2>
        <div className="w-8 h-px bg-gold-400 mx-auto mb-6" />
        <div className="text-sm font-sans text-forest-600 space-y-2 mb-8 bg-forest-50 p-5">
          <p className="font-medium text-forest-900 text-base">{form.name}</p>
          <p>{form.room} · {n} night{n > 1 ? 's' : ''}</p>
          <p>{form.checkin} → {form.checkout}</p>
          <p className="text-gold-500 font-medium text-base mt-3">Total: ${total.toLocaleString()}</p>
        </div>
        <p className="text-forest-400 text-xs font-sans mb-8">
          A confirmation has been sent to <span className="text-forest-700">{form.email}</span>.<br />
          Our concierge team will reach out within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">Return Home</Link>
          <Link to="/rooms" className="btn-outline">Explore More Rooms</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="grain min-h-screen">
      {/* Hero */}
      <section className="relative h-56 flex items-end pb-12">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85" alt="Booking" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-forest-950/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gold-300 text-xs tracking-widest uppercase font-sans mb-2">Reserve</p>
          <h1 className="font-display text-4xl md:text-5xl text-white font-normal">Book Your Stay</h1>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12">
            <h2 className="font-display text-2xl text-forest-900 mb-8">Reservation Details</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Field label="Full Name" icon={User}>
                <input className="input-luxury" placeholder="Your full name"
                  value={form.name} onChange={e => set('name', e.target.value)} />
              </Field>
              <Field label="Email Address" icon={Mail}>
                <input type="email" className="input-luxury" placeholder="your@email.com"
                  value={form.email} onChange={e => set('email', e.target.value)} />
              </Field>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Field label="Check In" icon={Calendar}>
                <input type="date" className="input-luxury"
                  value={form.checkin} onChange={e => set('checkin', e.target.value)} />
              </Field>
              <Field label="Check Out" icon={Calendar}>
                <input type="date" className="input-luxury"
                  value={form.checkout} onChange={e => set('checkout', e.target.value)} />
              </Field>
              <Field label="Guests" icon={Users}>
                <select className="input-luxury" value={form.guests} onChange={e => set('guests', e.target.value)}>
                  {[1,2,3,4,5,6].map(n => <option key={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Room Type">
              <select className="input-luxury" value={form.room} onChange={e => set('room', e.target.value)}>
                <option value="">Select a room or suite...</option>
                {rooms.map(r => (
                  <option key={r.id} value={r.title}>{r.title} — ${r.price}/night ({r.category})</option>
                ))}
              </select>
            </Field>

            {/* Room preview card */}
            {selectedRoom && (
              <div className="mt-4 flex gap-4 bg-forest-50 p-4 border border-forest-100">
                <img src={selectedRoom.gallery[0]} alt={selectedRoom.title}
                  className="w-24 h-20 object-cover shrink-0" />
                <div>
                  <p className="font-sans text-sm font-medium text-forest-900">{selectedRoom.title}</p>
                  <p className="font-sans text-xs text-forest-500 mt-0.5">{selectedRoom.size} · {selectedRoom.guests} guests max</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedRoom.amenities.slice(0, 3).map(a => (
                      <span key={a} className="text-[10px] bg-forest-100 text-forest-600 px-2 py-0.5 font-sans">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Field label="Special Requests (optional)">
                <textarea className="input-luxury resize-none h-24"
                  placeholder="Dietary requirements, anniversary setup, late arrival..."
                  value={form.requests} onChange={e => set('requests', e.target.value)} />
              </Field>
            </div>

            {/* Availability */}
            <div className="mt-5 p-4 border border-forest-100 bg-forest-50 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${form.room ? 'bg-green-400' : 'bg-sand'}`} />
              <p className="text-xs font-sans text-forest-600">
                {form.room
                  ? `${selectedRoom?.title} is available for your selected dates`
                  : 'Select a room to check availability'}
              </p>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="btn-primary w-full justify-center mt-8 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Confirming Reservation...' : 'Confirm Reservation'}
            </button>
          </div>

          {/* Summary sidebar */}
          <div className="space-y-6">
            <div className="bg-forest-900 p-6 text-white">
              <p className="text-gold-300 text-xs tracking-widest uppercase font-sans mb-4">Booking Summary</p>
              {selectedRoom ? (
                <>
                  <img src={selectedRoom.gallery[0]} alt={selectedRoom.title}
                    className="w-full h-36 object-cover mb-4 opacity-80" />
                  <p className="font-display text-xl mb-1">{selectedRoom.title}</p>
                  <p className="text-white/50 text-xs font-sans mb-5">{selectedRoom.category} · {selectedRoom.size}</p>
                  <div className="space-y-3 text-sm font-sans border-t border-white/10 pt-4">
                    <div className="flex justify-between">
                      <span className="text-white/60">Check-in</span>
                      <span>{form.checkin || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Check-out</span>
                      <span>{form.checkout || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Duration</span>
                      <span>{n > 0 ? `${n} night${n > 1 ? 's' : ''}` : '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Rate</span>
                      <span>${selectedRoom.price}/night</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-baseline">
                    <span className="text-white/60 text-xs font-sans uppercase tracking-wider">Total</span>
                    <span className="font-display text-2xl text-gold-300">
                      {total > 0 ? `$${total.toLocaleString()}` : '—'}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-white/40 text-sm font-sans">Select a room to see your summary.</p>
              )}
            </div>

            {/* Trust */}
            <div className="bg-white p-6 border border-sand">
              <p className="font-sans text-xs text-forest-500 tracking-widest uppercase mb-4">Our Promise</p>
              {['Best rate guaranteed', 'Free cancellation up to 48h', 'No hidden fees', 'Personal pre-arrival contact'].map(t => (
                <div key={t} className="flex items-center gap-2 mb-2.5">
                  <div className="w-1 h-1 rounded-full bg-gold-400 shrink-0" />
                  <p className="font-sans text-sm text-forest-700">{t}</p>
                </div>
              ))}
            </div>

            <div className="bg-forest-50 p-6">
              <p className="font-sans text-xs text-forest-500 tracking-widest uppercase mb-3">Need Help?</p>
              <p className="font-sans text-sm text-forest-700 mb-1">Our reservations team is available 24/7.</p>
              <a href="tel:+94912234567" className="text-forest-900 font-medium text-sm font-sans">+94 91 223 4567</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

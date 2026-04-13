import { useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import API from "../api/api"
import { BedDouble, CalendarCheck, DollarSign, Plus, Edit2, Trash2, TrendingUp, Users, ArrowLeft } from 'lucide-react'


const STATUS_COLORS = {
  Confirmed: 'bg-green-50 text-green-700 border-green-200',
  Pending: 'bg-gold-100 text-gold-600 border-gold-200',
  Cancelled: 'bg-red-50 text-red-600 border-red-200',
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white p-6 border border-sand">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        <TrendingUp size={14} className="text-green-400" />
      </div>
      <p className="font-display text-3xl text-forest-900 mb-1">{value}</p>
      <p className="font-sans text-sm text-forest-500">{label}</p>
      {sub && <p className="font-sans text-xs text-forest-400 mt-1">{sub}</p>}
    </div>
  )
}

export default function Admin() {

  const [activeTab, setActiveTab] = useState('overview')
  const [bookingList, setBookingList] = useState([])
  const [roomList, setRoomList] = useState([])
  const [showAddRoom, setShowAddRoom] = useState(false)
  const [newRoom, setNewRoom] = useState({ title: '', category: 'Deluxe', price: '' })

  const totalRevenue = bookingList.filter(b => b.status === 'Confirmed').reduce((s, b) => s + b.amount, 0)
  const confirmedCount = bookingList.filter(b => b.status === 'Confirmed').length
  const availableRooms = roomList.length - confirmedCount

  //Run this when the page loads
  useEffect(() => {
  fetchRooms()
  fetchBookings()
}, [])//Run ONLY ONCE

const fetchRooms = async () => {
  try {
    const res = await API.get("/rooms")
    setRoomList(res.data)
  } catch (err) {
    console.error("Failed to load rooms", err)
  }
}

const fetchBookings = async () => {
  try {
    const res = await API.get("/bookings")
    setBookingList(res.data)
  } catch (err) {
    console.error("Failed to load bookings", err)
  }
}

  //not implement yet
  const changeStatus = async (id, status) => {
  await API.put(`/bookings/${id}`, { status })
  fetchBookings()
}
  //delete it
  const deleteBooking = async (id) => {
  await API.delete(`/bookings/${id}`)
  fetchBookings()
}

//add room
const addRoom = async () => {
  if (!newRoom.title || !newRoom.price) return

  await API.post("/rooms", {
    roomNumber: newRoom.title,
    type: newRoom.category,
    price: Number(newRoom.price)
  })

  fetchRooms()
  setNewRoom({ title: '', category: 'Deluxe', price: '' })
  setShowAddRoom(false)
}

const deleteRoom = async (id) => {
  await API.delete(`/rooms/${id}`)
  fetchRooms()
}

  const TABS = ['overview', 'bookings', 'rooms']

  return (
    <div className="min-h-screen bg-forest-50">
      {/* Admin Header */}
      <div className="bg-forest-950 text-white px-6 lg:px-10 py-4 flex items-center justify-between">
        <div>
          <p className="font-display text-lg">Grand Galle Admin</p>
          <p className="font-sans text-xs text-white/40 tracking-wider">Management Portal</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold-400 flex items-center justify-center">
            <span className="text-forest-950 text-xs font-medium font-sans">GM</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-sans text-xs text-white/80">General Manager</p>
            <p className="font-sans text-[10px] text-white/40">admin@grandgalle.com</p>
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="bg-white border-b border-sand px-6 lg:px-10">
        <div className="flex gap-8">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`py-4 text-xs tracking-widest uppercase font-sans border-b-2 transition-colors duration-200 capitalize ${activeTab === tab ? 'border-forest-900 text-forest-900' : 'border-transparent text-forest-400 hover:text-forest-700'}`}>
              {tab === 'overview' ? 'Dashboard' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <StatCard icon={CalendarCheck} label="Total Bookings" value={bookingList.length} sub={`${confirmedCount} confirmed`} color="bg-forest-100 text-forest-700" />
              <StatCard icon={BedDouble} label="Available Rooms" value={roomList.length} sub={`${availableRooms} free tonight`} color="bg-gold-100 text-gold-600" />
              <StatCard icon={DollarSign} label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} sub="Confirmed bookings" color="bg-green-50 text-green-600" />
              <StatCard icon={Users} label="Active Guests" value={confirmedCount} sub="Current & upcoming" color="bg-blue-50 text-blue-600" />
            </div>

            {/* Revenue by room type */}
            <div className="bg-white p-6 border border-sand mb-6">
              <p className="font-sans text-xs tracking-widest uppercase text-forest-500 mb-6">Revenue by Room Type</p>
              {['Suite', 'Ocean View', 'Deluxe'].map(cat => {
                const catTotal = bookingList.filter(b => rooms.find(r => r.title === b.room)?.category === cat && b.status === 'Confirmed').reduce((s, b) => s + b.amount, 0)
                const pct = totalRevenue > 0 ? Math.round((catTotal / totalRevenue) * 100) : 0
                return (
                  <div key={cat} className="mb-4">
                    <div className="flex justify-between text-xs font-sans text-forest-600 mb-1">
                      <span>{cat}</span><span>${catTotal.toLocaleString()} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-forest-50 rounded-sm overflow-hidden">
                      <div className="h-full bg-forest-700 transition-all duration-1000" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Recent bookings */}
            <div className="bg-white border border-sand">
              <div className="px-6 py-4 border-b border-sand flex items-center justify-between">
                <p className="font-sans text-xs tracking-widest uppercase text-forest-500">Recent Bookings</p>
                <button onClick={() => setActiveTab('bookings')} className="text-xs font-sans text-forest-400 hover:text-forest-700 transition-colors">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-sand">
                      {['ID', 'Guest', 'Room', 'Check-in', 'Status', 'Amount'].map(h => (
                        <th key={h} className="px-6 py-3 text-left text-[10px] tracking-widest uppercase text-forest-400 font-sans font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookingList.slice(0, 4).map(b => (
                      <tr key={b.id} className="border-b border-sand/50 hover:bg-forest-50 transition-colors">
                        <td className="px-6 py-3 text-xs font-mono text-forest-500">{b.id}</td>
                        <td className="px-6 py-3 text-sm font-sans text-forest-900">{b.guest}</td>
                        <td className="px-6 py-3 text-sm font-sans text-forest-600">{b.room}</td>
                        <td className="px-6 py-3 text-xs font-sans text-forest-500">{b.checkIn}</td>
                        <td className="px-6 py-3">
                          <span className={`text-[10px] tracking-wider uppercase px-2.5 py-1 font-sans border ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                        </td>
                        <td className="px-6 py-3 text-sm font-sans text-forest-900 font-medium">${b.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ── BOOKINGS ── */}
        {activeTab === 'bookings' && (
          <div className="bg-white border border-sand">
            <div className="px-6 py-4 border-b border-sand">
              <p className="font-sans text-xs tracking-widest uppercase text-forest-500">All Bookings ({bookingList.length})</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-sand">
                    {['ID', 'Guest', 'Room', 'Check-in', 'Check-out', 'Status', 'Amount', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] tracking-widest uppercase text-forest-400 font-sans font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingList.map(b => (
                    <tr key={b.id} className="border-b border-sand/50 hover:bg-forest-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-forest-500">{b.id}</td>
                      <td className="px-4 py-3 text-sm font-sans text-forest-900">{b.guest}</td>
                      <td className="px-4 py-3 text-sm font-sans text-forest-600">{b.room}</td>
                      <td className="px-4 py-3 text-xs font-sans text-forest-500">{b.checkIn}</td>
                      <td className="px-4 py-3 text-xs font-sans text-forest-500">{b.checkOut}</td>
                      <td className="px-4 py-3">
                        <select
                          value={b.status}
                          onChange={e => changeStatus(b.id, e.target.value)}
                          className={`text-[10px] tracking-wider uppercase px-2 py-1 font-sans border bg-transparent cursor-pointer ${STATUS_COLORS[b.status]}`}
                        >
                          {['Confirmed', 'Pending', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm font-sans text-forest-900 font-medium">${b.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => deleteBooking(b.id)} className="text-forest-300 hover:text-red-500 transition-colors p-1">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ROOMS ── */}
        {activeTab === 'rooms' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="font-display text-2xl text-forest-900">Room Inventory ({roomList.length})</p>
              <button onClick={() => setShowAddRoom(!showAddRoom)} className="btn-primary py-2.5 px-6 text-xs flex items-center gap-2">
                <Plus size={14} />Add Room
              </button>
            </div>

            {showAddRoom && (
              <div className="bg-white border border-sand p-6 mb-6 grid md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-forest-500 font-sans block mb-1">Room Name</label>
                  <input className="input-luxury text-sm" placeholder="e.g. Colonial Suite" value={newRoom.title} onChange={e => setNewRoom(n => ({ ...n, title: e.target.value }))} />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-forest-500 font-sans block mb-1">Category</label>
                  <select className="input-luxury text-sm" value={newRoom.category} onChange={e => setNewRoom(n => ({ ...n, category: e.target.value }))}>
                    {['Deluxe', 'Suite', 'Ocean View'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-forest-500 font-sans block mb-1">Price/night ($)</label>
                  <input type="number" className="input-luxury text-sm" placeholder="350" value={newRoom.price} onChange={e => setNewRoom(n => ({ ...n, price: e.target.value }))} />
                </div>
                <button onClick={addRoom} className="btn-primary justify-center py-3">Add Room</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roomList.map(r => (
                <div key={r.id} className="bg-white border border-sand overflow-hidden">
                  <div className="relative h-40">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                    {r.badge && (
                      <span className="absolute top-2 left-2 bg-gold-400 text-forest-950 text-[10px] tracking-widest uppercase px-2 py-0.5 font-sans">{r.badge}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[10px] tracking-widest uppercase text-gold-500 font-sans">{r.category}</p>
                        <p className="font-display text-base text-forest-900">{r.title}</p>
                      </div>
                      <p className="font-display text-lg text-forest-900">${r.price}</p>
                    </div>
                    <p className="text-xs text-forest-500 font-sans">{r.size} · {r.guests} guests</p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex items-center gap-1 text-xs font-sans text-forest-500 hover:text-forest-900 transition-colors">
                        <Edit2 size={12} />Edit
                      </button>
                      <button onClick={() => deleteRoom(r.id)}
                        className="flex items-center gap-1 text-xs font-sans text-forest-400 hover:text-red-500 transition-colors ml-2">
                        
                        <Trash2 size={12} />Remove
                      
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

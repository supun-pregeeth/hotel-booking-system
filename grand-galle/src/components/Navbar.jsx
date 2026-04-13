import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogIn, ChevronDown } from 'lucide-react'

//name is like supun fernando, it will return SF
function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const dropdownRef = useRef(null)

  //FIXED: load user on route change
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser(null)
    }
  }, [location]) // THIS FIXES YOUR ISSUE

  //Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  //Close menus on route change
  useEffect(() => {
    setOpen(false)
    setDropdownOpen(false)
  }, [location])

  //Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/" // refresh UI
  }

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'Our Story' },
    { to: '/rooms', label: 'Rooms' },
    { to: '/admin', label: 'Admin' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-forest-950/97 backdrop-blur-md shadow-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-display text-white text-xl">The Grand Galle</span>
          <span className="text-gold-300 text-[10px] uppercase">Sri Lanka</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link 
              key={l.to} 
              to={l.to}
              className={`text-xs uppercase transition ${
                isActive(l.to) 
                  ? 'text-gold-300' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center">
                  <span className="text-forest-900 text-xs font-semibold">
                    {getInitials(user.firstName + " " + user.lastName)}
                  </span>
                </div>

                <ChevronDown 
                  size={12} 
                  className={`transition ${dropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-forest-950 border shadow-lg rounded-md overflow-hidden">

                  <div className="px-4 py-4 border-b">
                    <p className="text-white text-sm">{user.firstName}</p>
                    <p className="text-white/50 text-xs">{user.email}</p>
                  </div>

                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                to="/signin" 
                className="flex items-center gap-1 text-white/70 hover:text-white"
              >
                <LogIn size={13} /> Sign In
              </Link>

              {/* <Link 
                to="/signup" 
                className="text-white/70 hover:text-white"
              >
                Register
              </Link> */}
            </>
          )}

          <Link 
            to="/booking" 
            className="border px-5 py-2 text-white hover:bg-white hover:text-black transition"
          >
            Book a Stay
          </Link>
        </div>

        {/* Mobile toggle */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-forest-950 px-6 py-6 flex flex-col gap-4">

          {links.map(l => (
            <Link key={l.to} to={l.to} className="text-white/80">
              {l.label}
            </Link>
          ))}

          {user ? (
            <>
              <p className="text-white">{user.firstName}</p>
              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Create Account</Link>
            </>
          )}

          <Link to="/booking" className="text-white">
            Book a Stay
          </Link>
        </div>
      )}
    </nav>
  )
}
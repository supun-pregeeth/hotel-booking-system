import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Loader } from 'lucide-react'
import { useToast } from '../hooks'
import API from "../api/api" 

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false) //to show/hide password
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { show: toast } = useToast() //show pops up messages

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => { //error object, NOT event

    const e = {} //like empty object to store errors
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Minimum 8 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    
    if (!validate()) return
    setLoading(true)

    try {


      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password
        
      })

      console.log(res.data)
      //save token to local storage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
      }

      const profile = await API.get("/users/me")

      localStorage.setItem("user", JSON.stringify(profile.data)) //save user profile to local storage

      const role = profile.data?.role || "USER"

      console.log("User :", profile.data?.firstName + " " + profile.data?.lastName)

      if(role === "ADMIN"){
        toast('Welcome back, General Manager.')
        navigate("/admin")
      }else{
        toast('Welcome back. Your sanctuary awaits')
        navigate("/")
      }


  } catch (err) {
    console.error('Login failed:', err)
    const message =
  err.response?.data?.message ||
  err.message ||
  "Login failed"

toast(message)
  } finally {
    setLoading(false)
  }

  
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left — image panel */}
      <div className="hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=90"
          alt="The Grand Galle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 to-forest-950/20" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-white text-2xl">The Grand Galle</span>
            <span className="text-gold-300 text-[11px] tracking-widest uppercase font-sans mt-1">Sri Lanka</span>
          </Link>
          <div>
            <p className="font-display text-4xl text-white font-normal leading-tight mb-4">
              Welcome back<br /><em className="font-light">to paradise.</em>
            </p>
            <p className="text-white/60 font-sans text-sm leading-relaxed max-w-xs">
              Sign in to manage your reservations, access member benefits, and continue your journey with us.
            </p>
          </div>
          <div className="flex gap-3">
            {['Trusted by 5,000+ guests', 'Member-only rates', 'Priority booking'].map(t => (
              <span key={t} className="text-[10px] text-white/50 font-sans tracking-wider border border-white/20 px-3 py-1">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-cream">
        {/* Mobile logo */}
        <Link to="/" className="md:hidden flex flex-col leading-none mb-12">
          <span className="font-display text-forest-900 text-xl">The Grand Galle</span>
          <span className="text-gold-500 text-[10px] tracking-widest uppercase font-sans mt-0.5">Sri Lanka</span>
        </Link>

        <div className="max-w-sm w-full mx-auto">
          <p className="section-tag mb-3">Member Portal</p>
          <h1 className="font-display text-4xl text-forest-900 mb-2">Sign In</h1>
          <p className="text-forest-500 font-sans text-sm mb-10">
            New to Grand Galle?{' '}
            <Link to="/signup" className="text-forest-900 underline underline-offset-2 hover:text-gold-600 transition-colors">
              Create an account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-forest-500 font-sans mb-2">Email Address</label>
              <input
                type="email"
                className={`input-luxury w-full ${errors.email ? 'border-red-400' : ''}`}
                placeholder="your@email.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-xs font-sans mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] tracking-widest uppercase text-forest-500 font-sans">Password</label>
                <a href="#" className="text-xs font-sans text-forest-400 hover:text-forest-700 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  className={`input-luxury w-full pr-12 ${errors.password ? 'border-red-400' : ''}`}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700 transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-sans mt-1">{errors.password}</p>}
            </div>

            {/* Remember */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-4 h-4 border border-sand peer-checked:bg-forest-900 peer-checked:border-forest-900 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>
              <span className="text-xs font-sans text-forest-600">Keep me signed in</span>
            </label>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2"><Loader size={14} className="animate-spin" />Signing in...</span>
              ) : (
                <span className="flex items-center gap-2">Sign In <ArrowRight size={14} /></span>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-8 p-4 bg-forest-50 border border-forest-100">
            <p className="text-[10px] tracking-wider uppercase text-forest-400 font-sans mb-2">Demo credentials</p>
            <p className="text-xs font-sans text-forest-600">Guest: <span className="font-medium">guest@example.com</span> / <span className="font-medium">123456</span></p>
            <p className="text-xs font-sans text-forest-600 mt-1">Admin: <span className="font-medium">admin@grandgalle.com</span> / <span className="font-medium">123456</span></p>
          </div>

          <div className="mt-8 pt-8 border-t border-sand">
            <p className="text-xs text-center text-forest-400 font-sans">
              By signing in you agree to our{' '}
              <a href="#" className="underline hover:text-forest-700">Privacy Policy</a>
              {' & '}
              <a href="#" className="underline hover:text-forest-700">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

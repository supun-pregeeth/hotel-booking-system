import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Loader, Check } from 'lucide-react'
import { useToast } from '../hooks'
import API from "../api/api"  

const PERKS = [
  'Early check-in & late check-out',
  'Members-only room rates',
  'Complimentary welcome amenity',
  'Priority table reservations',
  'Exclusive seasonal offers',
]

export default function SignUp() {

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' })
  const [show, setShow] = useState({ password: false, confirm: false })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()
  const { show: toast } = useToast()

  //update form state and clear error for the field
  const set = (k, v) => { //k is key and v is value. k='email'/ v = "example@example.com"

    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
  }

  //check password strength
  const strength = () => {

    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  }

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColor = ['', 'bg-red-400', 'bg-gold-400', 'bg-blue-400', 'bg-green-400']
  const s = strength()//call strength function.
  console.log('Password strength:', s);

  //form validation
  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Minimum 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    if (!agreed) e.agreed = 'Please accept the terms to continue'
    setErrors(e)
    return Object.keys(e).length === 0 //return true if no errors, false otherwise
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault()

    if (!validate()) return
    setLoading(true)
    
    try{
      const res = await  API.post('/auth/register', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password
      })

      //save token (if backend returns it)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token)
    }

    toast('Welcome to The Grand Galle. Your member account is ready.')
    navigate('/')
    
    console.log('Signup successful:', res.data)
    } catch (err) {
      console.error('Signup failed:', err)
      toast(err.response?.data?.message || "Registration failed")
    }finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left — benefits panel */}
      <div className="hidden md:flex flex-col justify-between relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=90"
          alt="The Grand Galle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950/90 to-forest-800/70" />
        <div className="relative flex flex-col justify-between h-full p-12">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-white text-2xl">The Grand Galle</span>
            <span className="text-gold-300 text-[11px] tracking-widest uppercase font-sans mt-1">Sri Lanka</span>
          </Link>

          <div>
            <div className="w-8 h-px bg-gold-400 mb-6" />
            <p className="font-display text-4xl text-white font-normal leading-tight mb-3">
              Join the<br /><em className="font-light">inner circle.</em>
            </p>
            <p className="text-white/60 font-sans text-sm leading-relaxed mb-8 max-w-xs">
              Membership is free. The privileges are not.
            </p>
            <div className="space-y-3">
              {PERKS.map(p => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-5 h-5 border border-gold-400 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-gold-400" />
                  </div>
                  <p className="text-white/70 text-sm font-sans">{p}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/30 text-xs font-sans">
            © 2025 The Grand Galle · All rights reserved
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-16 bg-cream overflow-y-auto">
        {/* Mobile logo */}
        <Link to="/" className="md:hidden flex flex-col leading-none mb-10">
          <span className="font-display text-forest-900 text-xl">The Grand Galle</span>
          <span className="text-gold-500 text-[10px] tracking-widest uppercase font-sans mt-0.5">Sri Lanka</span>
        </Link>

        <div className="max-w-sm w-full mx-auto">
          <p className="section-tag mb-3">Membership</p>
          <h1 className="font-display text-4xl text-forest-900 mb-2">Create Account</h1>
          <p className="text-forest-500 font-sans text-sm mb-8">
            Already a member?{' '}
            <Link to="/signin" className="text-forest-900 underline underline-offset-2 hover:text-gold-600 transition-colors">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-forest-500 font-sans mb-2">First Name</label>
                <input className={`input-luxury w-full ${errors.firstName ? 'border-red-400' : ''}`}
                  placeholder="First Name"
                  value={form.firstName} onChange={e => set('firstName', e.target.value)} />
                {errors.firstName && <p className="text-red-500 text-xs font-sans mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-forest-500 font-sans mb-2">Last Name</label>
                <input className={`input-luxury w-full ${errors.lastName ? 'border-red-400' : ''}`}
                  placeholder="Last Name"
                  value={form.lastName} onChange={e => set('lastName', e.target.value)} />
                {errors.lastName && <p className="text-red-500 text-xs font-sans mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-forest-500 font-sans mb-2">Email Address</label>
              <input type="email"
                className={`input-luxury w-full ${errors.email ? 'border-red-400' : ''}`}
                placeholder="Enter Your Email"
                value={form.email} onChange={e => set('email', e.target.value)}
                autoComplete="email" />
              {errors.email && <p className="text-red-500 text-xs font-sans mt-1">{errors.email}</p>}
            </div>

            {/* Phone (optional) */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-forest-500 font-sans mb-2">
                Phone <span className="normal-case text-forest-400">(optional)</span>
              </label>
              <input type="tel"
                className="input-luxury w-full"
                placeholder="Phone Number"
                value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-forest-500 font-sans mb-2">Password</label>
              <div className="relative">
                <input
                  type={show.password ? 'text' : 'password'}
                  className={`input-luxury w-full pr-12 ${errors.password ? 'border-red-400' : ''}`}
                  placeholder="Password"
                  value={form.password} onChange={e => set('password', e.target.value)}
                  autoComplete="new-password" />
                <button type="button" onClick={() => setShow(s => ({ ...s, password: !s.password }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700 transition-colors">
                  {show.password ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-sans mt-1">{errors.password}</p>}
              {/* Strength meter */}
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`flex-1 h-1 transition-all duration-300 ${i <= s ? strengthColor[s] : 'bg-sand'}`} />
                    ))}
                  </div>
                  <span className={`text-[10px] font-sans ${s >= 3 ? 'text-green-600' : s === 2 ? 'text-blue-500' : 'text-red-500'}`}>
                    {strengthLabel[s]}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-forest-500 font-sans mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={show.confirm ? 'text' : 'password'}
                  className={`input-luxury w-full pr-12 ${errors.confirm ? 'border-red-400' : ''}`}
                  placeholder="Confirm Password"
                  value={form.confirm} onChange={e => set('confirm', e.target.value)}
                  autoComplete="new-password" />
                <button type="button" onClick={() => setShow(s => ({ ...s, confirm: !s.confirm }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700 transition-colors">
                  {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirm && <p className="text-red-500 text-xs font-sans mt-1">{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5 shrink-0">
                  <input type="checkbox" className="sr-only peer" checked={agreed} onChange={e => { setAgreed(e.target.checked); if (errors.agreed) setErrors(er => ({ ...er, agreed: '' })) }} />
                  <div className="w-4 h-4 border border-sand peer-checked:bg-forest-900 peer-checked:border-forest-900 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </div>
                <span className="text-xs font-sans text-forest-600 leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="underline hover:text-forest-900">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="underline hover:text-forest-900">Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && <p className="text-red-500 text-xs font-sans mt-1 ml-7">{errors.agreed}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2"><Loader size={14} className="animate-spin" />Creating account...</span>
              ) : (
                <span className="flex items-center gap-2">Create My Account <ArrowRight size={14} /></span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

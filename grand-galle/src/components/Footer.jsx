import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white/70 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex flex-col leading-none mb-4 group">
              <span className="font-display text-white text-2xl font-normal group-hover:text-gold-200 transition-colors">The Grand Galle</span>
              <span className="text-gold-300 text-xs tracking-widest uppercase mt-1">Sri Lanka</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 mt-4">
              A sanctuary of tropical luxury on the shores of the Indian Ocean, where heritage meets modern elegance.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold-300 hover:text-gold-300 transition-colors duration-200">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white text-xs tracking-widest uppercase mb-5 font-medium">Explore</p>
            <div className="flex flex-col gap-3">
              {[['/', 'Home'], ['/about', 'Our Story'], ['/rooms', 'Rooms & Suites'], ['/booking', 'Book a Stay'], ['/signin', 'Sign In'], ['/signup', 'Create Account'], ['/admin', 'Admin Portal']].map(([to, label]) => (
                <Link key={to} to={to} className="text-sm hover:text-gold-300 transition-colors duration-200">{label}</Link>
              ))}
            </div>
          </div>

          {/* Experiences */}
          <div>
            <p className="text-white text-xs tracking-widest uppercase mb-5 font-medium">Experiences</p>
            <div className="flex flex-col gap-3">
              {['Ayurvedic Spa', 'Fine Dining', 'Sailing & Watersports', 'Cultural Tours', 'Yoga & Wellness', 'Private Events'].map(e => (
                <a key={e} href="#" className="text-sm hover:text-gold-300 transition-colors duration-200">{e}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-xs tracking-widest uppercase mb-5 font-medium">Contact</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-gold-300 mt-0.5 shrink-0" />
                <p className="text-sm">42 Lighthouse Rd, Galle Fort,<br />Southern Province, Sri Lanka</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gold-300 shrink-0" />
                <a href="tel:+94912234567" className="text-sm hover:text-gold-300 transition-colors">+94 91 223 4567</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-gold-300 shrink-0" />
                <a href="mailto:reservations@grandgalle.com" className="text-sm hover:text-gold-300 transition-colors break-all">reservations@grandgalle.com</a>
              </div>
            </div>

            <div className="mt-8 p-4 border border-white/10">
              <p className="text-xs tracking-widest uppercase text-white/40 font-sans mb-2">Member Portal</p>
              <div className="flex gap-3">
                <Link to="/signin" className="text-xs font-sans text-gold-300 hover:text-gold-200 transition-colors underline underline-offset-2">Sign In</Link>
                <span className="text-white/20">·</span>
                <Link to="/signup" className="text-xs font-sans text-gold-300 hover:text-gold-200 transition-colors underline underline-offset-2">Create Account</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2025 The Grand Galle. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map(t => (
              <a key={t} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

# The Grand Galle — Luxury Hotel Website

A premium, fully-responsive hotel website built with **React + Vite + Tailwind CSS**.

---

## 🚀 Quick Start

```bash
# 1. Unzip the project
unzip grand-galle.zip
cd grand-galle

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
grand-galle/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Router & layout wrapper
    ├── index.css             # Global styles + Tailwind
    ├── data/
    │   └── index.js          # Rooms, testimonials, gallery data
    ├── hooks/
    │   └── index.js          # useReveal (scroll animation), useToast
    ├── components/
    │   ├── Navbar.jsx         # Sticky, transparent→solid navbar
    │   ├── Footer.jsx         # Full footer with links & contact
    │   ├── RoomCard.jsx       # Reusable room card component
    │   └── Lightbox.jsx       # Full-screen image lightbox
    └── pages/
        ├── Home.jsx           # Hero, booking bar, highlights, testimonials
        ├── About.jsx          # Hotel story, mission/vision, gallery
        ├── Rooms.jsx          # Room grid with filters + gallery tab
        ├── Booking.jsx        # Full booking form with confirmation
        └── Admin.jsx          # Admin dashboard (bookings, rooms, analytics)
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | `#0F3D2E` (Deep Forest Green) |
| Gold Accent | `#c9932a` |
| Background | `#FAF7F2` (Warm Cream) |
| Font — Display | Playfair Display |
| Font — Body | DM Sans |
| Font — Editorial | Cormorant Garamond |

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, booking widget, highlights, amenities, testimonials |
| About | `/about` | Story, mission/vision, property gallery |
| Rooms | `/rooms` | Filter by type, lightbox gallery tab |
| Booking | `/booking` | Full form + live price summary + confirmation |
| Admin | `/admin` | Dashboard, booking management, room CRUD |

---

## 🧩 Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** — custom color palette, fonts, utilities
- **React Router DOM 6** — client-side routing
- **Lucide React** — icons
- **Framer Motion** — (installed, ready to use for page transitions)

---

## 🖼️ Images

All images are loaded from **Unsplash** (free, no API key needed). The URLs are in `src/data/index.js` — swap them with your own hosted images for production.

---

## ⚙️ Customisation

- **Brand name / copy**: Edit `src/data/index.js` and `src/components/Navbar.jsx`
- **Colors**: Update `tailwind.config.js` → `theme.extend.colors`
- **Rooms data**: Edit the `rooms` array in `src/data/index.js`
- **Add animations**: Import `framer-motion` in any page component

---

## 🚢 Deployment

```bash
npm run build
# Deploy the /dist folder to Vercel, Netlify, or any static host
```

For Vercel: `vercel --prod` from the project root.

---

*Built for The Grand Galle · Sri Lanka*

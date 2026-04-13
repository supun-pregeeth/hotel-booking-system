import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images, current, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const img = images[current]

  return (
    <div className="fixed inset-0 z-50 bg-forest-950/96 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white p-2 transition-colors">
        <X size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 md:left-8 text-white/60 hover:text-white p-3 transition-colors">
        <ChevronLeft size={28} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 md:right-8 text-white/60 hover:text-white p-3 transition-colors">
        <ChevronRight size={28} />
      </button>

      <div className="max-w-4xl w-full mx-12" onClick={e => e.stopPropagation()}>
        <img src={img.src} alt={img.alt} className="w-full max-h-[78vh] object-contain" />
        <div className="mt-4 text-center">
          <p className="text-white/60 font-sans text-sm">{img.alt}</p>
          <p className="text-white/30 font-sans text-xs mt-1">{current + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  )
}

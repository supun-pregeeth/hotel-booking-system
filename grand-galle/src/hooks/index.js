import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function useToast() {
  const show = (message, type = 'success') => {
    const toast = document.createElement('div')
    toast.className = `fixed bottom-6 right-6 z-50 px-6 py-4 text-white text-sm font-sans tracking-wide shadow-2xl transition-all duration-500 ${type === 'success' ? 'bg-forest-800' : 'bg-red-700'}`
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 500) }, 3000)
  }
  return { show }
}

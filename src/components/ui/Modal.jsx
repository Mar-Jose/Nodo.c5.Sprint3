import { useEffect } from 'react'

function Modal({
  isOpen,
  onClose,
  ariaLabel,
  children,
  className = 'w-full max-w-xl rounded-2xl border border-white/10 bg-surface p-6 shadow-2xl shadow-brand/10',
}) {
  useEffect(() => {
    if (!isOpen) return undefined

    const cerrarConEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', cerrarConEscape)
    return () => document.removeEventListener('keydown', cerrarConEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </section>
    </div>
  )
}

export default Modal
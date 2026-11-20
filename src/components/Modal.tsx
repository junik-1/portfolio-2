import { useEffect } from 'react'
import type { ReactNode } from 'react'
import Button from './Button'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  showClose?: boolean
  children: ReactNode
}

// Pop-up dialog. Closes on Escape, a click outside it, or the Close button.
export default function Modal({ open, onClose, title, showClose = true, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-xl"
      >
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <div className="space-y-4 text-ink/80">{children}</div>
        {showClose && (
          <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        )}
      </div>
    </div>
  )
}
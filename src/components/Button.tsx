import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

type ButtonProps = {
  variant?: Variant
  to?: string // goes to another page of this site (no reload)
  href?: string // goes to an outside link
  onClick?: () => void
  type?: 'button' | 'submit'
  active?: boolean
  className?: string
  target?: string
  rel?: string
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'bg-cobalt text-white hover:bg-cobalt/90',
  secondary: 'border border-ink/25 text-ink hover:bg-ink/5',
  ghost: 'text-ink/70 hover:text-ink hover:bg-ink/5',
  danger: 'border border-red-300 text-red-700 hover:bg-red-50',
}

// One button for the whole site: internal link (`to`), outside link (`href`), or <button>.
export default function Button({
  variant = 'primary', to, href, onClick, type = 'button',
  active = false, className = '', target, rel, children,
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt',
    active ? 'bg-ink text-white hover:bg-ink' : variants[variant],
    className,
  ].join(' ')

  if (to) return <Link to={to} className={classes}>{children}</Link>
  if (href) return <a href={href} target={target} rel={rel} className={classes}>{children}</a>
  return <button type={type} onClick={onClick} className={classes}>{children}</button>
}
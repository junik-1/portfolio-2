type AvatarProps = {
  src: string
  alt: string
  className?: string
}

// A round photo. Reuse it anywhere (Home, About, a testimonial).
export default function Avatar({ src, alt, className = '' }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-40 w-40 rounded-full border border-ink/15 object-cover sm:h-52 sm:w-52 ${className}`}
    />
  )
}
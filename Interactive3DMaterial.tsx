/**
 * Interactive3DMaterial — Sure-Fix Remodeling Showroom
 * 
 * A fully interactive 3D material showcase card with:
 * - Cursor-tracking tilt (rotateX/rotateY following mouse position in real-time)
 * - Spring physics on hover/press (scale, depth, shadow)
 * - Scroll-driven parallax (card floats and rotates as user scrolls)
 * - Animated shimmer/gloss layer that follows cursor
 * - Particle canvas overlay for ambient depth effect
 * - Layered CSS 3D with perspective for true depth
 * 
 * Uses: Framer Motion useMotionValue, useSpring, useTransform, useScroll
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion'
import { useRef, useEffect, useCallback, useState } from 'react'

interface MaterialLayer {
  /** z-depth offset in px — creates parallax between layers on tilt */
  z: number
  /** opacity of this layer */
  opacity: number
  /** content to render in this layer */
  content: React.ReactNode
}

interface Interactive3DMaterialProps {
  /** Primary material image URL */
  imageUrl: string
  /** Material title */
  title: string
  /** Short descriptor shown as a floating badge */
  badge: string
  /** Brand colour for accent glow */
  accentColor?: string
  /** Scroll container ref for parallax — defaults to window */
  className?: string
  /** Index for staggered entrance */
  index?: number
}

// Particle system drawn on canvas
function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) {
  const particles = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; life: number; maxLife: number;
  }>>([])
  const raf = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const spawn = () => {
      if (!active || particles.current.length > 40) return
      const life = 80 + Math.random() * 120
      particles.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 5,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.4 + Math.random() * 0.8),
        size: 1 + Math.random() * 2.5,
        opacity: 0,
        life: 0,
        maxLife: life,
      })
    }

    let frame = 0
    const loop = () => {
      frame++
      if (frame % 4 === 0) spawn()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current = particles.current.filter(p => p.life < p.maxLife)
      for (const p of particles.current) {
        p.life++
        p.x += p.vx
        p.y += p.vy
        const progress = p.life / p.maxLife
        p.opacity = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
            ? 1 - (progress - 0.7) / 0.3
            : 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(57,70,150,${p.opacity * 0.6})`
        ctx.fill()
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
    }
  }, [canvasRef, active])
}

export function Interactive3DMaterial({
  imageUrl,
  title,
  badge,
  accentColor = '#394696',
  className = '',
  index = 0,
}: Interactive3DMaterialProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  // Raw mouse position (0–1 relative to card)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Smooth spring followers
  const springConfig = { stiffness: 200, damping: 22, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // 3D rotation from mouse — ±18 degrees
  const rotateX = useTransform(smoothY, [0, 1], [14, -14])
  const rotateY = useTransform(smoothX, [0, 1], [-14, 14])

  // Gloss highlight position
  const glossX = useTransform(smoothX, [0, 1], ['-20%', '120%'])
  const glossY = useTransform(smoothY, [0, 1], ['-20%', '120%'])

  // Scale spring for hover/press
  const scaleTarget = useMotionValue(1)
  const scale = useSpring(scaleTarget, { stiffness: 300, damping: 20 })

  // Scroll-driven parallax
  const { scrollY } = useScroll()
  const scrollParallaxY = useTransform(
    scrollY,
    [0, 2000],
    [0, (index % 2 === 0 ? -1 : 1) * 60]
  )
  const scrollRotateZ = useTransform(
    scrollY,
    [0, 2000],
    [0, (index % 3 === 0 ? 3 : -2)]
  )

  // Mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    scaleTarget.set(1.04)
  }, [scaleTarget])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    setPressed(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
    scaleTarget.set(1)
  }, [mouseX, mouseY, scaleTarget])

  const handleMouseDown = useCallback(() => {
    setPressed(true)
    scaleTarget.set(0.97)
  }, [scaleTarget])

  const handleMouseUp = useCallback(() => {
    setPressed(false)
    scaleTarget.set(hovered ? 1.04 : 1)
  }, [hovered, scaleTarget])

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect || !e.touches[0]) return
    mouseX.set((e.touches[0].clientX - rect.left) / rect.width)
    mouseY.set((e.touches[0].clientY - rect.top) / rect.height)
    setHovered(true)
    setPressed(true)
    scaleTarget.set(0.97)
  }, [mouseX, mouseY, scaleTarget])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect || !e.touches[0]) return
    mouseX.set((e.touches[0].clientX - rect.left) / rect.width)
    mouseY.set((e.touches[0].clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  const handleTouchEnd = useCallback(() => {
    setHovered(false)
    setPressed(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
    scaleTarget.set(1)
  }, [mouseX, mouseY, scaleTarget])

  useParticleCanvas(canvasRef, hovered)

  // Entrance animation
  const entranceDelay = index * 0.12

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: entranceDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ y: scrollParallaxY, rotateZ: scrollRotateZ }}
      className={`relative ${className}`}
    >
      {/* Perspective wrapper */}
      <div style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}>
        <motion.div
          ref={cardRef}
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: 'preserve-3d',
            boxShadow: hovered
              ? `0 30px 80px rgba(0,0,0,0.6), 0 0 40px ${accentColor}40, inset 0 1px 0 rgba(255,255,255,0.15)`
              : `0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Base image layer */}
          <motion.div
            className="relative w-full aspect-[4/3] overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              style={{
                scale: useTransform(scale, [0.97, 1.04], [1.08, 1.12]),
              }}
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/30 to-transparent" />

            {/* Gloss/shimmer layer — follows cursor */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: glossX,
                top: glossY,
                width: '60%',
                height: '60%',
                background: `radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)`,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Particle canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }}
            />

            {/* Edge glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: `inset 0 0 0 1px ${accentColor}`,
                opacity: hovered ? 0.6 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Badge — floats above with Z depth */}
            <motion.div
              className="absolute top-4 left-4"
              style={{
                translateZ: hovered ? 30 : 0,
                transition: 'all 0.3s ease',
              }}
            >
              <span
                className="px-3 py-1.5 text-xs font-black tracking-wider text-white rounded-full backdrop-blur-md border border-white/20 uppercase"
                style={{ background: `${accentColor}cc`, fontFamily: 'Figtree, sans-serif' }}
              >
                {badge}
              </span>
            </motion.div>

            {/* Title — floats at bottom with Z depth */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-5"
              style={{
                translateZ: hovered ? 20 : 0,
                transition: 'all 0.3s ease',
              }}
            >
              <h3
                className="text-xl font-black text-white leading-tight"
                style={{ fontFamily: 'Figtree, sans-serif', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
              >
                {title}
              </h3>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient glow beneath card */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl pointer-events-none"
        style={{
          background: accentColor,
          opacity: hovered ? 0.35 : 0.1,
          transition: 'opacity 0.4s ease',
        }}
      />
    </motion.div>
  )
}

/**
 * A larger featured 3D card with more dramatic tilt and a floating 3D label stack
 */
export function Interactive3DMaterialFeatured({
  imageUrl,
  title,
  description,
  features,
  brands,
  badge,
  accentColor = '#394696',
  index = 0,
  flipped = false,
}: Interactive3DMaterialProps & {
  description: string
  features: string[]
  brands: string[]
  flipped?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springCfg = { stiffness: 180, damping: 20, mass: 0.7 }
  const smoothX = useSpring(mouseX, springCfg)
  const smoothY = useSpring(mouseY, springCfg)

  const rotateX = useTransform(smoothY, [0, 1], [10, -10])
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10])
  const glossX = useTransform(smoothX, [0, 1], ['-30%', '130%'])
  const glossY = useTransform(smoothY, [0, 1], ['-30%', '130%'])

  const scaleTarget = useMotionValue(1)
  const scale = useSpring(scaleTarget, { stiffness: 280, damping: 22 })

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 3000], [0, (index % 2 === 0 ? -40 : 40)])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    scaleTarget.set(1.03)
  }, [scaleTarget])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
    scaleTarget.set(1)
  }, [mouseX, mouseY, scaleTarget])

  const handleMouseDown = useCallback(() => scaleTarget.set(0.98), [scaleTarget])
  const handleMouseUp = useCallback(() => scaleTarget.set(hovered ? 1.03 : 1), [hovered, scaleTarget])

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect || !e.touches[0]) return
    mouseX.set((e.touches[0].clientX - rect.left) / rect.width)
    mouseY.set((e.touches[0].clientY - rect.top) / rect.height)
    setHovered(true)
    scaleTarget.set(0.98)
  }, [mouseX, mouseY, scaleTarget])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect || !e.touches[0]) return
    mouseX.set((e.touches[0].clientX - rect.left) / rect.width)
    mouseY.set((e.touches[0].clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  const handleTouchEnd = useCallback(() => {
    setHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
    scaleTarget.set(1)
  }, [mouseX, mouseY, scaleTarget])

  useParticleCanvas(canvasRef, hovered)

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ y: parallaxY }}
      className={`flex flex-col ${flipped ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]`}
    >
      {/* 3D Image side */}
      <div className="lg:w-1/2 relative" style={{ perspective: '800px' }}>
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden cursor-pointer select-none"
        >
          <motion.img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{ scale: 1.08 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/60 via-transparent to-transparent" />

          {/* Gloss */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: glossX,
              top: glossY,
              width: '70%',
              height: '70%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Particles */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }} />

          {/* Floating badge */}
          <motion.div
            className="absolute top-5 left-5"
            style={{ translateZ: hovered ? 35 : 0, transition: 'all 0.3s ease' }}
          >
            <span
              className="px-3 py-1.5 text-xs font-black tracking-wider text-white rounded-full backdrop-blur-md border border-white/20 uppercase"
              style={{ background: `${accentColor}dd`, fontFamily: 'Figtree, sans-serif' }}
            >
              {badge}
            </span>
          </motion.div>

          {/* Brand pills */}
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
            {brands.map(brand => (
              <motion.span
                key={brand}
                style={{ translateZ: hovered ? 20 : 0, transition: 'all 0.3s ease' }}
                className="px-2 py-1 text-xs font-semibold bg-black/60 backdrop-blur-sm text-white rounded-full border border-white/20"
              >
                {brand}
              </motion.span>
            ))}
          </div>

          {/* Edge border glow */}
          <div
            className="absolute inset-0 rounded-none pointer-events-none"
            style={{
              boxShadow: `inset 0 0 0 1px ${accentColor}`,
              opacity: hovered ? 0.5 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </motion.div>
      </div>

      {/* Content side */}
      <div className="flex flex-col justify-center p-8 lg:p-12 lg:w-1/2">
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map(f => (
            <span
              key={f}
              className="px-3 py-1 text-xs font-bold tracking-wider rounded-full border uppercase"
              style={{
                color: accentColor,
                background: `${accentColor}18`,
                borderColor: `${accentColor}40`,
                fontFamily: 'Figtree, sans-serif',
              }}
            >
              {f}
            </span>
          ))}
        </div>
        <h3
          className="text-2xl lg:text-3xl font-black text-white mb-4"
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          {description}
        </p>
        <motion.a
          href="/contact"
          whileHover={{ x: 6 }}
          className="inline-flex items-center gap-2 font-bold hover:text-white transition-colors text-sm"
          style={{ color: '#983631', fontFamily: 'Figtree, sans-serif' }}
        >
          Request This Material
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute -bottom-6 left-1/4 w-1/2 h-6 rounded-full blur-2xl pointer-events-none"
        style={{
          background: accentColor,
          opacity: hovered ? 0.25 : 0.08,
          transition: 'opacity 0.4s ease',
        }}
      />
    </motion.div>
  )
}

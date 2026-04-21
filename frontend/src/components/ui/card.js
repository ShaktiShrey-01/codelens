import React, { useEffect, useRef } from 'react'
import './card.css'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function Card({
  gap = 8,
  speed = 24,
  colors = ['#f8fafc', '#cbd5e1', '#7b39fc'],
  className = '',
  style,
  ...props
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Get drawing context and parent container that defines animation bounds.
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const parent = canvas.parentElement
    if (!parent) return undefined

    // Respect OS accessibility setting: disable motion if reduced motion is requested.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pixelGap = clamp(Number(gap) || 8, 4, 40)
    const pixelSpeed = reducedMotion ? 0 : clamp(Number(speed) || 24, 0, 100) * 0.015

    let animationFrame = 0
    let resizeObserver = null
    let hover = false
    let pixels = []
    let width = 0
    let height = 0

    const getCanvasSize = () => {
      const rect = parent.getBoundingClientRect()
      if (!rect.width || !rect.height) return false

      const dpr = window.devicePixelRatio || 1
      width = Math.floor(rect.width)
      height = Math.floor(rect.height)

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(dpr, dpr)

      return true
    }

    const createPixels = () => {
      // Build a grid of tiny particles with slight randomization for organic motion.
      pixels = []

      for (let x = 0; x < width; x += pixelGap) {
        for (let y = 0; y < height; y += pixelGap) {
          pixels.push({
            x,
            y,
            baseSize: 0.5 + Math.random() * 1.5,
            size: 0,
            target: 0.8 + Math.random() * 1.3,
            color: colors[Math.floor(Math.random() * colors.length)] || '#f8fafc',
            speed: 0.01 + Math.random() * pixelSpeed,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    const draw = () => {
      // Animation loop: grow pixels on hover and fade them out on mouse leave.
      context.clearRect(0, 0, canvas.width, canvas.height)

      for (const pixel of pixels) {
        const nextSize = hover
          ? Math.min(pixel.target, pixel.size + pixel.speed)
          : Math.max(0, pixel.size - pixel.speed * 0.8)

        pixel.size = nextSize

        if (pixel.size <= 0) continue

        const pulse = 0.7 + Math.sin(performance.now() * 0.004 + pixel.phase) * 0.2
        context.fillStyle = pixel.color
        context.globalAlpha = clamp((pixel.size / pixel.target) * pulse, 0.08, 0.85)
        context.fillRect(pixel.x, pixel.y, pixel.baseSize + pixel.size, pixel.baseSize + pixel.size)
      }

      context.globalAlpha = 1
      animationFrame = window.requestAnimationFrame(draw)
    }

    const rebuild = () => {
      // Recreate pixel map whenever size changes.
      if (!getCanvasSize()) return
      createPixels()
    }

    rebuild()
    draw()

    const handleEnter = () => {
      hover = true
    }

    const handleLeave = () => {
      hover = false
    }

    parent.addEventListener('mouseenter', handleEnter)
    parent.addEventListener('mouseleave', handleLeave)
    parent.addEventListener('focus', handleEnter, { capture: true })
    parent.addEventListener('blur', handleLeave, { capture: true })

    resizeObserver = new ResizeObserver(() => {
      rebuild()
    })
    resizeObserver.observe(parent)

    return () => {
      // Clean up listeners/observers/animation frame to avoid leaks.
      parent.removeEventListener('mouseenter', handleEnter)
      parent.removeEventListener('mouseleave', handleLeave)
      parent.removeEventListener('focus', handleEnter, { capture: true })
      parent.removeEventListener('blur', handleLeave, { capture: true })

      resizeObserver?.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [colors, gap, speed])

  // Canvas is rendered as a passive decorative layer under card content.
  return React.createElement('canvas', {
    ref: canvasRef,
    className: `card-canvas ${className}`.trim(),
    style,
    'aria-hidden': 'true',
    ...props,
  })
}
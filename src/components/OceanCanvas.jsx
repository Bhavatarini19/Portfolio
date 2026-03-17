import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeContext'

const WAVE_BASE = [
  { amp: 8, freq: 0.0085, speed: 0.13, yBase: 0.72 },
  { amp: 6, freq: 0.0130, speed: 0.19, yBase: 0.79 },
  { amp: 4, freq: 0.0185, speed: 0.28, yBase: 0.86 },
]

const STARS = Array.from({ length: 90 }, () => ({
  x: Math.random(),
  y: Math.random() * 0.62,
  r: Math.random() * 1.1 + 0.3,
  base: Math.random() * 0.5 + 0.3,
  phase: Math.random() * Math.PI * 2,
  speed: Math.random() * 0.9 + 0.4,
}))

export default function OceanCanvas() {
  const { theme } = useTheme()
  const canvasRef   = useRef(null)
  const animRef     = useRef(null)
  const waveOffsets = useRef(WAVE_BASE.map(() => Math.random() * Math.PI * 2))
  const celestialR  = useRef(0)   // sun ray rotation / moon shimmer
  const particles   = useRef([])
  const dims        = useRef({ w: 0, h: 0 })
  const themeRef    = useRef(theme)

  // keep themeRef current without restarting the loop
  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const vp  = window.visualViewport
      const w   = vp ? Math.round(vp.width)  : window.innerWidth
      const h   = vp ? Math.round(vp.height) : window.innerHeight
      canvas.width        = w * dpr
      canvas.height       = h * dpr
      canvas.style.width  = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      dims.current = { w, h }
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', resize, { passive: true })
    }

    particles.current = Array.from({ length: 18 }, () => ({
      x: Math.random(), y: 0.62 + Math.random() * 0.36,
      vx: (Math.random() - 0.5) * 0.000025,
      vy: -(Math.random() * 0.000032 + 0.000003),
      r: Math.random() * 0.8 + 0.3,
      phase: Math.random() * Math.PI * 2,
    }))

    let lastTs = 0
    const draw = (ts) => {
      const dt = Math.min((ts - lastTs) / 1000, 0.05)
      lastTs = ts
      const { w, h } = dims.current
      if (w === 0 || h === 0) { animRef.current = requestAnimationFrame(draw); return }
      const t = themeRef.current
      if (!t || !t.waveColors) { animRef.current = requestAnimationFrame(draw); return }

      if (!reduced) {
        const freqMultForSpeed = Math.max(1, 1200 / Math.max(w, 1))
        waveOffsets.current = waveOffsets.current.map((o, i) => o + WAVE_BASE[i].speed * freqMultForSpeed * dt)
        celestialR.current += dt * 0.10
        STARS.forEach(s => { s.phase += s.speed * dt })
      }

      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = 1

      // ── 1. Background gradient ───────────────────────────────
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0,    `rgb(${t.canvasTop.join(',')})`)
      bg.addColorStop(0.42, `rgb(${t.canvasMid.join(',')})`)
      bg.addColorStop(1,    `rgb(${t.canvasBot.join(',')})`)
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // ── 2. Sky haze / night glow ────────────────────────────
      if (!t.isDark) {
        const haze = ctx.createLinearGradient(0, 0, 0, h * 0.45)
        haze.addColorStop(0,   'rgba(255,255,255,0.36)')
        haze.addColorStop(0.4, 'rgba(230,246,255,0.16)')
        haze.addColorStop(1,   'rgba(200,235,252,0)')
        ctx.fillStyle = haze
        ctx.fillRect(0, 0, w, h * 0.45)
      } else {
        // Subtle night atmosphere at top
        const nightHaze = ctx.createLinearGradient(0, 0, 0, h * 0.40)
        nightHaze.addColorStop(0,   'rgba(20,45,100,0.30)')
        nightHaze.addColorStop(1,   'rgba(10,25,60,0)')
        ctx.fillStyle = nightHaze
        ctx.fillRect(0, 0, w, h * 0.40)
      }

      // ── 3. Stars (dark mode only) ───────────────────────────
      if (t.isDark) {
        STARS.forEach(s => {
          const a = s.base * (0.55 + 0.45 * Math.sin(s.phase))
          ctx.beginPath()
          ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(210,235,255,${a.toFixed(2)})`
          ctx.fill()
        })
      }

      // ── 4. Sun / Moon ───────────────────────────────────────
      // Moved to far right (0.92) so it clears the bento photo card
      const celX = w * 0.92
      const celY = h * 0.13
      const celR = Math.min(w, h) * 0.046

      if (!t.isDark) {
        ctx.globalAlpha = 0.25
        // ── SUN ──────────────────────────────────────────────
        // Atmosphere
        const atmos = ctx.createRadialGradient(celX, celY, celR * 0.5, celX, celY, celR * 5)
        atmos.addColorStop(0,    'rgba(255,248,195,0.20)')
        atmos.addColorStop(0.35, 'rgba(255,240,155,0.09)')
        atmos.addColorStop(1,    'rgba(255,240,150,0)')
        ctx.fillStyle = atmos
        ctx.beginPath()
        ctx.arc(celX, celY, celR * 5, 0, Math.PI * 2)
        ctx.fill()

        // Rays
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + celestialR.current
          const inner = celR * 1.35
          const outer = celR * (3.0 + Math.sin(celestialR.current * 2 + i) * 0.28)
          const hw = 0.17
          ctx.beginPath()
          ctx.moveTo(celX + Math.cos(angle - hw) * inner, celY + Math.sin(angle - hw) * inner)
          ctx.lineTo(celX + Math.cos(angle) * outer,      celY + Math.sin(angle) * outer)
          ctx.lineTo(celX + Math.cos(angle + hw) * inner, celY + Math.sin(angle + hw) * inner)
          ctx.closePath()
          const rg = ctx.createRadialGradient(celX, celY, inner, celX, celY, outer)
          rg.addColorStop(0, 'rgba(255,245,165,0.26)')
          rg.addColorStop(1, 'rgba(255,245,165,0)')
          ctx.fillStyle = rg
          ctx.fill()
        }

        // Glow ring
        const glow = ctx.createRadialGradient(celX, celY, celR * 0.6, celX, celY, celR * 2.2)
        glow.addColorStop(0,    'rgba(255,252,215,0.52)')
        glow.addColorStop(0.45, 'rgba(255,245,175,0.20)')
        glow.addColorStop(1,    'rgba(255,240,145,0)')
        ctx.beginPath(); ctx.arc(celX, celY, celR * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = glow; ctx.fill()

        // Core
        const core = ctx.createRadialGradient(celX - celR * 0.2, celY - celR * 0.2, 0, celX, celY, celR)
        core.addColorStop(0,    'rgba(255,255,245,1)')
        core.addColorStop(0.55, 'rgba(255,248,192,0.96)')
        core.addColorStop(1,    'rgba(255,238,148,0.88)')
        ctx.beginPath(); ctx.arc(celX, celY, celR, 0, Math.PI * 2)
        ctx.fillStyle = core; ctx.fill()
        ctx.globalAlpha = 1

      } else {
        ctx.globalAlpha = 0.52
        // ── MOON ─────────────────────────────────────────────
        // Outer glow
        const moonGlow = ctx.createRadialGradient(celX, celY, celR, celX, celY, celR * 3.5)
        moonGlow.addColorStop(0,   'rgba(180,215,255,0.18)')
        moonGlow.addColorStop(0.5, 'rgba(160,200,245,0.07)')
        moonGlow.addColorStop(1,   'rgba(140,190,240,0)')
        ctx.beginPath(); ctx.arc(celX, celY, celR * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = moonGlow; ctx.fill()

        // Moon core
        const moonCore = ctx.createRadialGradient(
          celX - celR * 0.22, celY - celR * 0.22, celR * 0.01,
          celX, celY, celR
        )
        if (moonCore) {
          moonCore.addColorStop(0,    'rgba(240,248,255,0.96)')
          moonCore.addColorStop(0.55, 'rgba(215,235,255,0.90)')
          moonCore.addColorStop(1,    'rgba(190,218,248,0.82)')
          ctx.beginPath(); ctx.arc(celX, celY, celR, 0, Math.PI * 2)
          ctx.fillStyle = moonCore; ctx.fill()
        }

        // Craters — subtle
        [[0.25, -0.20, 0.22], [-0.30, 0.18, 0.16], [0.10, 0.30, 0.12]].forEach(([dx, dy, cr]) => {
          ctx.beginPath()
          ctx.arc(celX + celR * dx, celY + celR * dy, celR * cr, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(170,200,235,0.14)'
          ctx.fill()
        })

        // Shimmer reflection on water below moon
        const reflX = celX
        const reflY = h * 0.70
        const refl = ctx.createRadialGradient(reflX, reflY, 0, reflX, reflY, w * 0.12)
        refl.addColorStop(0,   'rgba(180,220,255,0.12)')
        refl.addColorStop(1,   'rgba(180,220,255,0)')
        ctx.fillStyle = refl
        ctx.fillRect(reflX - w * 0.12, reflY - 20, w * 0.24, 60)
        ctx.globalAlpha = 1
      }

      // ── 5. Waves ─────────────────────────────────────────────
      if (!reduced) {
        // Scale frequency so ~2 full wave cycles always visible regardless of screen width
        const freqMult = Math.max(1, 1200 / w)
        const ampMult  = w < 600 ? 1.6 : w < 900 ? 1.2 : 1

        WAVE_BASE.forEach((wv, i) => {
          const phase = waveOffsets.current[i]
          const baseY = h * wv.yBase
          const wc    = t.waveColors[i]
          const freq  = wv.freq * freqMult
          const amp   = wv.amp  * ampMult

          const wGrad = ctx.createLinearGradient(0, baseY - amp, 0, baseY + amp * 5)
          wGrad.addColorStop(0, `rgba(${wc.cr},${wc.cg},${wc.cb},${wc.ca})`)
          wGrad.addColorStop(1, `rgba(${wc.cr},${wc.cg},${wc.cb},0)`)

          ctx.beginPath()
          ctx.moveTo(0, h)
          for (let x = 0; x <= w; x += 3) {
            const y = baseY
              + Math.sin(x * freq + phase) * amp
              + Math.sin(x * freq * 1.7 + phase * 0.6) * (amp * 0.28)
            ctx.lineTo(x, y)
          }
          ctx.lineTo(w, h)
          ctx.closePath()
          ctx.fillStyle = wGrad
          ctx.fill()

          // Crest shimmer
          ctx.beginPath()
          for (let x = 0; x <= w; x += 3) {
            const y = baseY
              + Math.sin(x * freq + phase) * amp
              + Math.sin(x * freq * 1.7 + phase * 0.6) * (amp * 0.28)
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          ctx.strokeStyle = t.isDark
            ? `rgba(100,170,210,${(0.18 - i * 0.04).toFixed(2)})`
            : `rgba(255,255,255,${(0.22 - i * 0.05).toFixed(2)})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        })
      }

      ctx.globalAlpha = 1

      // ── 6. Water shimmer band ────────────────────────────────
      const shimY = h * 0.70
      const shimGrad = ctx.createLinearGradient(0, shimY - 2, 0, shimY + 16)
      shimGrad.addColorStop(0, t.isDark ? 'rgba(80,150,200,0.08)' : 'rgba(255,255,255,0.09)')
      shimGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = shimGrad
      ctx.fillRect(0, shimY - 2, w, 18)

      // ── 7. Particles ─────────────────────────────────────────
      particles.current.forEach(p => {
        if (!reduced) {
          p.x += p.vx; p.y += p.vy
          if (p.x < -0.02) p.x = 1.02
          if (p.x >  1.02) p.x = -0.02
          if (p.y < 0.55)  p.y = 0.98
          p.phase += 0.003
        }
        const pulse = 0.5 + 0.5 * Math.sin(p.phase)
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(pulse * 0.042).toFixed(3)})`
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', resize)
      }
    }
  }, []) // only runs once — themeRef stays current via the other useEffect

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

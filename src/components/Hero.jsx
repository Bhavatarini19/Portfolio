import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeContext'
import OceanCanvas from './OceanCanvas'

function LiveClock() {
  const { theme: t } = useTheme()
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric', minute: '2-digit', hour12: true,
      }).format(new Date()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ fontSize: '0.78rem', color: t.textPrimary, fontWeight: 600, fontFamily: 'Inter, monospace', letterSpacing: '0.04em' }}>{time} CT</div>
      <div style={{ fontSize: '0.6rem', color: t.textMuted, marginTop: 2, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>Open to relocation</div>
    </div>
  )
}

const tile = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

function ScrollIndicator() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width="22" height="36" viewBox="0 0 22 36" fill="none">
        <rect x="1" y="1" width="20" height="34" rx="10" stroke="rgba(28,80,120,0.45)" strokeWidth="1.5" />
        <motion.circle
          cx="11" cy="10" r="3" fill="rgba(28,80,120,0.55)"
          animate={{ cy: [10, 22, 10] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
      <span style={{ fontSize: '0.62rem', color: 'rgba(28,80,120,0.50)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
        Scroll
      </span>
    </div>
  )
}

export default function Hero() {
  const { theme: t } = useTheme()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const GLASS = {
    background: t.card,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${t.cardBorder}`,
    boxShadow: t.cardShadow,
  }

  return (
    <section id="home" style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
      <OceanCanvas />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'max(88px,10vh) 1.5rem 4rem', width: '100%', position: 'relative', zIndex: 1 }}>

        <div className="bento-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 256px',
          gridTemplateRows: 'auto auto auto',
          gap: 12,
        }}>

          {/* ── NAME + BIO ─────────────────────────────────── */}
          <motion.div {...tile(0.10)} style={{
            ...GLASS,
            gridColumn: '1 / 4',
            gridRow: '1',
            borderRadius: 24,
            padding: '2.2rem 2.6rem',
          }}>
            <div style={{
              fontSize: '0.68rem', fontFamily: 'Inter, monospace',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: t.accent, marginBottom: '1rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ display: 'block', width: 20, height: 1.5, backgroundColor: t.accent, flexShrink: 0 }} />
              Full-Stack Software Engineer
            </div>

            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 3.8vw, 4.4rem)',
              fontWeight: 700, color: t.textPrimary,
              lineHeight: 1.06, marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>
              Bhavatarini
              <br />
              <span style={{ color: t.accent }}>Thangaraju</span>
            </h1>

            <p style={{ fontSize: '0.975rem', color: t.textSecondary, lineHeight: 1.78, maxWidth: 500, margin: 0 }}>
              I build scalable backend systems and full-stack applications with clean
              architecture, reliable APIs, and cloud-native infrastructure.
            </p>
          </motion.div>

          {/* ── PHOTO — spans rows 1–2 ──────────────────────── */}
          <motion.div {...tile(0.14)} style={{
            ...GLASS,
            gridColumn: '4',
            gridRow: '1 / 3',
            borderRadius: 24,
            overflow: 'hidden',
            position: 'relative',
            minHeight: 300,
            border: `1.5px solid ${t.accentBorder}`,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 6px 16px rgba(26,104,130,0.10)',
          }}>
            <img
              src="/profile.png"
              alt="Bhavatarini Thangaraju"
              className="profile-img"
              onError={e => {
                e.currentTarget.style.display = 'none'
                document.getElementById('bt-avatar').style.display = 'flex'
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', position: 'absolute', inset: 0, transformOrigin: 'top center' }}
            />
            {/* Fallback initials */}
            <div id="bt-avatar" style={{
              display: 'none', position: 'absolute', inset: 0,
              background: 'linear-gradient(150deg, rgba(26,104,130,0.10) 0%, rgba(26,104,130,0.22) 100%)',
              alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6,
            }}>
              <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '4rem', fontWeight: 700, color: t.accent, opacity: 0.55, lineHeight: 1 }}>BT</span>
              <span style={{ fontSize: '0.65rem', color: t.textMuted, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Add photo</span>
            </div>
          </motion.div>

          {/* ── LOCATION ───────────────────────────────────── */}
          <motion.div {...tile(0.20)} style={{
            ...GLASS,
            gridColumn: '1',
            gridRow: '2',
            borderRadius: 18,
            padding: '1.15rem 1.5rem',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>📍</span>
            <div>
              <div style={{ fontSize: '0.62rem', color: t.textMuted, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>Location</div>
              <div style={{ fontSize: '0.88rem', color: t.textPrimary, fontWeight: 600 }}>Chicago, IL</div>
              <LiveClock />
            </div>
          </motion.div>

          {/* ── OPEN TO WORK ───────────────────────────────── */}
          <motion.div {...tile(0.26)} style={{
            ...GLASS,
            gridColumn: '2',
            gridRow: '2',
            borderRadius: 18,
            padding: '1.15rem 1.5rem',
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'rgba(220,248,232,0.84)',
            border: '1px solid rgba(34,197,94,0.25)',
          }}>
            <motion.span
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#22C55E', flexShrink: 0, display: 'block', boxShadow: '0 0 8px rgba(34,197,94,0.5)' }}
            />
            <div>
              <div style={{ fontSize: '0.62rem', color: '#2C7A45', fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>Status</div>
              <div style={{ fontSize: '0.88rem', color: '#1A5C35', fontWeight: 600 }}>Open to Work</div>
            </div>
          </motion.div>

          {/* ── STATS ──────────────────────────────────────── */}
          <motion.div {...tile(0.32)} style={{
            ...GLASS,
            gridColumn: '3',
            gridRow: '2',
            borderRadius: 18,
            padding: '1.15rem 1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.8rem',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', fontWeight: 700, color: t.accent, lineHeight: 1 }}>3+</div>
              <div style={{ fontSize: '0.62rem', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginTop: 4 }}>Yrs Exp</div>
            </div>
            <div style={{ width: 1, height: 38, backgroundColor: t.accentBorder }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', fontWeight: 700, color: t.accent, lineHeight: 1 }}>3.9</div>
              <div style={{ fontSize: '0.62rem', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginTop: 4 }}>GPA</div>
            </div>
          </motion.div>

          {/* ── CTA BAR ────────────────────────────────────── */}
          <motion.div {...tile(0.38)} style={{
            ...GLASS,
            gridColumn: '1 / 5',
            gridRow: '3',
            borderRadius: 18,
            padding: '1.1rem 1.8rem',
            display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap',
          }}>
            <button
              onClick={() => scrollTo('projects')}
              style={{
                padding: '0.72rem 1.8rem',
                background: t.isDark
                  ? 'linear-gradient(135deg, #3aaec8, #1e7090)'
                  : 'linear-gradient(135deg, #2e7d88, #1c5965)',
                color: '#fff', border: 'none', borderRadius: 10,
                fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.22s ease', boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.22)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)' }}
            >
              View Projects
            </button>

            <a
              href="/resume.pdf"
              download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '0.72rem 1.8rem',
                backgroundColor: t.accentBg, color: t.accent,
                border: `1.5px solid ${t.accentBorder}`, borderRadius: 10,
                fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.22s ease', letterSpacing: '0.01em',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = t.accentBg; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = t.accentBg; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ height: 1.5, width: 20, backgroundColor: '#C4903A', flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem', color: t.textSecondary, fontWeight: 500, letterSpacing: '0.01em' }}>
                Backend · Distributed Systems · Cloud
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ position: 'absolute', bottom: '3.5%', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}
      >
        <ScrollIndicator />
      </motion.div>

      <style>{`
        .profile-img { transform: scale(1.85) translate(-4%, -18%); }

        @media (max-width: 860px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
          .bento-grid > *:nth-child(1) { grid-column: 1 / 3 !important; grid-row: auto !important; }
          .bento-grid > *:nth-child(2) { grid-column: 1 / 3 !important; grid-row: auto !important; min-height: 320px !important; }
          .bento-grid > *:nth-child(3) { grid-column: 1 !important; grid-row: auto !important; }
          .bento-grid > *:nth-child(4) { grid-column: 2 !important; grid-row: auto !important; }
          .bento-grid > *:nth-child(5) { grid-column: 1 / 3 !important; grid-row: auto !important; }
          .bento-grid > *:nth-child(6) { grid-column: 1 / 3 !important; grid-row: auto !important; }
          .profile-img { transform: scale(1.4) translate(-2%, -12%); }
        }
        @media (max-width: 520px) {
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-grid > * { grid-column: 1 !important; }
          .bento-grid > *:nth-child(2) { min-height: 280px !important; }
          .profile-img { transform: scale(1.3) translate(-2%, -10%); }
        }
      `}</style>
    </section>
  )
}

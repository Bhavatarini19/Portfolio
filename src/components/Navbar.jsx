import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeContext'

const NAV_LINKS = [
  { label: 'Home',       id: 'home'       },
  { label: 'About',      id: 'about'      },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Education',  id: 'education'  },
  { label: 'Contact',    id: 'contact'    },
]

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>  <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>  <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function Navbar() {
  const { theme: t, toggle } = useTheme()
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [active,      setActive]      = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.35, rootMargin: '-60px 0px -35% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const navHeight = scrolled ? 56 : 64
  const barColor  = t.isDark ? 'rgba(200,225,240,0.75)' : '#1C3A50'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: navHeight,
        transition: 'height 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: scrolled ? t.navBg : t.isDark ? 'rgba(3,10,24,0.30)' : 'rgba(255,255,255,0.18)',
        backdropFilter:  scrolled ? 'blur(16px)' : 'blur(4px)',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(4px)',
        borderBottom: scrolled ? `1px solid ${t.navBorder}` : '1px solid transparent',
        boxShadow:    scrolled ? t.navShadow : 'none',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#home" onClick={e => scrollTo(e, 'home')} style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', fontWeight: 700, color: t.navText, textDecoration: 'none', letterSpacing: '0.06em' }}>
            BT
          </a>

          {/* Desktop links */}
          <ul className="nav-desktop" style={{ display: 'flex', listStyle: 'none', gap: '0.25rem', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(link => {
              const isActive = active === link.id
              return (
                <li key={link.id} style={{ position: 'relative' }}>
                  <a
                    href={`#${link.id}`}
                    onClick={e => scrollTo(e, link.id)}
                    className={isActive ? undefined : 'nav-link-hover'}
                    style={{ display: 'block', padding: '5px 10px', fontSize: '0.85rem', fontWeight: isActive ? 600 : 500, letterSpacing: '0.3px', color: isActive ? t.navText : t.navTextMuted, textDecoration: 'none', transition: 'color 0.2s ease', borderRadius: 6 }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = t.navText }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = t.navTextMuted }}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.div layoutId="nav-underline" style={{ position: 'absolute', bottom: 0, left: 12, right: 12, height: 2, backgroundColor: t.navText, borderRadius: 2, boxShadow: t.isDark ? `0 0 8px ${t.navText}` : 'none' }} />
                  )}
                </li>
              )
            })}
          </ul>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={t.isDark ? 'Switch to day mode' : 'Switch to night mode'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
                backgroundColor: t.isDark ? 'rgba(91,170,191,0.15)' : 'rgba(26,104,130,0.10)',
                color: t.navText,
                transition: 'all 0.25s ease',
              }}
            >
              {t.isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Hamburger */}
            <button className="nav-mobile-btn" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu"
              style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', gap: 5, padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6.5 : 0 }} transition={{ duration: 0.25 }} style={{ display: 'block', width: 20, height: 1.5, backgroundColor: barColor, transformOrigin: 'center' }} />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ display: 'block', width: 20, height: 1.5, backgroundColor: barColor }} />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6.5 : 0 }} transition={{ duration: 0.25 }} style={{ display: 'block', width: 20, height: 1.5, backgroundColor: barColor, transformOrigin: 'center' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
            style={{ position: 'fixed', top: navHeight, left: 0, right: 0, zIndex: 49, backgroundColor: t.navBg, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.navBorder}`, boxShadow: t.navShadow }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '0.4rem 0' }}>
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={e => scrollTo(e, link.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.8rem 1.5rem', fontSize: '0.9rem', fontWeight: active === link.id ? 600 : 500, color: active === link.id ? t.navText : t.navTextMuted, textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = t.accentBg)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {active === link.id && <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: t.navText }} />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        .nav-link-hover { position: relative; }
        .nav-link-hover::after { content: ''; position: absolute; bottom: 0; left: 12px; width: 0; height: 2px; border-radius: 2px; background-color: currentColor; transition: width 0.28s ease; }
        .nav-link-hover:hover::after { width: calc(100% - 24px); }
      `}</style>
    </>
  )
}

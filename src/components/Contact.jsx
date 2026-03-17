import React, { useState } from 'react'
import { motion } from 'framer-motion'
import WordReveal from './WordReveal'
import { useTheme } from './ThemeContext'
import SectionBg from './SectionBg'

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const GHIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 13a19.79 19.79 0 01-3.07-8.67A2 2 0 012.86 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)

function ContactCard({ card, index }) {
  const { theme: t } = useTheme()
  const [hovered, setHovered] = useState(false)

  const phoneIconColor = t.isDark ? '#3A9E6A' : '#2C7A55'
  const iconColor = card.label === 'Phone' ? phoneIconColor : t.accent

  return (
    <motion.a
      href={card.href}
      target={card.href.startsWith('http') ? '_blank' : undefined}
      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: t.card,
        borderRadius: 16,
        padding: '1.2rem 1.5rem',
        border: `1px solid ${hovered ? t.accentBorder : t.cardBorder}`,
        textDecoration: 'none',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: hovered ? t.cardHover : t.cardShadow,
        transition: 'all 0.26s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        backgroundColor: t.accentBg,
        color: iconColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        border: `1px solid ${t.accentBorder}`,
      }}>
        <card.Icon />
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ fontSize: '0.67rem', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: t.textMuted, marginBottom: 3, fontWeight: 600 }}>
          {card.label}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: t.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {card.value}
        </div>
      </div>
    </motion.a>
  )
}

const CARDS = [
  { Icon: EmailIcon,    label: 'Email',    value: 'bhavatarinithangaraju@gmail.com',   href: 'mailto:bhavatarinithangaraju@gmail.com' },
  { Icon: LinkedInIcon, label: 'LinkedIn', value: 'bhavatarini-thangaraju',            href: 'https://linkedin.com/in/bhavatarini-thangaraju' },
  { Icon: GHIcon,       label: 'GitHub',   value: 'bhavatarini-thangaraju',            href: 'https://github.com/bhavatarini-thangaraju' },
  { Icon: PhoneIcon,    label: 'Phone',    value: '(312) 285-3281',                    href: 'tel:+13122853281' },
]

export default function Contact() {
  const { theme: t } = useTheme()

  return (
    <section id="contact" style={{ padding: '3rem 0 5rem', backgroundColor: t.sectionBlue, position: 'relative', overflow: 'hidden' }}>
      <SectionBg />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontSize: '0.72rem', fontFamily: 'Inter, monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.label, marginBottom: '0.75rem', fontWeight: 600 }}
        >
          06 · Contact
        </motion.div>

        <div style={{ maxWidth: 640, marginBottom: '3.5rem' }}>
          <WordReveal
            segments={[{ text: "Let's" }, { text: 'Connect', accent: true }]}
            style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 700, color: t.textPrimary, marginBottom: '1rem' }}
            accentColor={t.accent}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}
            style={{ fontSize: '1.05rem', color: t.textSecondary, lineHeight: 1.75, margin: 0 }}
          >
            I'm always open to discussing engineering opportunities, collaborations,
            or interesting technical problems.
          </motion.p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: 640 }}>
          {CARDS.map((card, i) => <ContactCard key={card.label} card={card} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) { .contact-grid { grid-template-columns: 1fr !important; max-width: 100% !important; } }
      `}</style>
    </section>
  )
}

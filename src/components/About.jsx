import React from 'react'
import { motion } from 'framer-motion'
import WordReveal from './WordReveal'
import CountUp from './CountUp'
import { useTheme } from './ThemeContext'
import SectionBg from './SectionBg'

const FOCUS_CARDS = [
  {
    symbol: '◈',
    title: 'Systems Thinking',
    desc: 'Designing scalable architectures with clear service boundaries, resilient patterns, and long-term maintainability.',
  },
  {
    symbol: '⬡',
    title: 'Scalable Backend Engineering',
    desc: 'Building high-throughput APIs, event-driven pipelines, and distributed microservices that perform reliably at scale.',
  },
  {
    symbol: '◎',
    title: 'AI-Driven Development',
    desc: 'Integrating ML models, NLP pipelines, and intelligent features into production full-stack applications.',
  },
]

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '60M+', label: 'Records Processed' },
  { value: '99.9%', label: 'Uptime Achieved' },
  { value: '3.9', label: 'GPA / 4.0' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

export default function About() {
  const { theme: t } = useTheme()

  return (
    <section id="about" style={{ padding: '3rem 0 5rem', backgroundColor: t.sectionLight, position: 'relative', overflow: 'hidden' }}>
      <SectionBg />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0)} style={{
          fontSize: '0.72rem', fontFamily: 'Inter, monospace', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: t.label, marginBottom: '0.75rem', fontWeight: 600,
        }}>
          01 · About
        </motion.div>

        <WordReveal
          segments={[{ text: 'Engineer. Builder.' }, { text: 'Solver.', accent: true }]}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: 700, color: t.textPrimary, marginBottom: '4rem', lineHeight: 1.15,
          }}
          accentColor={t.accent}
        />

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', lineHeight: 1.8, fontSize: '0.975rem', marginBottom: '2.2rem' }}>
              <p style={{ fontSize: '1.05rem', color: t.textSecondary, margin: 0 }}>
                I design scalable backend systems, distributed microservices, and data-driven
                platforms. My work focuses on building reliable APIs, high-throughput event
                pipelines, and cloud-native systems that perform consistently at scale.
              </p>
              <p style={{ margin: 0, color: t.textSecondary }}>
                My work spans microservices architecture, cloud infrastructure, and AI-enabled
                applications — from Kafka-based event pipelines processing millions of records
                to NLP classification systems achieving 90%+ accuracy.
              </p>
              <blockquote style={{
                margin: '0.4rem 0 0',
                borderLeft: `2px solid ${t.accentBorder}`,
                paddingLeft: '1rem',
                fontStyle: 'italic',
                color: t.textMuted,
                fontSize: '0.9rem',
                lineHeight: 1.72,
              }}>
                "I draw inspiration from nature, cooking, and handcrafted creativity — which
                influences the thoughtful way I design software systems."
              </blockquote>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -3, boxShadow: t.cardHover }}
                  style={{
                    background: t.card,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: 14,
                    padding: '1.1rem 1.3rem',
                    border: `1px solid ${t.cardBorder}`,
                    boxShadow: t.cardShadow,
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', fontWeight: 800, color: t.accent, lineHeight: 1 }}>
                    <CountUp value={s.value} />
                  </div>
                  <div style={{ fontSize: '0.73rem', color: t.textMuted, marginTop: '0.3rem', fontWeight: 500 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FOCUS_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.13 }}
                whileHover={{ y: -4, boxShadow: t.cardHover }}
                style={{
                  background: t.card,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 16,
                  padding: '1.55rem 1.7rem',
                  border: `1px solid ${t.cardBorder}`,
                  boxShadow: t.cardShadow,
                  transition: 'all 0.28s ease',
                  cursor: 'default',
                }}
              >
                <div style={{ fontSize: '1.45rem', color: t.accent, marginBottom: '0.7rem' }}>{card.symbol}</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.05rem', fontWeight: 600, color: t.textPrimary, marginBottom: '0.45rem' }}>{card.title}</h3>
                <p style={{ fontSize: '0.865rem', color: t.textSecondary, lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
      `}</style>
    </section>
  )
}

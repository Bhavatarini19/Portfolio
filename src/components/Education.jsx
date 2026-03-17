import React from 'react'
import { motion } from 'framer-motion'
import WordReveal from './WordReveal'
import { useTheme } from './ThemeContext'
import SectionBg from './SectionBg'

const coursework = [
  'Data Structures & Algorithms',
  'Operating Systems',
  'Cloud Services',
  'Machine Learning',
  'Big Data Technologies',
  'Database Management',
  'Distributed Systems',
  'Statistical Methods',
]

const exploringItems = [
  { title: 'LLM Engineering', icon: '🤖' },
  { title: 'Distributed Systems', icon: '⚡' },
  { title: 'System Design', icon: '🏗️' },
  { title: 'AWS Solutions Arch.', icon: '☁️' },
]

export default function Education() {
  const { theme: t } = useTheme()

  return (
    <section id="education" style={{ padding: '3rem 0 5rem', backgroundColor: t.sectionLight, position: 'relative', overflow: 'hidden' }}>
      <SectionBg />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: '0.72rem', fontFamily: 'Inter, monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.label, marginBottom: '0.75rem', fontWeight: 600 }}
        >
          05 · Education
        </motion.div>

        <WordReveal
          segments={[{ text: 'Academic' }, { text: 'Background', accent: true }]}
          style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700, color: t.textPrimary, marginBottom: '4rem' }}
          accentColor={t.accent}
        />

        <div className="edu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.8rem', alignItems: 'start' }}>
          {/* Degree card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            whileHover={{ boxShadow: t.cardHover }}
            style={{
              background: t.card,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 20,
              padding: '2rem 2.2rem',
              border: `1px solid ${t.cardBorder}`,
              boxShadow: t.cardShadow,
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.6rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: t.accentBg, border: `1px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                🎓
              </div>
              <div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', fontWeight: 700, color: t.textPrimary, margin: '0 0 4px' }}>
                  Master of Data Science
                </h3>
                <p style={{ fontSize: '0.9rem', color: t.accent, fontWeight: 600, margin: '0 0 8px' }}>
                  Illinois Institute of Technology
                </p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: t.textMuted, fontFamily: 'monospace' }}>Jan 2024 – Dec 2025</span>
                  <span style={{ fontSize: '0.72rem', backgroundColor: t.accentBg, color: t.accent, padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>
                    GPA 3.9 / 4.0
                  </span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${t.accentBorder}`, paddingTop: '1.3rem' }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: t.label, marginBottom: '0.75rem', fontWeight: 600 }}>
                Relevant Coursework
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {coursework.map((c) => (
                  <span
                    key={c}
                    style={{ fontSize: '0.72rem', backgroundColor: t.accentBg, border: `1px solid ${t.accentBorder}`, color: t.accentText, padding: '4px 10px', borderRadius: 20, fontWeight: 500 }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* AWS Cert */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              whileHover={{ boxShadow: t.cardHover }}
              style={{
                background: t.card,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 18,
                padding: '1.5rem 1.8rem',
                border: `1px solid ${t.cardBorder}`,
                boxShadow: t.cardShadow,
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: t.accentBg, border: `1px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  ☁️
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: 600, color: t.textPrimary, margin: '0 0 3px' }}>
                    AWS Certified Cloud Practitioner
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: t.textMuted, margin: 0 }}>Amazon Web Services · 2024</p>
                </div>
                <span style={{ fontSize: '0.68rem', backgroundColor: t.accentBg, color: t.accent, padding: '3px 12px', borderRadius: 20, fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Certified
                </span>
              </div>
            </motion.div>

            {/* Currently exploring */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              style={{
                background: t.card,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 18,
                padding: '1.5rem 1.8rem',
                border: `1px solid ${t.cardBorder}`,
                boxShadow: t.cardShadow,
              }}
            >
              <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: t.label, marginBottom: '1rem', fontWeight: 600 }}>
                Currently Exploring
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
                {exploringItems.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: t.accentBg,
                      borderRadius: 12,
                      padding: '0.7rem 0.9rem',
                      border: `1px solid ${t.accentBorder}`,
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.8rem', color: t.textSecondary, fontWeight: 500 }}>{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .edu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

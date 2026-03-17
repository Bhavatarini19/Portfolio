import React, { useState } from 'react'
import { motion } from 'framer-motion'
import WordReveal from './WordReveal'
import { useTheme } from './ThemeContext'
import SectionBg from './SectionBg'

const TECH_COLORS = {
  Java:                 '#E76F00',
  Python:               '#3776AB',
  JavaScript:           '#b8a000',
  TypeScript:           '#3178C6',
  React:                '#00aacc',
  Angular:              '#DD0031',
  'HTML/CSS':           '#E44D26',
  'Spring Boot':        '#6DB33F',
  'Spring Security':    '#6DB33F',
  'Spring Batch':       '#6DB33F',
  Kafka:                '#8B5CF6',
  gRPC:                 '#244c5a',
  Maven:                '#C71A36',
  REST:                 null,
  Microservices:        null,
  Docker:               '#2496ED',
  Kubernetes:           '#326CE5',
  Jenkins:              '#C73B2E',
  'CI/CD':              null,
  Git:                  '#F05032',
  Oracle:               '#F80000',
  PostgreSQL:           '#4169E1',
  MongoDB:              '#47A248',
  Snowflake:            '#29B5E8',
  Hive:                 '#FDEE21',
  Spark:                '#E25A1C',
  Hadoop:               '#FFD140',
  SQL:                  null,
  'AWS ECS':            '#FF9900',
  'AWS RDS':            '#FF9900',
  'AWS MSK':            '#FF9900',
  Lambda:               '#FF9900',
  S3:                   '#FF9900',
  'Scikit-learn':       '#F7931E',
  PyTorch:              '#EE4C2C',
  NLTK:                 '#154f3c',
  SentenceTransformer:  '#6366F1',
  XGBoost:              '#337AB7',
  OpenCV:               '#5C3EE8',
  Pandas:               '#150458',
  FastAPI:              '#009688',
  FAISS:                '#1877F2',
  Flask:                '#555555',
  CNN:                  null,
  'Random Forest':      null,
  'K-Means':            null,
  Streamlit:            '#FF4B4B',
  JWT:                  null,
  'AWS CDK':            '#FF9900',
}

const GROUPS = [
  {
    title: 'Backend Engineering',
    icon: '⚙️',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'Kafka', 'REST', 'gRPC', 'Microservices', 'Spring Batch', 'Maven'],
  },
  {
    title: 'Frontend Development',
    icon: '🖥️',
    skills: ['React', 'TypeScript', 'Angular', 'JavaScript', 'HTML/CSS'],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    skills: ['Oracle', 'PostgreSQL', 'MongoDB', 'Snowflake', 'Hive', 'Spark', 'Hadoop', 'SQL'],
  },
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    skills: ['AWS ECS', 'AWS RDS', 'AWS MSK', 'Lambda', 'S3', 'Kubernetes', 'Docker', 'Jenkins', 'CI/CD', 'Git'],
  },
  {
    title: 'AI / ML',
    icon: '🧠',
    skills: ['Python', 'Scikit-learn', 'PyTorch', 'NLTK', 'SentenceTransformer', 'XGBoost', 'OpenCV', 'Pandas', 'FastAPI', 'FAISS'],
  },
]

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function Chip({ label }) {
  const { theme: t } = useTheme()
  const [hovered, setHovered] = useState(false)
  const brandColor = TECH_COLORS[label]

  const bg     = brandColor ? hexToRgba(brandColor, hovered ? 0.18 : 0.10) : t.accentBg
  const border = brandColor ? hexToRgba(brandColor, hovered ? 0.55 : 0.30) : t.accentBorder
  const color  = brandColor ? brandColor : (hovered ? t.accent : t.accentText)

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: '0.73rem',
        backgroundColor: bg,
        border: `1px solid ${border}`,
        color,
        padding: '4px 11px',
        borderRadius: 20,
        fontWeight: 500,
        transition: 'all 0.18s ease',
        cursor: 'default',
        opacity: hovered ? 1 : 0.88,
      }}
    >
      {label}
    </span>
  )
}

export default function Skills() {
  const { theme: t } = useTheme()
  const [activeGroup, setActiveGroup] = useState(null)

  return (
    <section id="skills" style={{ padding: '3rem 0 5rem', backgroundColor: t.sectionBlue, position: 'relative', overflow: 'hidden' }}>
      <SectionBg />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontSize: '0.72rem', fontFamily: 'Inter, monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.label, marginBottom: '0.75rem', fontWeight: 600 }}
        >
          04 · Skills
        </motion.div>

        <WordReveal
          segments={[{ text: 'Technical' }, { text: 'Toolkit', accent: true }]}
          style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 700, color: t.textPrimary, marginBottom: '2rem' }}
          accentColor={t.accent}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2.5rem' }}>
          {GROUPS.map(g => {
            const isActive = activeGroup === g.title
            return (
              <button
                key={g.title}
                onClick={() => setActiveGroup(isActive ? null : g.title)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 20,
                  border: `1.5px solid ${isActive ? t.accent : t.accentBorder}`,
                  backgroundColor: isActive ? t.accentBg : 'transparent',
                  color: isActive ? t.accent : t.textMuted,
                  fontSize: '0.78rem', fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  boxShadow: isActive && t.isDark ? `0 0 10px ${t.accent}40` : 'none',
                }}
              >
                <span style={{ fontSize: '0.85rem' }}>{g.icon}</span> {g.title}
              </button>
            )
          })}
          {activeGroup && (
            <button
              onClick={() => setActiveGroup(null)}
              style={{ padding: '6px 12px', borderRadius: 20, border: '1.5px solid transparent', background: 'none', color: t.textMuted, fontSize: '0.72rem', cursor: 'pointer', opacity: 0.65 }}
            >
              Clear ×
            </button>
          )}
        </div>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
          {GROUPS.map((group, i) => {
            const isActive = activeGroup === null || activeGroup === group.title
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                whileHover={{ y: -5, boxShadow: t.cardHover }}
                animate={{ opacity: isActive ? 1 : 0.28, scale: isActive ? 1 : 0.97 }}
                onClick={() => setActiveGroup(activeGroup === group.title ? null : group.title)}
                style={{
                  background: t.card,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 18,
                  padding: '1.6rem',
                  border: `1px solid ${activeGroup === group.title ? t.accent : t.cardBorder}`,
                  boxShadow: activeGroup === group.title
                    ? (t.isDark ? `0 0 18px ${t.accent}30, ${t.cardShadow}` : t.cardHover)
                    : t.cardShadow,
                  transition: 'all 0.28s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '1.2rem', display: 'inline-block' }}>{group.icon}</span>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.98rem', fontWeight: 600, color: t.textPrimary, margin: 0 }}>{group.title}</h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.skills.map(s => <Chip key={s} label={s} />)}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

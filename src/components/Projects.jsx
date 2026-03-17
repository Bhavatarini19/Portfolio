import React from 'react'
import { motion } from 'framer-motion'
import WordReveal from './WordReveal'
import { useTheme } from './ThemeContext'
import SectionBg from './SectionBg'

const TECH_COLORS = {
  Java: '#E76F00', 'Spring Boot': '#6DB33F', REST: null, gRPC: '#244c5a',
  Kafka: '#8B5CF6', PostgreSQL: '#4169E1', Docker: '#2496ED', JWT: null, 'AWS CDK': '#FF9900',
  Python: '#3776AB', OpenCV: '#5C3EE8', PyTorch: '#EE4C2C', Flask: '#555555', CNN: null,
  'Scikit-learn': '#F7931E', FastAPI: '#009688', Streamlit: '#FF4B4B',
  'Random Forest': null, 'K-Means': null, Microservices: null,
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

const GHIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const PROJECTS = [
  {
    title: 'ClinicPro',
    subtitle: 'Patient Management System',
    description: 'Architected a microservices healthcare platform with authentication, patient, billing, analytics, and API gateway services using event-driven architecture. JWT-secured APIs with distributed messaging via Kafka.',
    tech: ['Java', 'Spring Boot', 'REST', 'gRPC', 'Kafka', 'PostgreSQL', 'Docker', 'JWT', 'AWS CDK'],
    github: '#',
    icon: '🏥',
  },
  {
    title: 'Gesture-Driven Communication',
    subtitle: 'Assistive Communication System',
    description: 'Built a real-time computer vision system translating hand gestures into speech, achieving 95% classification accuracy using CNN-based gesture recognition and PyTorch inference.',
    tech: ['Python', 'OpenCV', 'PyTorch', 'Flask', 'CNN'],
    github: '#',
    icon: '🤖',
  },
  {
    title: 'Dynamic Pricing Engine',
    subtitle: 'Airbnb Price Prediction',
    description: 'ML model predicting optimal Airbnb prices with a FastAPI inference endpoint and Streamlit dashboard. Improved prediction precision by 25% using Random Forest ensembles.',
    tech: ['Python', 'Scikit-learn', 'FastAPI', 'Streamlit', 'Random Forest', 'K-Means'],
    github: '#',
    icon: '📊',
  },
]

function ProjectCard({ project, index }) {
  const { theme: t } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -5, boxShadow: t.cardHover }}
      style={{
        background: t.card,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 20,
        border: `1px solid ${t.cardBorder}`,
        borderTop: `1.5px solid ${t.accentBorder}`,
        overflow: 'hidden',
        boxShadow: t.cardShadow,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Card header */}
      <div style={{ padding: '1.6rem 1.8rem 0', display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: t.accentBg, border: `1px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', flexShrink: 0 }}>
          {project.icon}
        </div>
        <div>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.08rem', fontWeight: 600, color: t.textPrimary, margin: '0 0 2px' }}>{project.title}</h3>
          <p style={{ fontSize: '0.78rem', color: t.accent, fontWeight: 600, margin: 0 }}>{project.subtitle}</p>
        </div>
      </div>

      <div style={{ padding: '0 1.8rem 1.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{ fontSize: '0.875rem', color: t.textSecondary, lineHeight: 1.72, flex: 1, marginBottom: '1.2rem' }}>{project.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1.2rem' }}>
          {project.tech.map(tech => {
            const brand = TECH_COLORS[tech]
            return (
              <span key={tech} style={{
                fontSize: '0.7rem',
                backgroundColor: brand ? hexToRgba(brand, 0.10) : t.accentBg,
                border: `1px solid ${brand ? hexToRgba(brand, 0.32) : t.accentBorder}`,
                color: brand || t.accentText,
                padding: '3px 10px', borderRadius: 20, fontWeight: 500,
              }}>{tech}</span>
            )
          })}
        </div>

        <div style={{ paddingTop: '1rem', borderTop: `1px solid ${t.accentBorder}` }}>
          <a
            href={project.github}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: t.textMuted, textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = t.accent)}
            onMouseLeave={e => (e.currentTarget.style.color = t.textMuted)}
          >
            <GHIcon /> View on GitHub
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { theme: t } = useTheme()

  return (
    <section id="projects" style={{ padding: '3rem 0 5rem', backgroundColor: t.sectionLight, position: 'relative', overflow: 'hidden' }}>
      <SectionBg />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontSize: '0.72rem', fontFamily: 'Inter, monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.label, marginBottom: '0.75rem', fontWeight: 600 }}
        >
          03 · Projects
        </motion.div>

        <WordReveal
          segments={[{ text: 'Selected' }, { text: 'Work', accent: true }]}
          style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 700, color: t.textPrimary, marginBottom: '4rem' }}
          accentColor={t.accent}
        />

        <div className="proj-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.4rem' }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .proj-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .proj-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

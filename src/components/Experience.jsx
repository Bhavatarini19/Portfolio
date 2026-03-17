import React from 'react'
import { motion } from 'framer-motion'
import WordReveal from './WordReveal'
import { useTheme } from './ThemeContext'
import SectionBg from './SectionBg'

const EXPERIENCES = [
  {
    company: 'Labelmaster',
    role: 'Software Engineering Intern',
    period: 'Jan 2025 – May 2025',
    location: 'Chicago, IL',
    recent: true,
    bullets: [
      'Performed EDA and data quality improvements on CRM data in Python, improving model feature selection.',
      'Built NLP pipelines using NLTK and SentenceTransformer, improving classification accuracy to 90%.',
      'Developed XGBoost imputation pipelines across 350K+ records, increasing data completeness to 95%.',
    ],
    tech: ['Python', 'NLTK', 'SentenceTransformer', 'XGBoost', 'Pandas', 'Scikit-learn'],
    dotColor: '#2C6E73',
    lineColor: 'rgba(44,110,115,0.2)',
  },
  {
    company: 'Bosch Global Software Technologies',
    role: 'Software Engineer',
    period: 'Jul 2022 – Dec 2023',
    location: 'Bengaluru, India',
    bullets: [
      'Designed Kafka-based distributed microservices and defined service communication patterns.',
      'Optimized Spring Batch and Oracle PL/SQL pipelines processing 60M+ records.',
      'Debugged distributed services using logging, tracing, and profiling tools.',
      'Implemented JWT + RBAC using Spring Security securing 30+ APIs.',
    ],
    tech: ['Java', 'Spring Boot', 'Kafka', 'Spring Batch', 'Oracle PL/SQL', 'Spring Security', 'JWT'],
    dotColor: '#D6A96C',
    lineColor: 'rgba(214,169,108,0.2)',
  },
  {
    company: 'Bosch Global Software Technologies',
    role: 'Associate Software Engineer',
    period: 'Jul 2021 – Jun 2022',
    location: 'Bengaluru, India',
    bullets: [
      'Owned design of a Spring Boot microservice defining API contracts and data models.',
      'Built production REST APIs with pagination and SQL tuning, improving response time by 98%.',
      'Deployed services on Apache Tomcat with load balancing, achieving 99.9% uptime.',
      'Built React + TypeScript UI workflows integrating backend APIs.',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'SQL', 'React', 'TypeScript', 'Apache Tomcat'],
    dotColor: '#8FCBC2',
    lineColor: 'rgba(143,203,194,0.4)',
  },
  {
    company: 'Bosch Global Software Technologies',
    role: 'Software Engineering Intern',
    period: 'Sep 2020 – Jun 2021',
    location: 'Bengaluru, India',
    bullets: [
      'Built Python chatbot microservice reducing support workload by 40%.',
      'Improved test coverage using JUnit and Mockito.',
      'Helped implement Jenkins CI/CD pipelines.',
    ],
    tech: ['Python', 'Java', 'JUnit', 'Mockito', 'Jenkins', 'CI/CD'],
    dotColor: '#E6D7B8',
    lineColor: 'rgba(230,215,184,0.5)',
  },
]

export default function Experience() {
  const { theme: t } = useTheme()

  return (
    <section id="experience" style={{ padding: '3rem 0 5rem', backgroundColor: t.sectionBlue, position: 'relative', overflow: 'hidden' }}>
      <SectionBg />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontSize: '0.72rem', fontFamily: 'Inter, monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.label, marginBottom: '0.75rem', fontWeight: 600 }}
        >
          02 · Experience
        </motion.div>

        <WordReveal
          segments={[{ text: 'Work' }, { text: 'History', accent: true }]}
          style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 700, color: t.textPrimary, marginBottom: '4rem' }}
          accentColor={t.accent}
        />

        <div style={{ position: 'relative' }}>
          {/* Timeline vertical line */}
          <div className="tl-line" style={{ position: 'absolute', left: 19, top: 8, bottom: 8, width: 1, background: `linear-gradient(180deg, ${t.accent} 0%, ${t.accent}99 55%, ${t.accent}44 100%)` }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.18 }}
                className="tl-item"
                style={{ position: 'relative', paddingLeft: 58 }}
              >
                {/* Nautical dot */}
                <motion.div
                  className="tl-dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.18, type: 'spring', stiffness: 280, damping: 20 }}
                  style={{
                    position: 'absolute', left: 8, top: 20,
                    width: 23, height: 23, borderRadius: '50%',
                    background: `radial-gradient(circle at 35% 35%, ${exp.dotColor}, ${exp.dotColor}BB)`,
                    border: '2.5px solid rgba(255,255,255,0.25)',
                    boxShadow: `0 0 0 4px ${exp.dotColor}22, 0 2px 8px ${exp.dotColor}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)' }} />
                  {exp.recent && (
                    <motion.div
                      animate={{ scale: [1, 1.9, 1], opacity: [0.55, 0, 0.55] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                      style={{
                        position: 'absolute', inset: -5, borderRadius: '50%',
                        border: `1.5px solid ${exp.dotColor}`,
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </motion.div>

                <motion.div
                  whileHover={{ boxShadow: t.cardHover }}
                  style={{
                    background: t.card,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: 18,
                    padding: '1.7rem 2rem',
                    border: `1px solid ${t.cardBorder}`,
                    borderLeft: `2.5px solid ${t.accentBorder}`,
                    boxShadow: t.cardShadow,
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <div className="exp-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.12rem', fontWeight: 600, color: t.textPrimary, margin: 0 }}>{exp.role}</h3>
                        {exp.recent && (
                          <span style={{ fontSize: '0.65rem', backgroundColor: t.accentBg, color: t.accent, padding: '2px 9px', borderRadius: 20, fontWeight: 600 }}>Recent</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: t.accent, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>
                      <div style={{ fontSize: '0.78rem', color: t.textMuted }}>📍 {exp.location}</div>
                    </div>
                    <div style={{ fontSize: '0.77rem', color: t.textSecondary, fontFamily: 'monospace', backgroundColor: t.accentBg, border: `1px solid ${t.accentBorder}`, padding: '4px 11px', borderRadius: 8, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {exp.period}
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {exp.bullets.map((b, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + j * 0.07 }}
                        style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.875rem', color: t.textSecondary, lineHeight: 1.65 }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: t.accent, flexShrink: 0, marginTop: 8 }} />
                        {b}
                      </motion.li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {exp.tech.map(tech => (
                      <span key={tech} style={{ fontSize: '0.7rem', backgroundColor: t.accentBg, border: `1px solid ${t.accentBorder}`, color: t.accentText, padding: '3px 10px', borderRadius: 20, fontWeight: 500 }}>{tech}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tl-line, .tl-dot { display: none !important; }
          .tl-item { padding-left: 0 !important; }
          .exp-header { flex-direction: column !important; }
        }
      `}</style>
    </section>
  )
}

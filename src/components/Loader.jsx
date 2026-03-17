import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

const DONE_MS = 1600

export default function Loader({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, DONE_MS)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #DAF2FF 0%, #B8DCEF 45%, #90C4E0 100%)',
      }}
    >
      {/* Sun glow */}
      <div style={{
        position: 'absolute',
        top: '8%',
        right: '18%',
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,248,200,0.55) 0%, rgba(255,240,150,0.18) 45%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Sun core */}
      <div style={{
        position: 'absolute',
        top: '9%',
        right: '20%',
        width: 54,
        height: 54,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 38%, #fffdf0, #fff5b0)',
        boxShadow: '0 0 28px rgba(255,245,160,0.55)',
        transform: 'translate(50%, 0)',
      }} />

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* BT monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '5rem',
            fontWeight: 700,
            color: '#1A6882',
            lineHeight: 1,
            marginBottom: '1rem',
            opacity: 0.88,
          }}
        >
          BT
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: '0.78rem',
            fontFamily: 'Inter, monospace',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(26,80,120,0.65)',
            fontWeight: 600,
            marginBottom: '2rem',
          }}
        >
          Bhavatarini Thangaraju
        </motion.div>

        {/* Wave loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'flex-end', height: 22 }}
        >
          {[0, 1, 2, 3, 4].map(i => (
            <motion.span
              key={i}
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
              style={{
                display: 'block',
                width: 4,
                height: 18,
                borderRadius: 3,
                backgroundColor: '#1A6882',
                opacity: 0.55,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Animated waves at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, overflow: 'hidden', height: 110 }}>
        {/* Wave 1 — faster */}
        <motion.svg
          width="200%" height="110"
          viewBox="0 0 2880 110"
          preserveAspectRatio="none"
          animate={{ x: [0, -1440] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0 55 C360 20,720 90,1080 55 C1440 20,1800 90,2160 55 C2520 20,2880 90,3240 55 L3240 110 L0 110 Z"
            fill="rgba(26,104,130,0.18)"
          />
        </motion.svg>
        {/* Wave 2 — slower, offset */}
        <motion.svg
          width="200%" height="110"
          viewBox="0 0 2880 110"
          preserveAspectRatio="none"
          animate={{ x: [0, -1440] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0 70 C360 40,720 100,1080 70 C1440 40,1800 100,2160 70 C2520 40,2880 100,3240 70 L3240 110 L0 110 Z"
            fill="rgba(26,104,130,0.12)"
          />
        </motion.svg>
        {/* Wave 3 — slowest */}
        <motion.svg
          width="200%" height="110"
          viewBox="0 0 2880 110"
          preserveAspectRatio="none"
          animate={{ x: [-720, -2160] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0 80 C360 55,720 105,1080 80 C1440 55,1800 105,2160 80 C2520 55,2880 105,3240 80 L3240 110 L0 110 Z"
            fill="rgba(255,255,255,0.22)"
          />
        </motion.svg>
      </div>
    </motion.div>
  )
}

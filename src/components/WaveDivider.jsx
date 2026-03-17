import React from 'react'
import { motion } from 'framer-motion'

const PATHS = {
  A: 'M0 32 C200 6, 400 58, 720 28 C1040 -2, 1260 54, 1440 22 L1440 64 L0 64 Z',
  B: 'M0 18 C120 48, 240 8, 480 32 C720 56, 840 12, 960 36 C1080 58, 1200 16, 1440 28 L1440 64 L0 64 Z',
  C: 'M0 44 C360 26, 720 56, 1080 36 C1200 30, 1340 46, 1440 38 L1440 64 L0 64 Z',
}

/**
 * WaveDivider — SVG wave transition between two sections.
 * @param {string}  from     bg colour of section above
 * @param {string}  to       bg colour of section below
 * @param {boolean} flip     mirror horizontally for visual variety
 * @param {'A'|'B'|'C'} variant  wave shape (A=gentle, B=rolling, C=subtle)
 */
export default function WaveDivider({ from, to, flip = false, variant = 'A' }) {
  return (
    <div
      style={{ backgroundColor: from, marginBottom: -4, lineHeight: 0, fontSize: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          display: 'block',
          transform: flip ? 'scaleX(-1)' : 'none',
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <path d={PATHS[variant] || PATHS.A} fill={to} />
      </motion.svg>
    </div>
  )
}

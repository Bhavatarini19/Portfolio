import React from 'react'
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}
const wordAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const accentAnim = {
  hidden: { opacity: 0, y: 26, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
}

/**
 * WordReveal — animates heading words in sequence on scroll.
 * @param {Array}  segments  [{ text: string, accent?: boolean }, ...]
 * @param {object} style     applied to the h2 element
 * @param {string} className
 */
export default function WordReveal({ segments, style, className, accentColor = '#2C6E73' }) {
  const words = segments.flatMap((seg, si) =>
    seg.text.trim().split(/\s+/).map((w, wi, arr) => ({
      text: w,
      accent: seg.accent || false,
      key: `${si}-${wi}`,
      addSpace: wi < arr.length - 1 || si < segments.length - 1,
    }))
  )

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={style}
      className={className}
    >
      {words.map((w) => (
        <React.Fragment key={w.key}>
          <motion.span
            variants={w.accent ? accentAnim : wordAnim}
            style={{
              display: 'inline-block',
              ...(w.accent ? { color: accentColor } : {}),
            }}
          >
            {w.text}
          </motion.span>
          {w.addSpace && ' '}
        </React.Fragment>
      ))}
    </motion.h2>
  )
}

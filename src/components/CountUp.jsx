import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function parse(str) {
  const m = str.match(/^([\d.]+)(.*)$/)
  if (!m) return { num: 0, suffix: str, dec: 0 }
  const dec = m[1].includes('.') ? m[1].split('.')[1].length : 0
  return { num: parseFloat(m[1]), suffix: m[2] || '', dec }
}

/**
 * CountUp — animates a numeric value from 0 to the target when scrolled into view.
 * Parses "3+", "60M+", "99.9%", "3.9" etc. automatically.
 */
export default function CountUp({ value, duration = 1800 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')
  const { num, suffix, dec } = parse(value)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // cubic ease-out
      setDisplay((eased * num).toFixed(dec))
      if (p < 1) requestAnimationFrame(tick)
      else setDisplay(num.toFixed(dec))
    }
    requestAnimationFrame(tick)
  }, [inView, num, duration, dec])

  return <span ref={ref}>{display}{suffix}</span>
}
